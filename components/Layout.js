import Head from 'next/head';
import Header from "./Header";
import Footer from "./Footer";
import styles from '../styles/Layout.module.css'

const Layout = ({title, keywords, description, children}) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description}/>
                <meta name="keywords" content={keywords}/>
            </Head>

            <Header />
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
