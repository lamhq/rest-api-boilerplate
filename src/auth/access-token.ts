import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AccessToken {
  @Expose()
  @ApiProperty()
  value: string;

  @Expose()
  @ApiProperty()
  expireAt: Date;

  constructor(partial: Partial<AccessToken>) {
    Object.assign(this, partial);
  }
}
