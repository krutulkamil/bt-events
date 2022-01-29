// react
import {FunctionComponent} from "react";
// next
import Link from 'next/link';
// icons
import {FaPencilAlt, FaTimes} from 'react-icons/fa';
// styles
import styles from '@/styles/DashboardEvent.module.css';
// types
import {Event} from '@/helpers/types';

interface Props {
    evt: Event,
    handleDelete: (id: number) => Promise<void>;
}

const DashboardEvent: FunctionComponent<Props> = ({evt, handleDelete}): JSX.Element => {
    return (
        <div className={styles.event}>
            <h4>
                <Link href={`/events/${evt.attributes.slug}`}>
                    <a>{evt.attributes.name}</a>
                </Link>
            </h4>
            <Link href={`/events/edit/${evt.id}`}>
                <a className={styles.edit}>
                    <FaPencilAlt /> <span>Edit Event</span>
                </a>
            </Link>
            <a href="#" className={styles.delete} onClick={() => handleDelete(evt.id)}>
                <FaTimes /> <span>Delete</span>
            </a>
        </div>
    );
};

export default DashboardEvent;
