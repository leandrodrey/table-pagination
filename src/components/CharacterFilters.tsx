import {ChangeEvent, FC} from 'react';
import useFiltersStore from "../hooks/useFiltersStore.ts";

const CharacterFilters: FC = () => {
    const filters = useFiltersStore((state) => state.filters);
    const setFilters = useFiltersStore((state) => state.setFilters);

    const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
    };

    return (
        <div className="flex flex-wrap gap-4 mb-4">
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
        </div>
    );
};

export default CharacterFilters;
