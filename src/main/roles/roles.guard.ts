import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // console.log('context: ', context);
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('roles: ', roles);
    if (!roles) {
      return false;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('user: ', user);
    if (!user) {
      throw new UnauthorizedException('权限错误');
    }
    return true;
  }
}
