import { useState, useMemo } from "react";

interface BaseTableItem {
    id: string | number;
}

interface UseSortTableProps<T extends BaseTableItem> {
    items: T[];
    sortKey?: keyof T | null;
    sortOrder?: 'asc' | 'desc';
}

const useSortTable = <T extends BaseTableItem>({ items, sortKey, sortOrder }: UseSortTableProps<T>) => {
    const [internalSortKey, setInternalSortKey] = useState<keyof T | null>(sortKey ?? null);
    const [internalSortOrder, setInternalSortOrder] = useState<'asc' | 'desc'>(sortOrder ?? 'asc');

    const handleHeaderClick = (key: keyof T, sortable: boolean) => {
        if (sortable) {
            if (internalSortKey === key) {
                setInternalSortOrder(internalSortOrder === 'asc' ? 'desc' : 'asc');
            } else {
                setInternalSortKey(key);
                setInternalSortOrder('asc');
            }
        }
    };

    const sortedItems = useMemo(() => {
        if (internalSortKey) {
            return [...items].sort((a, b) => {
                const valueA = a[internalSortKey];
                const valueB = b[internalSortKey];

                if (typeof valueA === 'number' && typeof valueB === 'number') {
                    return internalSortOrder === 'asc' ? valueA - valueB : valueB - valueA;
                } else {
                    const stringA = String(valueA).toLowerCase();
                    const stringB = String(valueB).toLowerCase();
                    return internalSortOrder === 'asc'
                        ? stringA.localeCompare(stringB)
                        : stringB.localeCompare(stringA);
                }
            });
        } else {
            return items;
        }
    }, [items, internalSortKey, internalSortOrder]);

    return { sortedItems, sortKey: internalSortKey, sortOrder: internalSortOrder, handleHeaderClick };
}

export default useSortTable;
