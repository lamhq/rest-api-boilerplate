import { mock } from 'jest-mock-extended';
import { Test } from '@nestjs/testing';
import { User } from '@src/admin/user/user.entity';
import { BasicAuthStrategy } from './basic-auth.strategy';
import { AuthService } from '../services/auth.service';

describe('BasicAuthStrategy', () => {
  let authStrategy: BasicAuthStrategy;
  const authService = mock<AuthService>();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        BasicAuthStrategy,
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    authStrategy = moduleRef.get<BasicAuthStrategy>(BasicAuthStrategy);
  });

  describe('validate', () => {
    it('should call AuthService.validateUser with correct arguments', async () => {
      const email = 'john@example.com';
      const password = 'secret123';

      const user = new User({ id: 1, email });
      authService.validateUser.mockResolvedValueOnce(user);

      await expect(authStrategy.validate(email, password)).resolves.toEqual(user);
      expect(authService.validateUser).toHaveBeenCalledWith(email, password);
    });
  });
});
