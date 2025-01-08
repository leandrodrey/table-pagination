import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';
import { vi } from 'vitest';

describe('Pagination', () => {
    const mockOnPageChange = vi.fn();
    const renderPagination = (currentPage = 1, totalPages = 5) => {
        render(<Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={mockOnPageChange}
        />);
    };

    it('should render the correct number of pages', () => {
        renderPagination();
        const pageButtons = screen.getAllByRole('button');
        expect(pageButtons).toHaveLength(6);
    });

    it('should render the Previous button when currentPage is greater than 1', () => {
        renderPagination(2, 5);
        const previousButton = screen.getByRole('button', { name: 'Prev' });
        expect(previousButton).toBeInTheDocument();
    });

    it('should render the Next button when currentPage < totalPages', () => {
        renderPagination(3, 5);
        const nextButton = screen.getByRole('button', { name: 'Next' });
        expect(nextButton).toBeInTheDocument();
    });

    it('should call the onPageChange function when a page button is clicked', () => {
        renderPagination();
        const pageButtons = screen.getAllByRole('button');
        pageButtons[2].click();
        expect(mockOnPageChange).toHaveBeenCalledWith(3);
    });


});
