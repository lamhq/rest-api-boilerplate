import { Request } from 'express';
import { Controller, Post, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiHeader,
} from '@nestjs/swagger';

import { User } from '@src/admin/user/user.entity';
import { AuthService } from './auth.service';
import { BasicAuthGuard } from './basic/basic-auth.guard';
import { CurUser } from './cur-user.decorator';
import { AccessToken } from './access-token';

const AUTH_COOKIE_NAME = 'access-token';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('access-tokens')
  @ApiOperation({ summary: 'Create new access token' })
  @ApiHeader({
    name: 'Authorization',
    description: 'encoded login credentials',
    required: true,
    example: 'Basic am9obkBleGFtcGxlLmNvbToxMjMxMjM=',
  })
  @ApiOkResponse({ type: AccessToken })
  @ApiUnauthorizedResponse({ description: 'Invalid login credentials' })
  @UseGuards(BasicAuthGuard)
  async getAccessToken(@CurUser() user: User, @Req() req: Request): Promise<AccessToken> {
    const token = await this.authService.createAccessToken(user);
    req.res?.cookie(AUTH_COOKIE_NAME, token.value, {
      expires: token.expireAt,
      httpOnly: true,
    });
    return token;
  }
}
