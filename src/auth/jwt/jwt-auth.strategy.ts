import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfiguration } from '@src/config';
import { User } from '@src/admin/user/user.entity';
import { AuthService } from '../auth.service';
import { IJwtPayload } from './jwt-payload';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
    configService: ConfigService<IConfiguration, true>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req): string => (req.cookies ? req.cookies['access-token'] : undefined),
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.jwtSecret', { infer: true }),
    });
  }

  async validate(payload: IJwtPayload): Promise<User> {
    return this.authService.validateJwtPayload(payload);
  }
}
