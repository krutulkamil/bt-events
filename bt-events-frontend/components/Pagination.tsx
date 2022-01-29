// react
import {FunctionComponent} from "react";
// next
import Link from "next/link";
// config
import {PER_PAGE} from "@/config/index";

interface Props {
    page: number;
    total: number;
}

const Pagination: FunctionComponent<Props> = ({page, total}): JSX.Element => {

    const lastPage: number = Math.ceil(total / PER_PAGE);
    return (
        <>
            {page > 1 && (
                <Link href={`/events?page=${page - 1}`}>
                    <a className="btn-secondary">Prev</a>
                </Link>
            )}

            {page < lastPage && (
                <Link href={`/events?page=${page + 1}`}>
                    <a className="btn-secondary">Next</a>
                </Link>
            )}
        </>
    );
};

export default Pagination;
