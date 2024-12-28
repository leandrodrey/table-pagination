import {ReactNode} from "react";
import useSortTable from "../hooks/useSortTable.tsx";

interface BaseTableItem {
    id: string | number;
}

interface TableProps<T extends BaseTableItem> {
    items: T[];
    columns: ColumnConfig<T>[];
}

interface ColumnConfig<T> {
    header: string;
    key: keyof T;
    render?: (value: any, item: T) => ReactNode;
    sortable?: boolean;
}

const Table = <T extends BaseTableItem>({items, columns}: TableProps<T>) => {

    const {sortedItems, sortKey, sortOrder, handleHeaderClick} = useSortTable({items});

    // @ts-ignore
    return (
        <table className="text-left" role="table">
            <thead>
            <tr>
                {columns.map((column: ColumnConfig<T>) => (
                    <th
                        key={String(column.key)}
                        className="p-3"
                        onClick={() => handleHeaderClick(column.key, column.sortable ?? true)}
                        style={{cursor: column.sortable ? 'pointer' : 'default'}}
                        role="columnheader"
                        aria-sort={sortKey === column.key ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
                        aria-label={column.header}
                    >
                        {column.header}
                        {sortKey === column.key && (
                            <span className="ml-2" role="img" aria-label={sortOrder === 'asc' ? 'ascending' : 'descending'}>
                                {sortOrder === 'asc' ? '▲' : '▼'}
                            </span>
                        )}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {sortedItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-200" role="row">
                    {columns.map((column: ColumnConfig<T>) => (
                        <td key={String(column.key)} className="p-3" role="cell">
                            {column.render ?
                                column.render(item[column.key], item)
                                :
                                String(item[column.key])
                            }
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default Table;
