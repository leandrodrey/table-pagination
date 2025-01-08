import {FC} from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({currentPage, totalPages, onPageChange}) => {

    const pages = Array.from({length: totalPages}, (_, i) => i + 1);

    return (
        <nav aria-label="Pagination">
            <ul className="flex justify-center items-center gap-1">
                {currentPage > 1 && (
                    <li onClick={() => onPageChange(currentPage - 1)}>
                        <button>Prev</button>
                    </li>
                )}
                {pages.map((page) => (
                    <li
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`p-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                    >
                        <button>{page}</button>
                    </li>
                ))}
                {currentPage < totalPages && (
                    <li onClick={() => onPageChange(currentPage + 1)}>
                        <button>Next</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;
