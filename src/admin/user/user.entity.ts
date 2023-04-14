import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ICollectionQuery } from '@src/common/orm/collection-query';
import { Exclude, Expose } from 'class-transformer';

export enum UserStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export interface IUserQuery extends ICollectionQuery {
  status?: UserStatus;
  email?: string;
}

export class User {
  @Expose()
  @ApiProperty({ example: 1 })
  id: number;

  @Expose()
  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @Expose()
  @ApiPropertyOptional({ example: 'John Doe' })
  name?: string;

  @Expose()
  @ApiPropertyOptional({ type: Date, example: '2000-01-01' })
  birthday?: Date;

  @Exclude()
  status: UserStatus;

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}
