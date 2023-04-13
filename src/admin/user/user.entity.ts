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
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiPropertyOptional()
  name?: string;

  @Expose()
  @ApiPropertyOptional({ type: Date })
  birthday?: Date;

  @Exclude()
  status: UserStatus;

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}
