import Layout from '@/components/Layout';
import {useRouter} from 'next/router';
import Link from 'next/link';
import EventItem from "@/components/EventItem";
import {API_URL} from '@/config/index.js';
import qs from 'qs';

export default function SearchPage({events}) {
    const router = useRouter();

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

export async function getServerSideProps ({query: {term}}) {
    const query = (term) => {
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

    const res = await fetch(`${API_URL}/api/events?populate=image&${query(term)}`);
    const events = await res.json();

    return {
        props: {events: events.data}
    }
}
