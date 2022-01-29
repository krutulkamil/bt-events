import React, {useState, useEffect, useContext} from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import AuthContext from "@/context/AuthContext";
import {FaUser} from 'react-icons/fa';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/AuthForm.module.css';
import {NextPage} from "next";

interface LoginState {
    email: string;
    password: string;
}

const LoginPage: NextPage = (): JSX.Element => {
    const [values, setValues] = useState<LoginState>({
        email: "",
        password: ""
    });

    const {login, error} = useContext(AuthContext);

    useEffect(() => {
        const checkErrors = () => error && toast.error(error, {theme: 'dark'});

        checkErrors();
    }, [error]);

    const {email, password} = values;

    const handleInputChange = (value: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [value]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        await login({email, password})
    };

    return (
        <Layout title="User Login">
            <div className={styles.auth}>
                <h1>
                    <FaUser/> Log In
                </h1>
                <ToastContainer/>
                <form onSubmit={handleSubmit}>
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
                    <input type="submit" value="Login" className="btn"/>
                </form>

                <p>Don&apos;t have an account?
                    <Link href="/account/register"> Register</Link>
                </p>
            </div>
        </Layout>
    );
};

export default LoginPage;
