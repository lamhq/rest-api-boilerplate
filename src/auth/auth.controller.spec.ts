import { mock } from 'jest-mock-extended';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@src/admin/user/user.entity';
import { Request } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessToken } from './access-token';

describe('AuthController', () => {
  let controller: AuthController;
  const authService = mock<AuthService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAccessToken', () => {
    it('should return access token and set cookie on request', async () => {
      const token = new AccessToken({ value: 'token', expireAt: new Date() });
      authService.createAccessToken.mockResolvedValueOnce(token);
      const user = new User();
      const req = { res: { cookie: jest.fn() } } as unknown as Request;

      await expect(controller.getAccessToken(user, req)).resolves.toBe(token);
      expect(req.res?.cookie).toHaveBeenCalledWith('access-token', token.value, {
        expires: expect.any(Date),
        httpOnly: true,
      });
    });
  });
});
