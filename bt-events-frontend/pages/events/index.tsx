import Layout from '@/components/Layout';
import EventItem from "@/components/EventItem";
import {API_URL, PER_PAGE} from '@/config/index';
import Pagination from "@/components/Pagination";
import {Event, EventMetadata} from "@/helpers/types";
import {GetServerSideProps, NextPage} from "next";

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
