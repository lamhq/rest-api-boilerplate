import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Return the user information associated with the request
 * You can retrieve user attribute value by passing an attribute name
 * @param data attribute name
 */
export const factoryFn = (data: string | undefined, ctx: ExecutionContext): unknown | undefined => {
  const request = ctx.switchToHttp().getRequest();
  const { user } = request;

  return data ? user && user[data] : user;
};

export const User = createParamDecorator(factoryFn);
