import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateUserPipe } from './pipes/update-user.pipe';

describe('UserController', () => {
  let controller: UserController;
  const userService = mock<UserService>();
  const updateUserPipe = mock<UpdateUserPipe>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userService,
        },
      ],
    })
      // override pipe with mock instance
      .overridePipe(UpdateUserPipe)
      .useValue(updateUserPipe)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return a User', async () => {
      const user = new User({});
      userService.create.mockResolvedValueOnce(user);
      expect(controller.create({ email: 'abc@m.com' })).resolves.toEqual(user);
    });
  });

  describe('findAll', () => {
    it('should return an array of Users', async () => {
      userService.findAll.mockResolvedValueOnce([]);
      expect(controller.findAll(0, 10)).resolves.toEqual([]);
    });
  });

  describe('findById', () => {
    it('should return a User', async () => {
      const user = new User({});
      userService.findByIdOrFail.mockResolvedValueOnce(user);
      expect(controller.findById('1')).resolves.toEqual(user);
    });
  });

  describe('update', () => {
    it('should return a User', async () => {
      const user = new User({});
      const data = { email: 'abc@m.com' };
      userService.update.mockResolvedValueOnce(user);

      expect(controller.update('1', data)).resolves.toEqual(user);
    });
  });

  describe('remove', () => {
    it('should success', async () => {
      userService.remove.mockResolvedValueOnce(undefined);
      expect(controller.remove('1')).resolves.toBeUndefined();
    });
  });
});
