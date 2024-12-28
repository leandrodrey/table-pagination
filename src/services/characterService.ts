import { ICharacter } from "../interfaces/ICharacter";
import useFiltersStore from "../hooks/useFiltersStore";

const BASE_URL = "https://rickandmortyapi.com/api/character";

const getCharacters = async (page: number) => {
    try {
        const filters = useFiltersStore.getState().filters;
        const params = new URLSearchParams({ page: page.toString() });

        for (const [key, value] of Object.entries(filters)) {
            if (value) {
                params.append(key, value);
            }
        }

        const response = await fetch(`${BASE_URL}?${params.toString()}`);
        const data = await response.json();
        return { results: data.results as ICharacter[], info: data.info };
    } catch (error) {
        console.error("Error in getCharacters:", error);
        throw error;
    }
};

export const characterService = {
    getCharacters,
};
