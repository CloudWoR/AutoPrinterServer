import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../users/users.service';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly moduleRef: ModuleRef,
  ) {
    super({
      passReqToCallback: true,
    });
  }
  async validate(
    request: Request,
    username: string,
    password: string,
  ): Promise<User> {
    const contextId = ContextIdFactory.getByRequest(request);
    const authService = await this.moduleRef.resolve(AuthService, contextId);
    const user = await authService.validadeUser(username, password);
    if (!user) {
      throw new UnauthorizedException('用户名或密码错误！');
    }
    return user;
  }
}
