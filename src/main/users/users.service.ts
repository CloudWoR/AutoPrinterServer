import { Injectable } from '@nestjs/common';
import { Role } from '../roles/role.enum';
// import { Role } from 'src/roles/role.enum';
// import { Role } from 'src/roules/role.enum';

export type User = {
  userId: number;
  username: string;
  password?: string;
  roles?: Role[];
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'admin',
      password: '123456',
      roles: [],
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      roles: [],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
