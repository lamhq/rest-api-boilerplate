import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfiguration } from './config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService<IConfiguration, true>) {}

  getHello(): string {
    const port = this.configService.get('port', { infer: true });
    return `App is running at port ${port}`;
  }
}
