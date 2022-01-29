// next
import {NextPage} from "next";
import Link from 'next/link';
// components
import Layout from "@/components/Layout";
// icons
import { FaExclamationTriangle } from 'react-icons/fa';
// styles
import styles from '@/styles/404.module.css'

const NotFoundPage: NextPage = (): JSX.Element => {
    return (
        <Layout title="Page Not Found | Breathtaking Events">
            <div className={styles.error}>
                <h1>
                    <FaExclamationTriangle/> 404</h1>
                <p>Sorry, there is nothing here</p>
                <Link href="/">Go Back Home</Link>
            </div>
        </Layout>
    );
};

export default NotFoundPage;
