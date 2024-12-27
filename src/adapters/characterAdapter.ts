import {ICharacter} from "../interfaces/ICharacter.ts";
import {ICharacterTable} from "../interfaces/ICharacterTable.ts";


export const characterAdapter = (character: ICharacter): ICharacterTable => ({
    id: character.id,
    name: character.name,
    species: character.species,
    status: character.status,
    imageUrl: character.image
});
