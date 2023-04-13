import { Injectable, PipeTransform } from '@nestjs/common';
import { UserDto } from '../user.dto';

@Injectable()
export class AddUserPipe implements PipeTransform {
  async transform(value: UserDto): Promise<UserDto> {
    return value;
  }
}
