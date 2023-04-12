import { mock } from 'jest-mock-extended';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;
  const configService = mock<ConfigService>();
  configService.get.mockReturnValue(3000);

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        // mock configService
        {
          provide: ConfigService,
          useValue: configService,
        },
      ],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return "App is running at port 3000"', () => {
      expect(appService.getHello()).toBe('App is running at port 3000');
    });
  });
});
