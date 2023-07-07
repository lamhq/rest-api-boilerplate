import { mock } from 'jest-mock-extended';
import { Test } from '@nestjs/testing';
import { User } from '@src/admin/user/user.entity';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../services/auth.service';
import { IJwtPayload } from './jwt-payload';
import { JwtAuthStrategy } from './jwt-auth.strategy';

describe('JwtAuthStrategy', () => {
  const authService = mock<AuthService>();
  const configService = mock<ConfigService>();
  let jwtAuthStrategy: JwtAuthStrategy;

  beforeEach(async () => {
    configService.get.mockReturnValueOnce('secret');
    const moduleRef = await Test.createTestingModule({
      providers: [
        JwtAuthStrategy,
        { provide: AuthService, useValue: authService },
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    jwtAuthStrategy = moduleRef.get<JwtAuthStrategy>(JwtAuthStrategy);
  });

  describe('validate', () => {
    it('should return user object based on payload', async () => {
      const payload: IJwtPayload = { userId: 'test-id' };
      const user = new User({ id: 1 });
      authService.validateJwtPayload.mockResolvedValueOnce(user);

      await expect(jwtAuthStrategy.validate(payload)).resolves.toMatchObject({ id: user.id });
    });
  });
});
