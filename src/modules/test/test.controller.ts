import { Controller, Get, HttpCode } from '@nestjs/common';
import { Character } from '../../@types/rickandmorty.types';
import { TestService } from './test.service';
import { HttpStatusCode } from 'axios';

@Controller('/test')
export class TestController {
  constructor(private readonly service: TestService) {}

  @HttpCode(HttpStatusCode.Ok)
  @Get()
  async fetchCharacters(): Promise<Character[]> {
    return await this.service.fetchCharacters();
  }
}
