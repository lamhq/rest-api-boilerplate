import { mock } from 'jest-mock-extended';
import { Test, TestingModule } from '@nestjs/testing';

import { AppService } from './app.service';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;
  const appService = mock<AppService>();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: appService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      appService.getHello.mockReturnValueOnce('Hello World!');
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
