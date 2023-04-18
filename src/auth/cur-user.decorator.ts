import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@src/admin/user/user.entity';

export const factoryFn = (data: string | undefined, ctx: ExecutionContext): User | undefined => {
  const request = ctx.switchToHttp().getRequest();
  const { user } = request;

  return data ? user && user[data] : user;
};

export const CurUser = createParamDecorator(factoryFn);
