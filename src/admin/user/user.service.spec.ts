import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

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
    it('should create a user and add to users array', async () => {
      const data: UserDto = {
        name: 'Alice',
        email: 'alice@example.com',
        birthday: new Date(),
      };
      expect(service.create(data)).resolves.toMatchObject({
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
        name: data.name,
        email: data.email,
        birthday: expect.any(Date),
      });
    });
  });
});
