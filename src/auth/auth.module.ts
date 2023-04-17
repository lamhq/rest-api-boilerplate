import { Module } from '@nestjs/common';
import { AdminModule } from '@src/admin/admin.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BasicAuthStrategy } from './basic/basic-auth.strategy';

/**
 * Contain code for authentication
 * Generating access tokens for different login methods
 * Validating access tokens
 */
@Module({
  controllers: [AuthController],
  providers: [AuthService, BasicAuthStrategy],
  imports: [AdminModule],
})
export class AuthModule {}
