import {parseCookies} from '@/helpers/index';
import Layout from "@/components/Layout";
import DashboardEvent from "@/components/DashboardEvent";
import {API_URL} from "@/config/index";
import styles from "@/styles/Dashboard.module.css";
import {useRouter} from 'next/router';
import {toast} from "react-toastify";
import {Event, EventMetadata} from "@/helpers/types";
import {GetServerSideProps, NextPage} from "next";

interface PageProps {
    events: Event[],
    token: string
}

const DashboardPage: NextPage<PageProps> = ({events, token}): JSX.Element => {
    const router = useRouter();

    const deleteEvent = async (id: number) => {
        if (confirm('Are you sure?')) {
            const res = await fetch(`${API_URL}/api/events/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message)
            } else {
                router.reload();
            }
        }
    };

    return (
        <Layout title="User Dashboard">
            <div className={styles.dash}>
                <h1>Dashboard</h1>
                <h3>My events</h3>

                {events && events.map((evt) => (
                    <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent}/>
                ))}
            </div>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const {token} = parseCookies(req);

    const currentUser = await(await fetch(`${API_URL}/api/users/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })).json();

    const events: EventMetadata = await(await fetch(`${API_URL}/api/events?populate=*&filters[user][username][$eq]=${currentUser.username}`)).json();

    return {
        props: {
            events: events.data,
            token
        }
    }
}

export default DashboardPage;
