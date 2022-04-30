import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard(['local', 'jwt']) {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    // 自定义逻辑认证
    // 调用super.logIn(request)来建立一个session
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // 可以抛出一个基于info或者err参数的异常
    // console.log('jwt')
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
