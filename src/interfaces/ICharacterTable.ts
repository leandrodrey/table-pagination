export interface ICharacterTable {
    id: number;
    name: string;
    species: string;
    status: 'Alive' | 'Dead' | 'unknown';
    imageUrl: string;
}
