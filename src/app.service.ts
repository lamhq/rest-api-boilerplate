import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { IConfiguration } from './config';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService<IConfiguration, true>,
    private readonly mailerService: MailerService,
  ) {}

  getHello(): string {
    const port = this.configService.get('port', { infer: true });
    return `App is running at port ${port}`;
  }

  async sendEmail(): Promise<void> {
    const from = this.configService.get('mail.senderEmail', { infer: true });
    const message: ISendMailOptions = {
      from,
      to: 'john@example.com',
      subject: 'Hello world',
      template: './hello',
      context: {
        name: 'John',
      },
    };
    await this.mailerService.sendMail(message);
  }
}
