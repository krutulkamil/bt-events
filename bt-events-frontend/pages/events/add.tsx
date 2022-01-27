import React, {useContext, useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {parseCookies} from "@/helpers/index";
import slugify from 'slugify';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "@/components/Layout";
import {API_URL} from "@/config/index";
import styles from '@/styles/Form.module.css';
import AuthContext from "@/context/AuthContext";

const AddEventPage = ({token}) => {
    const {user: loggedUser} = useContext(AuthContext);

    const [values, setValues] = useState({
        name: '',
        slug: '',
        performers: '',
        venue: '',
        address: '',
        date: '',
        time: '',
        description: '',
        user: loggedUser.id
    });

    const {name, performers, venue, address, date, time, description} = values;

    const newEvent = {
        data: {
            ...values
        }
    }

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hasEmptyFields = Object.values(values).some((element) => element === "");

        if (hasEmptyFields) {
            toast.error('Please fill in all fields', {theme: "dark"});
        }

        const res = await fetch(`${API_URL}/api/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(newEvent)
        });

        if (!res.ok) {
            if (res.status === 403 || res.status === 401) {
                toast.error('No token included', {theme: "dark"});
                return;
            }
            toast.error("Something went wrong", {theme: "dark"});
        } else {
            const evt = await res.json();
            router.push(`/events/${evt.data.attributes.slug}`);
        }

        setValues({
            name: '',
            slug: '',
            performers: '',
            venue: '',
            address: '',
            date: '',
            time: '',
            description: '',
            user: null
        });
    };

    const handleInputChange = value => e => {
        setValues({...values, [value]: e.target.value});
    };

    return (
        <Layout title="Add New Event | Breathtaking Events">
            <Link href="/events">
                <a>{"<"} Go Back</a>
            </Link>
            <h1>Add Event</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name">Event Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={handleInputChange('name')}
                            onMouseOut={() => setValues({...values, slug: slugify(name)})}
                        />
                    </div>
                    <div>
                        <label htmlFor='performers'>Performers</label>
                        <input
                            type='text'
                            name='performers'
                            id='performers'
                            value={performers}
                            onChange={handleInputChange('performers')}
                        />
                    </div>
                    <div>
                        <label htmlFor='venue'>Venue</label>
                        <input
                            type='text'
                            name='venue'
                            id='venue'
                            value={venue}
                            onChange={handleInputChange('venue')}
                        />
                    </div>
                    <div>
                        <label htmlFor='address'>Address</label>
                        <input
                            type='text'
                            name='address'
                            id='address'
                            value={address}
                            onChange={handleInputChange('address')}
                        />
                    </div>
                    <div>
                        <label htmlFor='date'>Date</label>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            value={date}
                            onChange={handleInputChange('date')}
                        />
                    </div>
                    <div>
                        <label htmlFor='time'>Time</label>
                        <input
                            type='text'
                            name='time'
                            id='time'
                            value={time}
                            onChange={handleInputChange('time')}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor='description'>Event Description</label>
                    <textarea
                        name='description'
                        id='description'
                        value={description}
                        onChange={handleInputChange('description')}
                    />
                </div>
                <input type='submit' value='Add Event' className='btn'/>
            </form>

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

export async function getServerSideProps({req}) {
    const {token} = parseCookies(req);

    return {
        props: {
            token
        }
    }
}

export default AddEventPage;
