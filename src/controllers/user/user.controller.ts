import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/models/user.model';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //get a list of users for a specific cuisine
  @Get()
  @ApiTags('user')
  @ApiQuery({ name: 'cuisine'})
  @ApiOkResponse({
    description: 'Gets a list of users for a specific cuisine',
  })
  async getUsersByCuisine(@Query() params: any) {
    const users = await this.userService.getUsersByCuisine(params);
    return users;
  }

  //posts a new user to database
  //this function was not part of the task however was implemented for testing purposes
  @Post()
  @ApiTags('user')
  @ApiCreatedResponse({ description: 'Insert new user' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  async insertUser(@Body() user: User) {
    return await this.userService.insertUser(user);
  }
}
