import { Controller, Post, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { User } from '@src/admin/user/user.entity';
import { AuthService } from './auth.service';
import { BasicAuthGuard } from './basic/basic-auth.guard';
import { CurUser } from './cur-user.decorator';
import { IAccessToken } from './access-token';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('access-tokens')
  @UseGuards(BasicAuthGuard)
  async getAccessToken(@CurUser() user: User): Promise<IAccessToken> {
    return this.authService.createAccessToken(user);
  }
}
