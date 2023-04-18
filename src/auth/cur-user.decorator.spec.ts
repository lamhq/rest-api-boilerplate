import { ExecutionContext } from '@nestjs/common';
import { mock } from 'jest-mock-extended';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { factoryFn } from './cur-user.decorator';

describe('CurUser decorator', () => {
  const mockExecutionContext = mock<ExecutionContext>();
  const httpArgumentsHost = mock<HttpArgumentsHost>();
  const request = {
    user: { id: '1', name: 'John Doe', role: 'admin' },
  };

  beforeEach(() => {
    httpArgumentsHost.getRequest.mockReturnValue(request);
    mockExecutionContext.switchToHttp.mockReturnValue(httpArgumentsHost);
  });

  it('should return user object when no data parameter is provided', () => {
    const result = factoryFn(undefined, mockExecutionContext);

    expect(result).toEqual(request.user);
  });

  it('should return user property specified by data parameter', () => {
    const result = factoryFn('id', mockExecutionContext);

    expect(result).toEqual('1');
  });

  it('should return undefined when user property does not exist', () => {
    const result = factoryFn('email', mockExecutionContext);

    expect(result).toBeUndefined();
  });
});
