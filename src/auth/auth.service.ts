import { createHash } from 'crypto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@src/admin/user/user.entity';
import { UserService } from '@src/admin/user/user.service';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { IAccessToken } from './access-token';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

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

  private validatePassword(password: string, hash: string): boolean {
    const algorithm = 'sha256';
    const message = password;

    const hashObj = createHash(algorithm);
    hashObj.update(message);

    const digest = hashObj.digest('hex');
    return digest === hash;
  }

  async createAccessToken(user: User): Promise<IAccessToken> {
    return { value: user.email };
  }
}
