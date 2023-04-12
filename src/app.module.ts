import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IConfiguration, configFactory } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // allow injecting ConfigService in module factory
      isGlobal: true,
      load: [configFactory],
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<IConfiguration, true>) => {
        const mailerOptions = configService.get('mail', { infer: true });
        return mailerOptions;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
