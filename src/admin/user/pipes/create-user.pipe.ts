import { Injectable, PipeTransform } from '@nestjs/common';
import { ValidationException } from '@src/common/validation/validation.exception';
import { CommonError } from '@src/common/validation/common-error';
import { UserDto } from '../user.dto';
import { UserService } from '../user.service';

@Injectable()
export class CreateUserPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}

  async transform(value: UserDto): Promise<UserDto> {
    // check email duplication
    const user = await this.userService.findOne({ email: value.email });
    if (user) {
      throw new ValidationException({ email: CommonError.DuplicatedError });
    }

    return value;
  }
}
