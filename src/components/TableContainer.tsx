import {FC, ReactNode, Suspense, useState} from 'react';
import useSWR from "swr";
import {fetcher} from "../utils/fetcher.ts";
import {ICharacter} from "../interfaces/ICharacter.ts";
import {ICharacterTable} from "../interfaces/ICharacterTable.ts";
import useFiltersStore from "../hooks/useFiltersStore.ts";
import {characterAdapter} from "../adapters/characterAdapter.ts";
import Loader from "./Loader.tsx";
import Pagination from "./Pagination.tsx";
import CharacterFilters from "./CharacterFilters.tsx";
import Table from "./Table.tsx";
import Image from "./Image.tsx";

interface ColumnConfig<T> {
    header: string;
    key: keyof T;
    render?: (value: any, item: T) => ReactNode;
    sortable?: boolean;
}

const TableContainer: FC = () => {

    /* Set the currentPage value to 1 */
    const [currentPage, setCurrentPage] = useState(1);
    const filters = useFiltersStore((state) => state.filters);

    const buildFilterUrl = () => {
        let url = `https://rickandmortyapi.com/api/character?page=${currentPage}`;
        const filterParams = Object.entries(filters)
            .filter(([value]) => value !== '')
            .map(([key, value]) => `${key}=${value}`);
        if (filterParams.length > 0) {
            url += `&${filterParams.join('&')}`;
        }
        return url;
    };

    /*We use SWR to get the data from the API and send the currentPage as a parameter */
    const {data, error, isLoading} = useSWR(buildFilterUrl(), fetcher);

    if (isLoading) return <div><Loader /></div>
    if (error) return <div>Error: {error.message}</div>
    if (!data.results) return <div>No results found</div>

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

    /* Define the columns of the table and if necessary we can define a render component for each one */
    const columns: ColumnConfig<ICharacterTable>[] = [
        {header: "Name", key: "name", sortable: true},
        {header: "Species", key: "species", sortable: true},
        {header: "Status", key: "status", sortable: true},
        {
            header: 'Portrait',
            key: "imageUrl",
            render: (imageUrl, character) => <Image src={imageUrl} alt={`${character.name} image`} />,
            sortable: false
        }
    ];

    return (
        <>
            <div className="flex justify-center flex-col items-center py-4">
                <CharacterFilters/>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
                <Suspense fallback={<Loader />}>
                    <Table columns={columns} items={charactersForTable} />
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
