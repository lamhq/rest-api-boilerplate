import { BadRequestException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { CommonError } from './common-error';

type ErrorValue = string | [IErrorDetails];

export interface IErrorDetails {
  [x: string]: ErrorValue;
}

export function getErrorDetails(errors: ValidationError[]): IErrorDetails {
  return errors.reduce((previousValue, currentValue) => {
    if (currentValue.constraints) {
      return {
        ...previousValue,
        [currentValue.property]: Object.values(currentValue.constraints || {})[0],
      };
    }
    return {
      ...previousValue,
      [currentValue.property]: currentValue.children
        ? currentValue.children.map((item) => getErrorDetails(item.children || []))
        : undefined,
    };
  }, {});
}

export class ValidationErrorException extends BadRequestException {
  constructor(errors: ValidationError[] | IErrorDetails) {
    const details = Array.isArray(errors) ? getErrorDetails(errors) : errors;
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: CommonError.ValidationError,
      details,
    });
  }
}
