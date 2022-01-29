import {FunctionComponent, useContext} from 'react';
import {FaHamsa, FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'
import Link from 'next/link';
import styles from '@/styles/Header.module.css';
import Search from "@/components/Search";
import AuthContext from '@/context/AuthContext';

const Header: FunctionComponent = (): JSX.Element => {
    const {user, logout} = useContext(AuthContext);

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">
                    <a>
                        <FaHamsa/> {" "}
                        BreathTaking Events</a>
                </Link>
            </div>

            <Search/>

            <nav>
                <ul>
                    <li>
                        <Link href="/events">
                            <a>Events</a>
                        </Link>
                    </li>
                    {user ?
                        <>
                            <li>
                                <Link href="/events/add">
                                    <a>Add Event</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/account/dashboard">
                                    <a>Dashboard</a>
                                </Link>
                            </li>
                            <li>
                                <button onClick={() => logout()} className="btn-secondary btn-icon">
                                    <FaSignOutAlt /> Logout
                                </button>
                            </li>
                        </>
                        :
                        <li>
                            <Link href="/account/login">
                                <a className="btn-secondary btn-icon">
                                    <FaSignInAlt/> Login
                                </a>
                            </Link>
                        </li>
                    }
                </ul>
            </nav>
        </header>
    );
};

export default Header;
