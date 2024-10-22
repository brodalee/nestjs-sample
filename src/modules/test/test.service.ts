import { Inject, Injectable } from '@nestjs/common';
import { Character } from '../../@types/rickandmorty.types';
import {
  RickAndMortyApi,
  IRickAndMorteApi,
} from '../../@services/rick-and-morty-api.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class TestService {
  constructor(
    @RickAndMortyApi() private readonly apiService: IRickAndMorteApi,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async fetchCharacters(): Promise<Character[]> {
    return await this.apiService.fetchCharacters();
  }

  async fetchCharactersWithRedis(): Promise<Character[]> {
    const key = 'my_key';
    const value = await this.cacheManager.get<Character[]>(key);
    if (value) {
      return value;
    }

    const characters = await this.fetchCharacters();
    await this.cacheManager.set(key, characters, 60);

    return characters;
  }
}
