import { Test, TestingModule } from '@nestjs/testing';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { IRickAndMorteApi } from '../../@services/rick-and-morty-api.service';
import { TestModule } from './test.module';

describe('Test Controller', () => {
  let appController: TestController;
  let apiExample: IRickAndMorteApi;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    apiExample = app.get('IRickAndMorteApi');
    const service = new TestService(apiExample);
    appController = new TestController(service);
  });

  describe('root', () => {
    it('should compile the module', async () => {
      const module = await Test.createTestingModule({
        imports: [TestModule],
      }).compile();

      expect(module).toBeDefined();
    });

    it('Should return characters', async () => {
      jest
        .spyOn(apiExample, 'fetchCharacters')
        .mockImplementation(async () => []);

      expect((await appController.fetchCharacters()).length).toBe(0);
    });
  });
});
