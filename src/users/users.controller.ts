import { Controller, Get, Post, Body, Patch, Param, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersDto } from './dto/find-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async find(@Req() req) {
    return await this.usersService.findOneById(req.user.id);
  }

  @Patch('me')
  async update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.updateOneById(req.user.id, updateUserDto);
  }

  @Get('me/wishes')
  async getOwnWishes(@Req() req) {
    return await this.usersService.findWishes(req.user.id);
  }

  @Get(':username')
  async FindByUserName(@Param('username') username: string) {
    return await this.usersService.findByUserName(username);
  }

  @Get(':username/wishes')
  async getWishes(@Param('username') username: string) {
    const { id } = await this.usersService.findByUserName(username);
    return await this.usersService.findWishes(id);
  }

  @Post('find')
  async findMany(@Body() findUserDto: FindUsersDto) {
    return await this.usersService.findMany(findUserDto.query);
  }
}
