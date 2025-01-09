import {render, screen, within} from '@testing-library/react';
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
            header: 'Image',
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

    it('should render the table with the correct number of rows and data', () => {
        render(<Table items={mockItems} columns={mockColumns} />);
        const tableRows = screen.getAllByRole('row');

        // 1 header row + 3 data rows = 4 rows
        expect(tableRows).toHaveLength(4);

        // Iterate over the data rows (ignoring the header row)
        tableRows.slice(1).forEach((row, rowIndex) => {
            const cells = within(row).getAllByRole('cell');
            expect(cells).toHaveLength(mockColumns.length);

            // Verify the data in each cell
            cells.forEach((cell, cellIndex) => {
                const column = mockColumns[cellIndex];

                // Obtain the expected value
                const expectedValue = column.render
                    ? column.render(mockItems[rowIndex][column.key], mockItems[rowIndex])
                    : String(mockItems[rowIndex][column.key]);

                // Verify if the cell contains the expected value (as text or as an element)
                if (typeof expectedValue === 'string') {
                    expect(cell).toHaveTextContent(expectedValue);
                } else {
                    // If expectedValue is a React element, verify if it is present in the cell
                    expect(within(cell).getByTestId('custom-component')).toBeInTheDocument();
                }
            });
        });
    });

});
