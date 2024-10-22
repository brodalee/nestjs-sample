import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { IncomingHttpHeaders } from 'http';
import { Request } from 'express';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    if (!this.hasHeader(request.headers)) {
      throw new UnauthorizedException();
    }

    if (!this.isValid(request.headers.authorization!)) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private hasHeader(headers: IncomingHttpHeaders): boolean {
    return headers.authorization != undefined;
  }

  private isValid(header: string): boolean {
    return header.startsWith('Bearer ');
  }
}
