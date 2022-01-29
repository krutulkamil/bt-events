import styles from '@/styles/Showcase.module.css';
import {FunctionComponent} from "react";

const Showcase: FunctionComponent = (): JSX.Element => {
    return (
        <div className={styles.showcase}>
            <h1>Welcome To The Party!</h1>
            <h2>Find the hottest Breathtaking Events</h2>
        </div>
    );
};

export default Showcase;
