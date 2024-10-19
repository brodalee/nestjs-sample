// TODO : this file is used as example. Delete this when needed.
import { Inject, Injectable, Provider } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Character, CharacterResponse } from '../@types/rickandmorty.types';
import { AxiosResponse } from 'axios';

export interface IRickAndMorteApi {
  fetchCharacters(): Promise<Character[]>;
}

@Injectable()
class RickAndMortyApiService implements IRickAndMorteApi {
  constructor(private readonly httpService: HttpService) {}

  async fetchCharacters(): Promise<Character[]> {
    const response: AxiosResponse<CharacterResponse> =
      await this.httpService.axiosRef.get(
        'https://rickandmortyapi.com/api/character',
      );

    return response.data.results;
  }
}

const token = 'IRickAndMorteApi';
export const RickAndMortyProvider: Provider = {
  useClass: RickAndMortyApiService,
  provide: token,
};

export const RickAndMortyApi = (): PropertyDecorator & ParameterDecorator =>
  Inject(token);
