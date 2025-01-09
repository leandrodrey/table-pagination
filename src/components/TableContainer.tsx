import {FC, Suspense, useState} from 'react';
import useSWR from "swr";
import {ICharacter} from "../interfaces/ICharacter.ts";
import {ICharacterTable} from "../interfaces/ICharacterTable.ts";
import {IColumnConfig} from "../interfaces/IColumnConfig.ts";
import {characterService} from "../services/characterService.ts";
import {characterAdapter} from "../adapters/characterAdapter.ts";
import Loader from "./Loader.tsx";
import Pagination from "./Pagination.tsx";
import TableFilters from "./TableFilters.tsx";
import Table from "./Table.tsx";
import Image from "./Image.tsx";
import {filterConfig} from "../config/TableFiltersConfig.ts";

const TableContainer: FC = () => {

    /* Set the currentPage value to 1 */
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({ status: '', species: '', gender: '' });

    /* We use SWR to get the data from the service */
    const {data, error, isLoading} = useSWR(
        [`/api/characters?page=${currentPage}`, filters], // We use the filters as a dependency
        ([]) => characterService.getCharacters({page: currentPage, filters})
    );

    if (isLoading) return <div><Loader/></div>
    if (error) return <div>Error: {error.message}</div>
    if (!data?.results) {
        setFilters({status: '', species: '', gender: ''});
        return (
            <div className="text-white text-xl text-center pt-8">No results found</div>
        )
    }

    /* Get the data from the API as ICharacter[] */
    const characters: ICharacter[] = data.results;

    /* Convert the data from the API to ICharacterTable[] using an adapter */
    const charactersForTable: ICharacterTable[] = characters.map(characterAdapter);

    /* Get the total number of pages */
    const totalPages = data.info.pages;

    /* Update the currentPage variable when the page changes */
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleFilterChange = (name: string, value: string) => {
        setFilters({ ...filters, [name]: value });
    };

    const handleResetFilters = () => {
        setFilters({ status: '', species: '', gender: '' });
    };

    /* Define the columns of the table and if necessary we can define a render component for each one */
    const columns: IColumnConfig<ICharacterTable>[] = [
        {header: "Name", key: "name", sortable: true},
        {header: "Species", key: "species", sortable: true},
        {header: "Status", key: "status", sortable: true},
        {
            header: 'Portrait',
            key: "imageUrl",
            render: (imageUrl, character) => <Image src={imageUrl} alt={`${character.name} image`}/>,
            sortable: false
        }
    ];

    return (
        <>
            <div className="flex justify-center flex-col items-center py-4">
                <TableFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onResetFilters={handleResetFilters}
                    filterConfig={filterConfig}
                />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
                <Suspense fallback={<Loader/>}>
                    <Table columns={columns} items={charactersForTable}/>
                </Suspense>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </>
    )
}

export default TableContainer;
