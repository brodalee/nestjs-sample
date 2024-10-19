import { Injectable } from '@nestjs/common';
import { Character } from '../../@types/rickandmorty.types';
import {
  RickAndMortyApi,
  IRickAndMorteApi,
} from '../../@services/rick-and-morty-api.service';

@Injectable()
export class TestService {
  constructor(
    @RickAndMortyApi() private readonly apiService: IRickAndMorteApi,
  ) {}
  async fetchCharacters(): Promise<Character[]> {
    return await this.apiService.fetchCharacters();
  }
}
