import {FC} from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({currentPage, totalPages, onPageChange}) => {

    const pages = Array.from({length: totalPages}, (_, i) => i + 1);

    return (
        <div>
            <ul className="pagination">
                {currentPage > 1 && (
                    <li onClick={() => onPageChange(currentPage - 1)}>
                        <button>Prev</button>
                    </li>
                )}
                {pages.map((page) => (
                    <li key={page} onClick={() => onPageChange(page)} className={currentPage === page ? 'active' : ''}>
                        <button>{page}</button>
                    </li>
                ))}
                {currentPage < totalPages && (
                    <li onClick={() => onPageChange(currentPage + 1)}>
                        <button>Next</button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Pagination;
