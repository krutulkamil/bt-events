import {createContext, useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {NEXT_URL} from "@/config/index";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const router = useRouter();

    useEffect(() => checkUserLoggedIn(), []);

    const register = async ({username, email, password}) => {
        console.log({username, email, password});
    };

    const login = async ({email: identifier, password}) => {
        const res = await fetch(`${NEXT_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({identifier, password})
        })

        const data = await res.json();

        if (res.ok) {
            setUser(data.user);
            router.push("/account/dashboard");
        } else {
            setError(data.message);
            setError(null);
        }
    };

    const logout = async () => {
        console.log('logout!');
    };

    const checkUserLoggedIn = async () => {
        const res = await fetch(`${NEXT_URL}/api/user`);
        const data = await res.json();

        if (res.ok) {
            setUser(data.user);
        } else {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{user, error, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;