// react
import {FunctionComponent} from "react";
// styles
import styles from '@/styles/Showcase.module.css';

const Showcase: FunctionComponent = (): JSX.Element => {
    return (
        <div className={styles.showcase}>
            <h1>Welcome To The Party!</h1>
            <h2>Find the hottest Breathtaking Events</h2>
        </div>
    );
};

export default Showcase;
