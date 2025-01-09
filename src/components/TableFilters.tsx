import { ChangeEvent, FC } from 'react';
import {ITableFilterConfig} from "../interfaces/ITableFilterConfig.ts";


interface Props {
    filters: { [key: string]: string };
    onFilterChange: (name: string, value: string) => void;
    onResetFilters: () => void;
    filterConfig: ITableFilterConfig[];
}

const TableFilters: FC<Props> = ({ filters, onFilterChange, onResetFilters, filterConfig }) => {
    const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        onFilterChange(name, value);
    };

    const isFilterApplied = Object.values(filters).some((value) => value !== '');

    return (
        <div className="flex flex-wrap gap-4 mb-4 items-center">
            {filterConfig.map((filter) => (
                <div key={filter.name}>
                    <label htmlFor={filter.name}>{filter.label}:</label>
                    <select
                        id={filter.name}
                        name={filter.name}
                        value={filters[filter.name]} // Usar los filtros recibidos por props
                        onChange={handleFilterChange}
                    >
                        <option value="">All</option>
                        {filter.options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
            {isFilterApplied && (
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                    onClick={onResetFilters} // Llamar a la función para resetear el estado en TableContainer
                >
                    Reset filters
                </button>
            )}
        </div>
    );
};

export default TableFilters;
