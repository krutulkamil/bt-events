import Link from 'next/link';
import styles from '@/styles/Footer.module.css';
import {FunctionComponent} from "react";

const Footer: FunctionComponent = (): JSX.Element => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className={styles.footer}>
            <p>Copyright &copy; BreathTaking Events {currentYear}</p>
            <p>
                <Link href="/about">About This Project</Link>
            </p>
        </footer>
    );
};

export default Footer;
