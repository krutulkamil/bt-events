import React, {FunctionComponent, useState} from 'react';
import {NextRouter, useRouter} from 'next/router';
import styles from '@/styles/Search.module.css';

const Search: FunctionComponent = (): JSX.Element => {
    const [term, setTerm] = useState<string>('');

    const router: NextRouter = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/events/search?term=${term}`);
        setTerm('');
    };

    return (
        <div className={styles.search}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Search Events"
                />
            </form>
        </div>
    );
};

export default Search;
