import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Character } from '../../@types/rickandmorty.types';
import { TestService } from './test.service';
import { HttpStatusCode } from 'axios';
import { PostTestInput } from './inputs/postTest.input';
import { AuthenticationGuard } from '../../@guards/authentication.guard';
import { User, UserContext } from '../../@context/user.context';

@Controller('/test')
export class TestController {
  constructor(private readonly service: TestService) {}

  @HttpCode(HttpStatusCode.Ok)
  @Get()
  async fetchCharacters(): Promise<Character[]> {
    return await this.service.fetchCharacters();
  }

  @HttpCode(HttpStatusCode.Ok)
  @Get('/withRedis')
  async fetchCharactersWithRedis(): Promise<Character[]> {
    return await this.service.fetchCharactersWithRedis();
  }

  @HttpCode(HttpStatusCode.Created)
  @Post()
  postTest(@Body() input: PostTestInput): { name: string } {
    return { name: input.name };
  }

  @UseGuards(new AuthenticationGuard())
  @Get('/userContext')
  userContextExample(@UserContext() user: User): { userId: string } {
    return { userId: user.id };
  }
}
