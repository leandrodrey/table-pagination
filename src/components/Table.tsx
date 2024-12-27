import {ReactNode, useState} from "react";
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

    const { sortedItems, sortKey, sortOrder, handleHeaderClick } = useSortTable({ items });

    return (
        <table className="text-left">
            <thead>
            <tr>
                {columns.map((column) => (
                    <th
                        key={String(column.key)}
                        className="p-3"
                        onClick={() => handleHeaderClick(column.key, column.sortable ?? true)}
                        style={{cursor: column.sortable ? 'pointer' : 'default'}}
                    >
                        {column.header}
                        {sortKey === column.key && (
                            <span className="ml-2">
                                {sortOrder === 'asc' ? '▲' : '▼'}
                            </span>
                        )}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {sortedItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                    {columns.map((column) => (
                        <td key={String(column.key)} className="p-3">
                            {column.render ? (
                                column.render(item[column.key], item)
                            ) : (
                                item[column.key]
                            )}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default Table;
