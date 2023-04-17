import { Injectable, ValidationPipe, ArgumentMetadata } from '@nestjs/common';

@Injectable()
/**
 * A global pipe that validate and transform the request body using class-validator
 * https://docs.nestjs.com/techniques/validation#using-the-built-in-validationpipe
 */
export class PayloadValidationPipe extends ValidationPipe {
  /**
   * Validate and transform the input data to class object
   * @param value The incoming request object data.
   * @param metadata Metadata about the request object data (e.g. parameter type).
   * @returns The transformed and validated data.
   * @throws A validation error if the input data fails validation.
   */
  public async transform(value: unknown, metadata: ArgumentMetadata): Promise<unknown> {
    // skip validation for object not in request body
    if (metadata.type !== 'body') {
      return value;
    }
    return super.transform(value, metadata);
  }
}
