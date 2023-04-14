import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CommonError } from '@src/common/validation/common-error';
import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class UserDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsNotEmpty({ message: CommonError.EmptyValueError })
  email: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: '2000-01-01' })
  @IsOptional()
  @IsDateString(undefined, { message: CommonError.InvalidDateError })
  birthday?: Date;
}
