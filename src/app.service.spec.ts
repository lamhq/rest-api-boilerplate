import { mock } from 'jest-mock-extended';
import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;
  const configService = mock<ConfigService>();
  const mailerService = mock<MailerService>();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        // mock configService
        {
          provide: ConfigService,
          useValue: configService,
        },
        {
          provide: MailerService,
          useValue: mailerService,
        },
      ],
    }).compile();

    appService = app.get<AppService>(AppService);
    configService.get.mockReturnValue(3000);
    mailerService.sendMail.mockResolvedValue(true);
  });

  describe('getHello', () => {
    it('should return "App is running at port 3000"', () => {
      expect(appService.getHello()).toBe('App is running at port 3000');
    });
  });

  describe('sendEmail', () => {
    it('should send email', () => {
      expect(appService.sendEmail()).resolves.toBeUndefined();
    });
  });
});
