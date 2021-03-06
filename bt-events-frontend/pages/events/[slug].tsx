// react
import React from "react";
// next
import {GetServerSideProps, NextPage} from "next";
import Link from 'next/link';
import Image from 'next/image';
import {NextRouter, useRouter} from 'next/router';
// cookies
import {parseCookies} from "@/helpers/index";
// config
import {API_URL} from "@/config/index";
// react-toastify
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// icons
import {FaPencilAlt, FaTimes} from 'react-icons/fa';
// components
import Layout from "@/components/Layout";
import EventMap from "@/components/EventMap";
// styles
import styles from '@/styles/Event.module.css';
// types
import {Event, EventMetadata} from '@/helpers/types';

interface PageProps {
    evt: Event;
    token: string;
}

const EventPage: NextPage<PageProps> = ({evt, token}): JSX.Element => {
    const router: NextRouter = useRouter();

    const deleteEvent = async (): Promise<void> => {
        if (confirm('Are you sure?')) {
            const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();

            console.log(data);

            if (!res.ok) {
                toast.error(data.error.message)
            } else {
                await router.push('/events');
            }
        }
    };

    return (
        <Layout>
            <div className={styles.event}>

                <div className={styles.controls}>
                    <Link href={`/events/edit/${evt.id}`}>
                        <a>
                            <FaPencilAlt/> Edit Event
                        </a>
                    </Link>
                    <a href="#" className={styles.delete} onClick={deleteEvent}>
                        <FaTimes/> Delete Event
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

                <EventMap evt={evt}/>

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

export const getServerSideProps: GetServerSideProps = async ({query: {slug}, req}) => {
    const {token} = parseCookies(req);
    const events: EventMetadata = await (await fetch(`${API_URL}/api/events?populate=image&filters[slug][$contains]=${slug}`)).json();

    return {
        props: {
            evt: events.data[0],
            token: token || null
        }
    }
}

export default EventPage;
