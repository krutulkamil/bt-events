// react
import React, {useContext, useState} from 'react';
// next
import {NextRouter, useRouter} from 'next/router';
import Link from 'next/link';
import {GetServerSideProps, NextPage} from "next";
// context
import AuthContext from "@/context/AuthContext";
// cookies
import {parseCookies} from "@/helpers/index";
// slugs
import slugify from 'slugify';
// react-toastify
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// config
import {API_URL} from "@/config/index";
// components
import Layout from "@/components/Layout";
// styles
import styles from '@/styles/Form.module.css';
// types
import {User} from "@/helpers/types";

interface AddEventState {
    name: string;
    slug: string;
    performers: string;
    venue: string;
    address: string;
    date: string;
    time: string;
    description: string;
    user: User;
}

const AddEventPage: NextPage<{token: string}> = ({token}) => {

    const {user: loggedUser} = useContext(AuthContext);

    const [values, setValues] = useState<AddEventState>({
        name: '',
        slug: '',
        performers: '',
        venue: '',
        address: '',
        date: '',
        time: '',
        description: '',
        user: loggedUser
    });

    const {name, performers, venue, address, date, time, description} = values;

    const newEvent = {
        data: {
            ...values
        }
    }

    const router: NextRouter = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const hasEmptyFields: boolean = Object.values(values).some((element) => element === "");

        if (hasEmptyFields) {
            toast.error('Please fill in all fields', {theme: "dark"});
        }

        const res: Response = await fetch(`${API_URL}/api/events`, {
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
            await router.push(`/events/${evt.data.attributes.slug}`);
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
            user: loggedUser
        });
    };

    const handleInputChange = (value: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const {token} = parseCookies(req);

    return {
        props: {
            token
        }
    }
}

export default AddEventPage;
