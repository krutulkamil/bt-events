import React, {FunctionComponent, useState} from 'react';
import {API_URL} from "@/config/index";
import styles from '@/styles/Form.module.css';

interface Props {
    evtId: string | Blob;
    imageUploaded: () => Promise<void>;
    token: string;
}

const ImageUpload: FunctionComponent<Props> = ({evtId, imageUploaded, token}): JSX.Element => {
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('files', image);
        formData.append('ref', 'events');
        formData.append('refId', evtId);
        formData.append('field', 'image');

        const res = await fetch(`${API_URL}/api/upload`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });

        if (res.ok) {
            await imageUploaded();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className={styles.form}>
            <h1>Upload Event Image</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.file}>
                    <input type="file" onChange={handleFileChange}/>
                </div>
                <input type="submit" value="Upload" className="btn" />
            </form>
        </div>
    );
};

export default ImageUpload;
