import {ChangeEvent, FC, useState} from 'react';

interface Props {
    onFilterChange: (filters: { status: string; species: string; gender: string }) => void;
}

const CharacterFilters: FC<Props> = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({ status: '', species: '', gender: '' });

    const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        const updatedFilters = { ...filters, [name]: value };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    const handleResetFilters = () => {
        const resetFilters = { status: '', species: '', gender: '' };
        setFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    const isFilterApplied = Object.values(filters).some((value) => value !== "");

    return (
        <div className="flex flex-wrap gap-4 mb-4 items-center">
            <div>
                <label htmlFor="status">Status:</label>
                <select
                    id="status"
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                >
                    <option value="">All</option>
                    <option value="alive">Alive</option>
                    <option value="dead">Dead</option>
                    <option value="unknown">Unknown</option>
                </select>
            </div>
            <div>
                <label htmlFor="species">Species:</label>
                <select
                    id="species"
                    name="species"
                    value={filters.species}
                    onChange={handleFilterChange}
                >
                    <option value="">All</option>
                    <option value="Human">Human</option>
                    <option value="Alien">Alien</option>
                </select>
            </div>
            <div>
                <label htmlFor="gender">Gender:</label>
                <select
                    id="gender"
                    name="gender"
                    value={filters.gender}
                    onChange={handleFilterChange}
                >
                    <option value="">All</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="genderless">Genderless</option>
                    <option value="unknown">Unknown</option>
                </select>
            </div>
            {isFilterApplied && (
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                    onClick={handleResetFilters}
                >
                    Reset filters
                </button>
            )}
        </div>
    );
};

export default CharacterFilters;
