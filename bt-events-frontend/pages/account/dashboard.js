import {parseCookies} from '@/helpers/index.js';
import Layout from "@/components/Layout";
import DashboardEvent from "@/components/DashboardEvent";
import {API_URL} from "@/config/index";
import styles from "@/styles/Dashboard.module.css";

const DashboardPage = ({events}) => {
    const deleteEvent = (id) => {
        console.log(id);
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

export async function getServerSideProps({req}) {
    const {token} = parseCookies(req);

    const userRes = await fetch(`${API_URL}/api/users/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const currentUser = await userRes.json();

    const eventsRes = await fetch(`${API_URL}/api/events?populate=*&filters[user][username][$eq]=${currentUser.username}`);
    const events = await eventsRes.json();

    return {
        props: {
            events: events.data
        }
    }
}

export default DashboardPage;
