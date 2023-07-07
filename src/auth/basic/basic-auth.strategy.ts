import { BasicStrategy } from 'passport-http';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '@src/admin/user/user.entity';
import { AuthService } from '../services/auth.service';

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(BasicStrategy, 'basic') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    return this.authService.validateUser(username, password);
  }
}
