import React, {FunctionComponent, ReactChild, ReactChildren} from 'react';
import {createContext, useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {NEXT_URL} from "@/config/index";

export interface AuxProps {
    children: ReactChild | ReactChildren;
}

export interface User {
    id:        number;
    username:  string;
    email:     string;
    provider:  string;
    confirmed: boolean;
    blocked:   boolean;
    createdAt: Date;
    updatedAt: Date;
}

const AuthContext = createContext(null);

export const AuthProvider: FunctionComponent<AuxProps> = ({children}) => {
    const [user, setUser] = useState<User>(null);
    const [error, setError] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const checkUserAsync = async () => {
            await checkUserLoggedIn();
        }

        checkUserAsync();
    }, []);

    const register = async ({username, email, password}) => {
        const res = await fetch(`${NEXT_URL}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, email, password})
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
        const res = await fetch(`${NEXT_URL}/api/logout`, {
            method: "POST"
        });

        if (res.ok) {
            setUser(null);
            router.push("/");
        }
    };

    const checkUserLoggedIn = async (): Promise<void> => {
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