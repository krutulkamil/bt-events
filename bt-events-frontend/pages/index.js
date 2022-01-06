import Link from 'next/link';
import Layout from '@/components/Layout';
import EventItem from "@/components/EventItem";
import {API_URL} from '@/config/index.js';

export default function HomePage({events}) {

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

export async function getServerSideProps () {
    const res = await fetch(`${API_URL}/api/events?populate=image&sort=date:ASC`);
    const events = await res.json();

    return {
        props: {events: events.data.slice(0, 3)}
    }
}