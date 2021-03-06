// react
import {FunctionComponent} from "react";
// next
import Link from 'next/link';
import Image from 'next/image';
// styles
import styles from '@/styles/EventItem.module.css';
// types
import {Event} from '@/helpers/types';

const EventItem: FunctionComponent<{evt: Event}> = ({evt}): JSX.Element => {
    return (
        <div className={styles.event}>
            <div className={styles.img}>
                <Image
                    src={evt.attributes.image.data ?
                        evt.attributes.image.data.attributes.formats.thumbnail.url
                        :
                        "/images/event-default.png"} width={170} height={100}
                />
            </div>

            <div className={styles.info}>
                <span>{evt.attributes.date} at {evt.attributes.time}</span>
                <h3>{evt.attributes.name}</h3>
            </div>

            <div className={styles.link}>
                <Link href={`/events/${evt.attributes.slug}`}>
                    <a className="btn">Details</a>
                </Link>
            </div>
        </div>
    );
};

export default EventItem;
