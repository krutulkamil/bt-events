import Layout from '@/components/Layout';
import {NextRouter, useRouter} from 'next/router';
import Link from 'next/link';
import {GetServerSideProps, NextPage} from "next";
import EventItem from "@/components/EventItem";
import {API_URL} from '@/config/index';
import qs from 'qs';
import {Event} from '@/helpers/types';

const SearchPage: NextPage<{events: Event[]}> = ({events}) => {
    const router: NextRouter = useRouter();

    return (
        <Layout title="Search Results">
            <Link href="/events">
                <a>{"<"} Go Back</a>
            </Link>
            <h1>Search Results for {router.query.term}</h1>
            {events.length === 0 && <h3>No events to show</h3>}
            {events.map(evt => (
                <EventItem key={evt.id} evt={evt} />
            ))}
        </Layout>
    )
};

export const getServerSideProps: GetServerSideProps = async ({query: {term}}) => {
    const query = (term: string | string[]) => {
        return qs.stringify({
            filters: {
                $or: [
                    {
                        name: {
                            $containsi: term
                        }
                    },
                    {
                        venue: {
                            $containsi: term
                        }
                    },
                    {
                        performers: {
                            $containsi: term
                        }
                    },
                    {
                        description: {
                            $containsi: term
                        }
                    }
                ]
            }
        });
    };

    const events = await(await fetch(`${API_URL}/api/events?populate=image&${query(term)}`)).json();
    const data: Event[] = events.data;

    return {
        props: {events: data}
    }
}

export default SearchPage;
