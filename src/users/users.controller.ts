import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @Get(':username')
  async FindByUserName(@Param('username') username: string) {
    return await this.usersService.findByUserName(username);
  }

  @Post('find')
  findMany(@Body('query') query: string) {
    return this.usersService.findMany(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOneById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.removeOneById(id);
  }
}
