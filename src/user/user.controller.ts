import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser({
      ...userData,
    });
  }

  @Post('login')
  logUserIn(@Body() userData: Partial<User>) {
    return this.userService.logUserIn(userData);
  }

  @Get(':id')
  getUserData(@Param('id') id: string) {
    return this.userService.getUserData(id);
  }

  @Get('exists/:email')
  checkIfUserExists(@Param('email') email: string) {
    return this.userService.checkIfUserExists(email);
  }

  @Put(':id')
  updateUserData(@Param('id') id: string, @Body() userData: Partial<User>) {
    return this.userService.updateUserData(id, userData);
  }
}
