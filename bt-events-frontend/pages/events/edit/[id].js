import React, {useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import {FaImage} from 'react-icons/fa';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "@/components/Layout";
import {API_URL} from "@/config/index";
import styles from '@/styles/Form.module.css';

const EditEventPage = ({evt}) => {
    const [values, setValues] = useState({
        name: evt.attributes.name,
        slug: evt.attributes.slug,
        performers: evt.attributes.performers,
        venue: evt.attributes.venue,
        address: evt.attributes.address,
        date: evt.attributes.date,
        time: evt.attributes.time,
        description: evt.attributes.description,
    });

    const [imagePreview, setImagePreview] = useState(evt.attributes.image.data ?
        evt.attributes.image.data.attributes.formats.thumbnail.url : null)

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

        const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEvent)
        });

        if (!res.ok) {
            toast.error("Something went wrong", {theme: "dark"})
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
            description: ''
        });
    };

    const handleInputChange = value => e => {
        setValues({...values, [value]: e.target.value});
    };

    return (
        <Layout title="Edit Event | Breathtaking Events">
            <Link href="/events">
                <a>{"<"} Go Back</a>
            </Link>
            <h1>Add Event</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name">Edit Event</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={handleInputChange('name')}
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
                <input type='submit' value='Update Event' className='btn'/>
            </form>

            <h2>Event Image</h2>
            {imagePreview ? (
                <Image src={imagePreview} height={100} width={170}/>
            ) : (
                <div>
                    <p>No image uploaded</p>
                </div>
            )}

            <div>
                <button className="btn-secondary">
                    <FaImage /> Set Image
                </button>
            </div>

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

export async function getServerSideProps({params: {id}}) {
    const res = await fetch(`${API_URL}/api/events/${id}?populate=image`);
    const evt = await res.json();

    return {
        props: {
            evt: evt.data
        }
    }
}

export default EditEventPage;
