import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { ErrorResponse } from '@src/common/validation/error-response';
import { IDField } from '@src/common/orm/id-field';
import { User } from './user.entity';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { CreateUserPipe } from './pipes/create-user.pipe';
import { UpdateUserPipe } from './pipes/update-user.pipe';

@ApiTags('Admin')
@Controller('admin/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create new admin user' })
  @ApiBody({ type: UserDto })
  @ApiOkResponse({ type: User })
  @ApiBadRequestResponse({ type: ErrorResponse, description: 'Invalid user data' })
  create(@Body(CreateUserPipe) data: UserDto): Promise<User> {
    return this.userService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get admin users' })
  @ApiQuery({ name: 'offset', required: false, schema: { default: 0, type: 'number' } })
  @ApiQuery({ name: 'limit', required: false, schema: { default: 10, type: 'number' } })
  @ApiOkResponse({ type: User, isArray: true })
  findAll(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<User[]> {
    return this.userService.findAll({ offset, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: "Get user's details" })
  @ApiParam({ name: 'id', description: "User's id", example: 1 })
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse({ description: 'User not found' })
  findById(@Param('id') id: IDField): Promise<User> {
    return this.userService.findByIdOrFail(id);
  }

  @Put(':id')
  @ApiOperation({ summary: "Update user's details" })
  @ApiParam({ name: 'id', description: "User's id", example: 1 })
  @ApiBody({ type: UserDto })
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ type: ErrorResponse, description: 'Invalid user data' })
  update(@Param('id') id: string, @Body(UpdateUserPipe) data: UserDto): Promise<User> {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove user' })
  @ApiParam({ name: 'id', description: "User's id", example: 1 })
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
