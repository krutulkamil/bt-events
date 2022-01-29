// react
import React, {useState, useEffect, FunctionComponent} from 'react';
import ReactDOM from 'react-dom';
// icons
import {FaTimes} from 'react-icons/fa';
// styles
import styles from '@/styles/Modal.module.css';

interface Props {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
}

const Modal: FunctionComponent<Props> = ({show, onClose, children, title}): JSX.Element => {
    const [isBrowser, setIsBrowser] = useState<boolean>(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const handleClose = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onClose();
    };

    const modalContent: JSX.Element = show ? (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <a href="#" onClick={handleClose}>
                        <FaTimes />
                    </a>
                </div>
                {title && <div>{title}</div>}
                <div className={styles.body}>{children}</div>
            </div>
        </div>
    ) : null;

    if (isBrowser) {
        return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'));
    } else {
        return null;
    }
};

export default Modal;
