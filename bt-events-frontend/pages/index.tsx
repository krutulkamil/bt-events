import Link from 'next/link';
import Layout from '@/components/Layout';
import EventItem from "@/components/EventItem";
import {API_URL} from '@/config/index';
import {Event} from '@/helpers/types';
import {GetServerSideProps, NextPage} from "next";

const HomePage: NextPage<{ events: Event[] }> = ({events}): JSX.Element => {

    return (
        <Layout>
            <h1>Upcoming Events</h1>
            {events.length === 0 && <h3>No events to show</h3>}
            {events.map(evt => (
                <EventItem key={evt.id} evt={evt} />
            ))}

            {events.length > 0 && (
                <Link href={'/events'}>
                    <a className="btn-secondary">View all events</a>
                </Link>
            )}
        </Layout>
    )
};

export const getServerSideProps: GetServerSideProps = async () => {
    const events = await(await fetch(`${API_URL}/api/events?populate=image&sort=date:ASC`)).json();
    const data: Event[] = events.data;

    return {
        props: {events: data.slice(0, 3)}
    }
}

export default HomePage;
