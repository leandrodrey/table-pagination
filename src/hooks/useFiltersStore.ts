import {create} from 'zustand'
import {IFilterValues} from "../interfaces/IFilterValues";

type FiltersState = {
    filters: IFilterValues;
    setFilters: (filters: IFilterValues) => void;
};

const useFiltersStore = create<FiltersState>((set) => ({
    filters: {status: '', species: '', gender: ''},
    setFilters: (filters) => set({filters}),
}));

export default useFiltersStore;
