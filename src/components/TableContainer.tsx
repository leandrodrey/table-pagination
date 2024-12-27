import {FC, ReactNode, Suspense, useState} from 'react';
import useSWR from "swr";
import {fetcher} from "../utils/fetcher.ts";
import {ICharacter} from "../interfaces/ICharacter.ts";
import {ICharacterTable} from "../interfaces/ICharacterTable.ts";
import {characterAdapter} from "../adapters/characterAdapter.ts";
import Loader from "./Loader.tsx";
import Pagination from "./Pagination.tsx";
import Table from "./Table.tsx";
import Image from "./Image.tsx";

interface ColumnConfig<T> {
    header: string;
    key: keyof T;
    render?: (value: any, item: T) => ReactNode;
}

const TableContainer: FC = () => {

    /* El valor de currentPage se inicializa en 1 */
    const [currentPage, setCurrentPage] = useState(1);

    /* Usamos useSWR para obtener los datos de la API de Rick and Morty y le enviamos la currentPage como parametro */
    const {data, error, isLoading} = useSWR(`https://rickandmortyapi.com/api/character?page=${currentPage}`, fetcher)

    if (isLoading) return <div><Loader /></div>
    if (error) return <div>Error: {error.message}</div>

    /* Los datos obtenidos de la API son de tipo ICharacter[] */
    const characters: ICharacter[] = data.results;

    /* Convertimos los datos de la API en ICharacterTable[] usando un adapter */
    const charactersForTable: ICharacterTable[] = characters.map(characterAdapter);

    /* Obtenemos el total de páginas */
    const totalPages = data.info.pages;

    /* Cuando cambia la página, actualizamos la variable currentPage */
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    function sortItems<T>(items: T[], key: keyof T, order: 'asc' | 'desc'): T[] {
        return [...items].sort((a, b) => {
            const valueA = a[key];
            const valueB = b[key];

            if (typeof valueA === 'number' && typeof valueB === 'number') {
                return order === 'asc' ? valueA - valueB : valueB - valueA;
            } else {
                const stringA = String(valueA).toLowerCase();
                const stringB = String(valueB).toLowerCase();
                return order === 'asc'
                    ? stringA.localeCompare(stringB)
                    : stringB.localeCompare(stringA);
            }
        });
    }

    /* Definimos las columnas de la tabla y si es necesario podemos definir un componente de renderizado para cada una */
    const columns: ColumnConfig<ICharacterTable>[] = [
        {header: "Name", key: "name"},
        {header: "Species", key: "species"},
        {header: "Status", key: "status"},
        {
            header: 'Portrait',
            key: "imageUrl",
            render: (imageUrl, character) => <Image src={imageUrl} alt={`${character.name} image`} />
        }
    ];

    return (
        <>
            <div className="flex justify-center flex-col items-center py-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
                <Suspense fallback={<Loader />}>
                    <Table columns={columns} items={charactersForTable} />
                </Suspense>
            </div>
        </>
    )
}

export default TableContainer;
