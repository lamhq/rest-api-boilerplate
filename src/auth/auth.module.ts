import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AdminModule } from '@src/admin/admin.module';
import { IConfiguration } from '@src/config';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { BasicAuthStrategy } from './basic/basic-auth.strategy';
import { JwtAuthStrategy } from './jwt/jwt-auth.strategy';

/**
 * Contain code for authentication
 * Generating access tokens for different login methods
 * Validating access tokens
 */
@Module({
  controllers: [AuthController],
  providers: [AuthService, BasicAuthStrategy, JwtAuthStrategy],
  imports: [
    AdminModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<IConfiguration, true>) => {
        const duration = configService.get('auth.accessTokenLifetime', { infer: true });
        const secret = configService.get('auth.jwtSecret', { infer: true });
        return {
          secret,
          signOptions: { expiresIn: duration },
        };
      },
    }),
  ],
})
export class AuthModule {}
