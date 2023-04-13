import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { IUserQuery, User } from './user.entity';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() data: UserDto): Promise<User> {
    return this.userService.create(data);
  }

  @Get()
  findAll(@Query() query: IUserQuery): Promise<User[]> {
    return this.userService.findAll(query);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<User> {
    return this.userService.findByIdOrFail(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UserDto): Promise<User> {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
