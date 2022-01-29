import React, {FunctionComponent} from 'react';
import Head from 'next/head';
import {NextRouter, useRouter} from 'next/router';
import Header from "./Header";
import Footer from "./Footer";
import Showcase from "./Showcase";
import styles from '@/styles/Layout.module.css'

interface LayoutProps {
    title?: string;
    keywords?: string;
    description?: string
    children: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({title, keywords, description, children}): JSX.Element => {
    const router: NextRouter = useRouter();

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description}/>
                <meta name="keywords" content={keywords}/>
            </Head>

            <Header />
            {router.pathname === "/" && <Showcase/>}
            <div className={styles.container}>
                {children}
            </div>
            <Footer />
        </div>
    );
};

Layout.defaultProps = {
    title: "Breathtaking Events | Find the hottest parties",
    description: "Find the latest musical events",
    keywords: 'music, events, concerts, dj, going out, free time, fun'
}

export default Layout;
