import React, {FunctionComponent, ReactNode} from 'react';
import {createContext, useState, useEffect} from 'react';
import {NextRouter, useRouter} from 'next/router';
import {NEXT_URL} from "@/config/index";
import {User} from "@/helpers/types";

interface UserContextProviderProps {
    children: ReactNode
}

interface UserContextType {
    user: User | null;
    error: string | null;
    register: ({username, email, password}: {username: string, email: string, password: string}) => Promise<void>;
    login: ({email, password}: {email: string, password: string}) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<UserContextType | null>(null);

export const AuthProvider: FunctionComponent<UserContextProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    const router: NextRouter = useRouter();

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
            await router.push("/account/dashboard");
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
            await router.push("/account/dashboard");
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
            await router.push("/");
        }
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