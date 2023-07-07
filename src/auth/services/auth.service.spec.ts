import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserService } from '@src/admin/user/user.service';
import { User } from '@src/admin/user/user.entity';
import { AuthService } from './auth.service';
import { AccessToken } from '../access-token';

describe('service', () => {
  let service: AuthService;
  const userService = mock<UserService>();
  const jwtService = mock<JwtService>();
  const configService = mock<ConfigService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: userService,
        },
        {
          provide: JwtService,
          useValue: jwtService,
        },
        {
          provide: ConfigService,
          useValue: configService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser()', () => {
    it('should throw error if username is invalid', async () => {
      userService.findOne.mockResolvedValueOnce(undefined);
      await expect(service.validateUser('invalidusername', 'mypassword')).rejects.toThrowError();
    });

    it('should throw error if hashed password is missing', async () => {
      const user = { email: 'john@example.com' } as User;
      userService.findOne.mockResolvedValueOnce(user);

      await expect(service.validateUser(user.email, 'mypassword')).rejects.toThrowError();
    });

    it('should throw error if password is invalid', async () => {
      const user = {
        email: 'john@example.com',
        hashedPassword: 'fdasf8q24fasfasdcaswefqwefdsfd',
      } as User;
      userService.findOne.mockResolvedValueOnce(user);

      await expect(service.validateUser(user.email, 'wrongpassword')).rejects.toThrowError();
    });

    it('should return the user if username and password are valid', async () => {
      const user = new User({
        email: 'john@example.com',
        hashedPassword: '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e',
      });
      userService.findOne.mockResolvedValueOnce(user);
      await expect(service.validateUser(user.email, '123123')).resolves.toBe(user);
    });
  });

  describe('validateJwtPayload()', () => {
    it('should throw error if user is not found', async () => {
      const payload = { userId: 1 };
      userService.findOne.mockResolvedValueOnce(undefined);
      await expect(service.validateJwtPayload(payload)).rejects.toThrowError();
    });

    it('should return the user if payload is valid', async () => {
      const payload = { userId: 1 };
      const user = new User();
      userService.findOne.mockResolvedValueOnce(user);

      await expect(service.validateJwtPayload(payload)).resolves.toBe(user);
    });
  });

  describe('createAccessToken()', () => {
    it('should return a valid access token', async () => {
      const user = new User();
      const duration = '1d';
      const token = '123';
      configService.get.mockReturnValueOnce(duration);
      jwtService.sign.mockReturnValueOnce(token);
      const result = await service.createAccessToken(user);

      expect(result).toBeInstanceOf(AccessToken);
      expect(result.expireAt).toBeInstanceOf(Date);
      expect(result.value).toBe(token);
    });
  });

  // describe('setAuthCookie()', () => {
  //   it('should set auth cookie in response', () => {
  //     const req = { res: { cookie: jest.fn() } };
  //     const token = new AccessToken({ value: 'token', expireAt: new Date() });

  //     authService.setAuthCookie(req as any, token);

  //     expect(req.res.cookie).toHaveBeenCalled();
  //   });
  // });
});
