import {ReactNode} from "react";

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
}

const Table = <T extends BaseTableItem>({ items, columns }: TableProps<T>) => {
    return (
        <table>
            <thead>
            <tr>
                {columns.map((column) => (
                    <th key={String(column.key)}>{column.header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {items.map((item) => (
                <tr key={item.id}>
                    {columns.map((column) => (
                        <td key={String(column.key)}>
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
