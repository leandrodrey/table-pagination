import { render, screen, fireEvent, within } from '@testing-library/react';
import TableFilters from './TableFilters';
import { vi } from 'vitest';
import {ITableFilterConfig} from "../interfaces/ITableFilterConfig.ts";

describe('TableFilters', () => {
    const mockOnFilterChange = vi.fn();
    const mockOnResetFilters = vi.fn();

    const TableFiltersConfig: ITableFilterConfig[] = [
        {
            name: 'status',
            label: 'Status',
            options: [
                { value: 'alive', label: 'Alive' },
                { value: 'dead', label: 'Dead' },
                { value: 'unknown', label: 'Unknown' },
            ],
        },
        {
            name: 'species',
            label: 'Species',
            options: [
                { value: 'Human', label: 'Human' },
                { value: 'Alien', label: 'Alien' },
            ],
        }
    ];

    beforeEach(() => {
        render(
            <TableFilters
                filters={{ status: '', species: ''}}
                onFilterChange={mockOnFilterChange}
                onResetFilters={mockOnResetFilters}
                filterConfig={TableFiltersConfig}
            />
        );
    });

    it('should render the filter options correctly', () => {
        // Check if the selectors are in the document
        expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/species/i)).toBeInTheDocument();

        // Check the options of the "Status" selector
        const statusSelect = screen.getByLabelText(/status/i);
        expect(statusSelect).toHaveValue('');
        expect(within(statusSelect).getByText('All')).toBeInTheDocument();
        expect(within(statusSelect).getByText('Alive')).toBeInTheDocument();
        expect(within(statusSelect).getByText('Dead')).toBeInTheDocument();
        expect(within(statusSelect).getByText('Unknown')).toBeInTheDocument();

        // Check the options of the "Species" selector
        const speciesSelect = screen.getByLabelText(/species/i);
        expect(speciesSelect).toHaveValue('');
        expect(within(speciesSelect).getByText('All')).toBeInTheDocument();
        expect(within(speciesSelect).getByText('Human')).toBeInTheDocument();
        expect(within(speciesSelect).getByText('Alien')).toBeInTheDocument();
    });

    it('should call onFilterChange with the correct filters when a filter is changed', () => {
        // Change the "Status" filter to "Alive"
        const statusSelect = screen.getByLabelText(/status/i);
        fireEvent.change(statusSelect, { target: { value: 'alive' } });
        expect(mockOnFilterChange).toHaveBeenCalledWith('status', 'alive');

        // Change the "Species" filter to "Human"
        const speciesSelect = screen.getByLabelText(/species/i);
        fireEvent.change(speciesSelect, { target: { value: 'Human' } });
        expect(mockOnFilterChange).toHaveBeenCalledWith('species', 'Human');
    });

    it('should show the "Reset filters" button when a filter is applied', () => {
        render(
            <TableFilters
                filters={{ status: 'alive', species: ''}}
                onFilterChange={mockOnFilterChange}
                onResetFilters={mockOnResetFilters}
                filterConfig={TableFiltersConfig}
            />
        );
        expect(screen.getByText('Reset filters')).toBeInTheDocument();
    });
});
