import { Injectable, NotFoundException } from '@nestjs/common';

import { IDField } from '@src/common/orm/id-field';
import { UserDto } from './user.dto';
import { IUserQuery, User, UserStatus } from './user.entity';

@Injectable()
export class UserService {
  private users: User[] = [
    new User({
      id: 1,
      name: 'John',
      email: 'john@example.com',
      status: UserStatus.Active,
      hashedPassword: '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e',
    }),
    new User({ id: 2, name: 'Jane', email: 'jane@example.com', status: UserStatus.Inactive }),
    new User({ id: 3, name: 'Bob', email: 'bob@example.com', status: UserStatus.Active }),
    new User({ id: 18, name: 'Alice', email: 'alice@example.com', status: UserStatus.Active }),
    new User({ id: 19, name: 'Mike', email: 'mike@example.com', status: UserStatus.Inactive }),
    new User({ id: 20, name: 'Sarah', email: 'sarah@example.com', status: UserStatus.Active }),
  ];

  async create(data: UserDto): Promise<User> {
    const user = new User({
      id: this.getNewId(),
      name: data.name,
      email: data.email,
      birthday: data.birthday,
      status: UserStatus.Active,
    });
    this.users.push(user);
    return user;
  }

  async findAll(query: IUserQuery): Promise<User[]> {
    let { users } = this;
    users = users.filter((u) => u.status === UserStatus.Active);

    if (query.email) {
      users = users.filter((u) => u.email === query.email);
    }

    if (query.id) {
      const { id } = query;
      users = users.filter((u) => u.id.toString() === id.toString());
    }

    if (query.offset && query.limit) {
      users = users.slice(query.offset, query.offset + query.limit);
    }

    return users;
  }

  async findOne(query: IUserQuery): Promise<User | undefined> {
    const users = await this.findAll({ ...query, limit: 1, offset: 0 });
    return users.length ? users[0] : undefined;
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
