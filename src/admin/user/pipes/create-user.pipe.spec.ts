import { TestingModule, Test } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { ValidationException } from '@src/common/validation/validation.exception';
import { CommonError } from '@src/common/validation/common-error';
import { UserService } from '../user.service';
import { UserDto } from '../user.dto';
import { CreateUserPipe } from './create-user.pipe';
import { User } from '../user.entity';

describe('CreateUserPipe', () => {
  let pipe: CreateUserPipe;
  const userService = mock<UserService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserPipe,
        {
          provide: UserService,
          useValue: userService,
        },
      ],
    }).compile();

    pipe = module.get<CreateUserPipe>(CreateUserPipe);
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  describe('transform', () => {
    const userDto: UserDto = {
      name: 'John Doe',
      email: 'johndoe@example.com',
    };

    it('should throw ValidationException with CommonError.DuplicatedError if user already exists', async () => {
      // Mocking userService.findOne to return a non-null value.
      userService.findOne.mockResolvedValueOnce(new User({ id: 1 }));

      // Assert that transform() throws a ValidationException with the correct error message
      await expect(pipe.transform(userDto)).rejects.toThrow(
        new ValidationException({ email: CommonError.DuplicatedError }),
      );
    });

    it('should return the value if user does not exist', async () => {
      // Mocking userService.findOne to return null value.
      userService.findOne.mockResolvedValueOnce(undefined);

      // Assert that the transform() function returns the same value if user does not exist.
      expect(await pipe.transform(userDto)).toEqual(userDto);
    });
  });
});
