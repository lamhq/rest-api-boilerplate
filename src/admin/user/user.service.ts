import { Injectable, NotFoundException } from '@nestjs/common';

import { IDField } from '@src/common/orm/id-field';
import { UserDto } from './user.dto';
import { IUserQuery, User, UserStatus } from './user.entity';

@Injectable()
export class UserService {
  private users: User[] = [
    { id: 1, name: 'John', email: 'john@example.com', status: UserStatus.Active },
  ];

  async create(data: UserDto): Promise<User> {
    const user = new User({
      name: data.name,
      email: data.email,
      birthday: data.birthday,
      id: this.getNewId(),
    });
    this.users.push(user);
    return user;
  }

  async findAll(query: IUserQuery): Promise<User[]> {
    let { users } = this;
    if (query.status) {
      users = users.filter((u) => u.status === query.status);
    }

    if (query.email) {
      users = users.filter((u) => u.email === query.email);
    }

    if (query.offset && query.limit) {
      users = users.slice(query.offset, query.limit);
    }

    return users;
  }

  async findByIdOrFail(id: IDField): Promise<User> {
    const user = this.users.find((u) => u.id.toString() === id.toString());
    if (!user) {
      throw new NotFoundException(`There is no user with id: ${id}`);
    }
    return user;
  }

  async update(id: IDField, data: UserDto): Promise<User> {
    const user = await this.findByIdOrFail(id);
    Object.assign(user, data);
    return user;
  }

  async remove(id: IDField): Promise<void> {
    this.users = this.users.filter((u) => u.id.toString() !== id.toString());
  }

  private getNewId(): number {
    const arr = this.users.map((u) => u.id);
    let newId: number;
    // loop until there are no duplicates
    do {
      newId = Math.floor(Math.random() * 100) + 1; // generate a random number between 1 and 100
    } while (arr.includes(newId));
    return newId;
  }
}
