import { Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { ValidationException } from '@src/common/validation/validation.exception';
import { CommonError } from '@src/common/validation/common-error';
import { UserDto } from '../user.dto';
import { UserService } from '../user.service';

@Injectable({ scope: Scope.REQUEST })
export class UpdateUserPipe implements PipeTransform {
  constructor(
    @Inject(REQUEST) private request: Request,
    private readonly userService: UserService,
  ) {}

  async transform(value: UserDto): Promise<UserDto> {
    // check email duplication
    const user = await this.userService.findOne({ email: value.email });
    const userId = this.request.params.id;
    if (user && user.id.toString() !== userId.toString()) {
      throw new ValidationException({ email: CommonError.DuplicatedError });
    }

    return value;
  }
}
