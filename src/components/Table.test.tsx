import {render, screen} from '@testing-library/react';
import Table from './Table';
import {ICharacterTable} from "../interfaces/ICharacterTable.ts";
import {IColumnConfig} from "../interfaces/IColumnConfig.ts";

describe('Table', () => {
    const mockItems: ICharacterTable[] = [
        {id: 1, name: 'Rick Sanchez', species: 'Human', status: 'Alive', imageUrl: '/rick.png'},
        {id: 2, name: 'Morty Smith', species: 'Human', status: 'Alive', imageUrl: '/morty.png'},
        {id: 3, name: 'Summer Smith', species: 'Human', status: 'Alive', imageUrl: '/summer.png'},
    ];

    const mockColumns: IColumnConfig<ICharacterTable>[] = [
        {header: 'Name', key: 'name', sortable: true},
        {header: 'Species', key: 'species', sortable: true},
        {header: 'Status', key: 'status', sortable: true},
        {
            header: 'Portrait',
            key: 'imageUrl',
            render: (imageUrl) => <span data-testid="custom-component">{imageUrl}</span>,
            sortable: false,
        },
    ];

    it('should render the table with the correct headers', () => {
        render(<Table items={mockItems} columns={mockColumns}/>);
        mockColumns.forEach((column) => {
            expect(screen.getByRole('columnheader', {name: column.header})).toBeInTheDocument();
        });
    });

});
