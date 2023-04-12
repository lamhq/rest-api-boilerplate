import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('Health Check')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Check API service is running' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('email')
  @ApiOperation({ summary: 'Check API service is running' })
  sendEmail(): Promise<void> {
    return this.appService.sendEmail();
  }
}
