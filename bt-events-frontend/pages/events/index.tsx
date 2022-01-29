// next
import {GetServerSideProps, NextPage} from "next";
// config
import {API_URL, PER_PAGE} from '@/config/index';
// components
import Layout from '@/components/Layout';
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";
// types
import {Event, EventMetadata} from "@/helpers/types";

interface PageProps {
    events: Event[];
    page: number;
    total: number;
}

const EventsPage: NextPage<PageProps> = ({events, page, total}): JSX.Element => {
    return (
        <Layout>
            <h1>Events</h1>
            {events.length === 0 && <h3>No events to show</h3>}
            {events.map(evt => (
                <EventItem key={evt.id} evt={evt} />
            ))}

            <Pagination page={page} total={total}/>
        </Layout>
    )
};

export const getServerSideProps: GetServerSideProps = async ({query: {page = 1}}) => {

    const events: EventMetadata = await(await fetch(`${API_URL}/api/events?populate=image&pagination[page]=${page}&pagination[pageSize]=${PER_PAGE}`)).json();

    return {
        props: {
            events: events.data,
            page: +page,
            total: events.meta.pagination.total
        }
    }
}

export default EventsPage;
