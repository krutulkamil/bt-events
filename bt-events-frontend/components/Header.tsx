// react
import {FunctionComponent, useContext} from 'react';
// next
import Link from 'next/link';
// context
import AuthContext from '@/context/AuthContext';
// components
import Search from "@/components/Search";
// icons
import {FaHamsa, FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'
// styles
import styles from '@/styles/Header.module.css';

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
