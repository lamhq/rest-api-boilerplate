import ms from 'ms';
import { createHash } from 'crypto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { User } from '@src/admin/user/user.entity';
import { UserService } from '@src/admin/user/user.service';
import { IConfiguration } from '@src/config';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { AccessToken } from './access-token';
import { IJwtPayload } from './jwt/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<IConfiguration, true>,
  ) {}

  private validatePassword(password: string, hash: string): boolean {
    const algorithm = 'sha256';
    const message = password;

    const hashObj = createHash(algorithm);
    hashObj.update(message);

    const digest = hashObj.digest('hex');
    return digest === hash;
  }

  async validateUser(username: string, pwd: string): Promise<User> {
    const user = await this.usersService.findOne({ email: username });
    if (!user) {
      throw new UserNotFoundException();
    }

    if (!user.hashedPassword) {
      throw new UnauthorizedException();
    }

    if (!this.validatePassword(pwd, user.hashedPassword)) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async validateJwtPayload(payload: IJwtPayload): Promise<User> {
    const user = await this.usersService.findOne({ id: payload.userId });
    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async createAccessToken(user: User): Promise<AccessToken> {
    const expireAt = new Date();
    const duration = this.configService.get('auth.accessTokenLifetime', { infer: true });
    expireAt.setSeconds(expireAt.getSeconds() + ms(duration) / 1000);
    const jwtPayload: IJwtPayload = {
      userId: user.id,
    };
    const token = new AccessToken({
      value: this.jwtService.sign(jwtPayload),
      expireAt,
    });
    return token;
  }

  // setAuthCookie(req: Request, token: AccessToken) {
  //   req.res!.cookie(TOKEN_COOKIE_NAME, token.token, {
  //     expires: token.expireAt,
  //     httpOnly: true,
  //   });
  // }
}
