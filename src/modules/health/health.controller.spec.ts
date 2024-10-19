import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthModule } from './health.module';

describe('Health Controller', () => {
  let appController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HealthModule],
    }).compile();

    appController = app.get(HealthController);
  });

  describe('root', () => {
    it('should compile the module', async () => {
      const module = await Test.createTestingModule({
        imports: [HealthModule],
      }).compile();

      expect(module).toBeDefined();
    });

    it('Should return OK', () => {
      expect(appController.healthCheck().status).toBe('OK');
    });
  });
});
