import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './user.dto';

describe('UserController', () => {
  let controller: UserController;
  const userService = mock<UserService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return a User', async () => {
      userService.create.mockResolvedValueOnce({} as User);
      const data: UserDto = {} as UserDto;

      expect(controller.create(data)).resolves.toEqual({} as User);
    });
  });

  describe('findAll', () => {
    it('should return an array of Users', async () => {
      userService.findAll.mockResolvedValueOnce([{}] as User[]);
      const query = {};

      expect(controller.findAll(query)).resolves.toEqual([{}] as User[]);
    });
  });

  describe('findById', () => {
    it('should return a User', async () => {
      userService.findByIdOrFail.mockResolvedValueOnce({} as User);
      const id = '1';
      expect(controller.findById(id)).resolves.toEqual({} as User);
    });
  });

  describe('update', () => {
    it('should return a User', async () => {
      userService.update.mockResolvedValueOnce({} as User);
      const id = '1';
      const data: UserDto = {} as UserDto;

      expect(controller.update(id, data)).resolves.toEqual({} as User);
    });
  });

  describe('remove', () => {
    it('should return void', async () => {
      userService.remove.mockResolvedValueOnce(undefined);
      const id = '1';

      expect(controller.remove(id)).resolves.toBeUndefined();
    });
  });
});
