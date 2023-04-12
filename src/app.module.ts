import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configFactory } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // allow injecting ConfigService in module factory
      isGlobal: true,
      load: [configFactory],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
