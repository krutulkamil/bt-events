import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import {ToastContainer, toast} from 'react-toastify';
import {useRouter} from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "@/components/Layout";
import {API_URL} from "@/config/index";
import styles from '@/styles/Event.module.css';
import React from "react";

const EventPage = ({evt}) => {
    const router = useRouter();

    const deleteEvent = async (e) => {
        if (confirm('Are you sure?')) {
            const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
                method: 'DELETE'
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message)
            } else {
                router.push('/events');
            }
        }
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
                        <Image
                            src={evt.attributes.image.data ?
                                evt.attributes.image.data.attributes.formats.large.url
                                :
                                "/images/event-default.png"} width={960} height={600}
                        />
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

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
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
