import { TestingModule, Test } from '@nestjs/testing';
import { DtoValidationPipe } from './dto-validation-pipe';

describe('DtoValidationPipe', () => {
  let pipe: DtoValidationPipe;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DtoValidationPipe],
    }).compile();
    pipe = module.get<DtoValidationPipe>(DtoValidationPipe);
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  describe('transform', () => {
    it('should pass if data is not body', async () => {
      const value = {};
      await expect(pipe.transform(value, { type: 'body' })).resolves.toEqual(value);
    });
  });
});
