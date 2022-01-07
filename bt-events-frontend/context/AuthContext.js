import {createContext, useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {API_URL} from "@/config/index";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const register = async ({username, email, password}) => {
        console.log({username, email, password});
    };

    const login = async ({email: identifier, password}) => {
        console.log({identifier, password});
    };

    const logout = async () => {
        console.log('logout!');
    };

    const checkUserLoggedIn = async () => {
        console.log('Check');
    };

    return (
        <AuthContext.Provider value={{user, error, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;