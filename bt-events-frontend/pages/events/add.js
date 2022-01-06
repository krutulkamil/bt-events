import React, {useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import Layout from "@/components/Layout";
import {API_URL} from "@/config/index";
import styles from '@/styles/Form.module.css';

const AddEventPage = () => {
    const [values, setValues] = useState({
        name: '',
        performers: '',
        venue: '',
        address: '',
        date: '',
        time: '',
        description: '',
    });

    const {name, performers, venue, address, date, time, description} = values;

    const router = useRouter();

    const handleSubmit = e => {
        e.preventDefault();
        console.log(values);
        setValues({
            name: '',
            performers: '',
            venue: '',
            address: '',
            date: '',
            time: '',
            description: ''
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
                            onChange={handleInputChange('name')}/>
                    </div>
                    <div>
                        <label htmlFor='performers'>Performers</label>
                        <input
                            type='text'
                            name='performers'
                            id='performers'
                            value={values.performers}
                            onChange={handleInputChange('performers')}
                        />
                    </div>
                    <div>
                        <label htmlFor='venue'>Venue</label>
                        <input
                            type='text'
                            name='venue'
                            id='venue'
                            value={values.venue}
                            onChange={handleInputChange('venue')}
                        />
                    </div>
                    <div>
                        <label htmlFor='address'>Address</label>
                        <input
                            type='text'
                            name='address'
                            id='address'
                            value={values.address}
                            onChange={handleInputChange('address')}
                        />
                    </div>
                    <div>
                        <label htmlFor='date'>Date</label>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            value={values.date}
                            onChange={handleInputChange('date')}
                        />
                    </div>
                    <div>
                        <label htmlFor='time'>Time</label>
                        <input
                            type='text'
                            name='time'
                            id='time'
                            value={values.time}
                            onChange={handleInputChange('time')}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor='description'>Event Description</label>
                    <textarea
                        name='description'
                        id='description'
                        value={values.description}
                        onChange={handleInputChange('description')}
                    />
                </div>
                <input type='submit' value='Add Event' className='btn' />
            </form>
        </Layout>
    );
};

export default AddEventPage;
