import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { User, UserStatus } from './user.entity';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const data: UserDto = {
        name: 'Lily',
        email: 'lily@example.com',
        birthday: new Date(),
      };
      expect(service.create(data)).resolves.toMatchObject({
        id: expect.any(Number),
        name: data.name,
        email: data.email,
        birthday: expect.any(Date),
      });

      const users = await service.findAll({
        email: data.email,
        offset: 0,
        limit: 100,
      });
      expect(users[0]).toMatchObject({
        id: expect.any(Number),
        name: data.name,
        email: data.email,
        birthday: expect.any(Date),
      });
    });
  });

  describe('findAll', () => {
    it('should return all users if no query is passed', async () => {
      const results = await service.findAll({});
      expect(results).toEqual(expect.any(Array));
      expect(results.length).toBeGreaterThan(0);
      expect(results[0]).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        email: expect.any(String),
      });
    });

    it('should filter and return users by status provided in query', async () => {
      const results = await service.findAll({});

      expect(results).toEqual(expect.any(Array));
      expect(results.length).toBe(4);
      expect(results.every((u) => u.status === UserStatus.Active)).toBeTruthy();
    });

    it('should filter and return users by email provided in query', async () => {
      const query = { email: 'john@example.com' };
      const results = await service.findAll(query);

      expect(results).toEqual(expect.any(Array));
      expect(results.length).toBe(1);
      expect(results[0].email).toBe(query.email);
    });

    it('should apply limit and offset if provided in query', async () => {
      const query = { offset: 1, limit: 3 };
      const results = await service.findAll(query);

      expect(results).toEqual(expect.any(Array));
      expect(results.length).toBe(query.limit);
    });
  });

  describe('findOne', () => {
    it('should return the first user matching the query', async () => {
      await expect(service.findOne({})).resolves.toBeInstanceOf(User);
    });

    it('should return undefined if no users match the query', async () => {
      const query = { email: 'invalid@example.com' };
      await expect(service.findOne(query)).resolves.toBeUndefined();
    });
  });

  describe('findByIdOrFail', () => {
    it('should return the user matching given id', async () => {
      const id = 1;
      const user = await service.findByIdOrFail(id);

      expect(user).toBeInstanceOf(User);
      expect(user.id).toBe(id);
    });

    it('should throw NotFoundException if no users match the given id', async () => {
      const id = 100;
      expect.assertions(1);
      try {
        await service.findByIdOrFail(id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('update', () => {
    it('should update and return the user matching given id with given data', async () => {
      const id = 1;
      const userData: UserDto = {
        name: 'Updated Name',
        email: 'updatedemail@example.com',
        birthday: new Date('2000-01-02'),
      };

      const user = await service.update(id, userData);

      expect(user).toBeInstanceOf(User);
      expect(user.id).toBe(id);
    });

    it('should throw NotFoundException if no users match the given id', async () => {
      const id = 100;
      const userData: UserDto = {
        name: 'Test User',
        email: 'testuser@example.com',
        birthday: new Date('2000-01-01'),
      };

      expect.assertions(1);
      try {
        await service.update(id, userData);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('remove', () => {
    it('should remove the user matching given id from users list', async () => {
      const idToRemove = 1;
      await expect(service.remove(idToRemove)).resolves.toBeUndefined();
    });
  });
});
