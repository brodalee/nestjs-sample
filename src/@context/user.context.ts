import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const UserContext = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization!.trim().split(' ')[1];
    const payload = JSON.parse(atob(token.split('.')[1]));

    return {
      id: payload.userId,
    };
  },
);

export interface User {
  id: string;
}
