// react
import React, {useState, useEffect, useContext} from 'react';
// next
import {NextPage} from "next";
import Link from 'next/link';
// context
import AuthContext from "@/context/AuthContext";
// react-toastify
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// components
import Layout from '@/components/Layout';
// icons
import {FaUser} from 'react-icons/fa';
// styles
import styles from '@/styles/AuthForm.module.css';

interface RegisterState {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

const RegisterPage: NextPage = () => {
    const [values, setValues] = useState<RegisterState>({
        username: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const {register, error} = useContext(AuthContext);

    useEffect(() => {
        const checkErrors = () => error && toast.error(error, {theme: 'dark'});

        checkErrors();
    }, [error]);

    const {username, email, password, passwordConfirm} = values;

    const handleInputChange = (value: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [value]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            toast.error('Passwords do not match', {theme: "dark"});
            return;
        }

        await register({username, email, password})
    };

    return (
        <Layout title="User Registration">
            <div className={styles.auth}>
                <h1>
                    <FaUser/> Register
                </h1>
                <ToastContainer/>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleInputChange('username')}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleInputChange('email')}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handleInputChange('password')}
                        />
                    </div>
                    <div>
                        <label htmlFor="passwordConfirm">Confirm Password</label>
                        <input
                            type="password"
                            id="passwordConfirm"
                            value={passwordConfirm}
                            onChange={handleInputChange('passwordConfirm')}
                        />
                    </div>
                    <input type="submit" value="Register" className="btn"/>
                </form>

                <p>Already have an account?
                    <Link href="/account/login"> Login</Link>
                </p>
            </div>
        </Layout>
    );
};

export default RegisterPage;

