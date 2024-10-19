// TODO delete this file. This is used as example for @services typing.

export type CharacterStatus = 'Alive' | 'unknown' | 'Dead';
export type CharacterSpecie = 'Human' | 'Alien';

export type Character = {
  id: number;
  name: string;
  status: CharacterStatus;
  species: CharacterSpecie;
  image: string;
};

export type CharacterResponse = {
  results: Character[];
};
