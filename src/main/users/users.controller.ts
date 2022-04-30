import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../roles/roles.decorator';

@Controller('users')
export class UsersController {
  @Get()
  // @Roles(Role.Admin)
  // @UseGuards(new RolesGuard())
  userTest() {
    // throw new HttpException('用户名或密码错误！', HttpStatus.BAD_REQUEST);
    return 'user';
  }

  @Post()
  @Roles('admin', 'doctor')
  createUser(@Body() body: unknown) {
    return body;
  }
}
