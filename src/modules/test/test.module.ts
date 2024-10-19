import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { RickAndMortyProvider } from '../../@services/rick-and-morty-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [TestController],
  providers: [TestService, RickAndMortyProvider],
})
export class TestModule {}
