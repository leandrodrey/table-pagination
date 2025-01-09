import {ITableFilterConfig} from "../interfaces/ITableFilterConfig.ts";


export const filterConfig: ITableFilterConfig[] = [
    {
        name: 'status',
        label: 'Status',
        options: [
            { value: 'alive', label: 'Alive' },
            { value: 'dead', label: 'Dead' },
            { value: 'unknown', label: 'Unknown' },
        ],
    },
    {
        name: 'species',
        label: 'Species',
        options: [
            { value: 'Human', label: 'Human' },
            { value: 'Alien', label: 'Alien' },
        ],
    },
    {
        name: 'gender',
        label: 'Gender',
        options: [
            { value: 'female', label: 'Female' },
            { value: 'male', label: 'Male' },
            { value: 'genderless', label: 'Genderless' },
            { value: 'unknown', label: 'Unknown' },
        ],
    },
];
