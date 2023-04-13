import { ValidationError } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { ValidationErrorException } from './validation-error.exception';
import { CommonError } from './common-error';

jest.mock('@nestjs/common', () => ({
  __esModule: true, // this property makes it work
  BadRequestException: jest.fn(),
  HttpStatus: { BAD_REQUEST: 400 },
}));

describe('ValidationErrorException', () => {
  it('should pass error object to BadRequestException', () => {
    // const constructor = jest.spyOn(common, 'BadRequestException');
    const errors: ValidationError[] = [
      { property: 'email', constraints: { anything: 'is required' }, children: [] },
      {
        property: 'addresses',
        children: [
          {
            property: '0',
            children: [
              { property: 'phone', constraints: { anything: 'is required' }, children: [] },
            ],
          },
        ],
      },
    ];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    try {
      throw new ValidationErrorException(errors);
      // eslint-disable-next-line no-empty
    } catch (error) {}
    expect(BadRequestException).toHaveBeenCalledWith({
      statusCode: 400,
      errorCode: CommonError.ValidationError,
      details: {
        email: 'is required',
        addresses: [{ phone: 'is required' }],
      },
    });
  });
});
