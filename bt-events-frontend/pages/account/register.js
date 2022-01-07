import React, {useState, useEffect, useContext} from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import {FaUser} from 'react-icons/fa';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/AuthForm.module.css';

const RegisterPage = () => {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const {username, email, password, passwordConfirm} = values;

    const handleInputChange = name => e => {
        setValues({...values, [name]: e.target.value});
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            toast.error('Passwords do not match', {theme: "dark"});
            return;
        }

        console.log({email, password, passwordConfirm, username})
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
                    <input type="submit" value="Login" className="btn"/>
                </form>

                <p>Already have an account?
                    <Link href="/account/login"> Login</Link>
                </p>
            </div>
        </Layout>
    );
};

export default RegisterPage;

