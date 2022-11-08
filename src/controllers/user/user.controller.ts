import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsersByCuisine(@Query() params: any) {
    const users = await this.userService.getUsersByCuisine(params);
    return users;
  }
}
