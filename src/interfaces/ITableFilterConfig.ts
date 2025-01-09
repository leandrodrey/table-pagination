export interface IFilterOption {
    value: string;
    label: string;
}

export interface ITableFilterConfig {
    name: string;
    label: string;
    options: IFilterOption[];
}
