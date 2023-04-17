import { TestingModule, Test } from '@nestjs/testing';
import { PayloadValidationPipe } from './playload-validation-pipe';

describe('DtoValidationPipe', () => {
  let pipe: PayloadValidationPipe;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayloadValidationPipe],
    }).compile();
    pipe = module.get<PayloadValidationPipe>(PayloadValidationPipe);
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
