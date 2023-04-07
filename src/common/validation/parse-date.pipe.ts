import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

/**
 * A custom pipe that checks if the input value is a valid date string, and returns it as a Date object.
 * If the input value is empty or not a valid date string, it returns undefined.
 * Usage: @Query('from', new ParseDatePipe()) from?: Date
 */
@Injectable()
export class ParseDatePipe implements PipeTransform<string, Date | undefined> {
  transform(value: string): Date | undefined {
    if (value && Number.isNaN(Date.parse(value))) {
      throw new BadRequestException('Invalid Date string');
    }
    return value ? new Date(value) : undefined;
  }
}
