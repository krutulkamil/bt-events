// next
import type {AppProps} from 'next/app';
// context
import {AuthProvider} from "@/context/AuthContext"
// styles
import '../styles/globals.css';

function MyApp({Component, pageProps}: AppProps) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    )
}

export default MyApp
