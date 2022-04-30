import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService, User } from '../users/users.service';
import { JwtPayload } from './interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validadeUser(username: string, password: string) {
    const user = await this.userService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return false;
  }

  async login(user: User) {
    const payload: JwtPayload = {
      username: user.username,
      sub: user.userId,
    };
    console.log('payLoad: ', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
