import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Layout from "@/components/Layout";
import {API_URL} from "@/config/index";
import styles from '@/styles/Event.module.css';

const EventPage = ({evt}) => {
    const deleteEvent = (e) => {
        console.log('delete');
    };

    return (
        <Layout>
            <div className={styles.event}>
                <div className={styles.controls}>
                    <Link href={`/events/edit/${evt.id}`}>
                        <a>
                            <FaPencilAlt /> Edit Event
                        </a>
                    </Link>
                    <a href="#" className={styles.delete} onClick={deleteEvent}>
                        <FaTimes /> Delete Event
                    </a>
                </div>

                <span>
                    {evt.attributes.date} at {evt.attributes.time}
                </span>
                <h1>{evt.attributes.name}</h1>
                {evt.attributes.image && (
                    <div className={styles.image}>
                        <Image src={evt.attributes.image.data.attributes.formats.large.url} width={960} height={600} />
                    </div>
                )}

                <h3>Performers:</h3>
                <p>{evt.attributes.performers}</p>
                <h3>Description:</h3>
                <p>{evt.attributes.description}</p>
                <h3>Venue: {evt.attributes.venue}</h3>
                <p>{evt.attributes.address}</p>

                <Link href="/events">
                    <a className={styles.back}>
                        {"<"} Go Back
                    </a>
                </Link>
            </div>
        </Layout>
    );
};

export async function getServerSideProps({query: {slug}}) {
    console.log(slug);
    const res = await fetch(`${API_URL}/api/events?populate=image&filters[slug][$eq]=${slug}`);
    const events = await res.json();

    return {
        props: {
            evt: events.data[0]
        }
    }
}

export default EventPage;
