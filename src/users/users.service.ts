import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.save(createUserDto);
    return newUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    return user;
  }

  async updateOne(userId: number, updateUserDto: UpdateUserDto) {
    const userToBeUpdated = await this.userRepository.findOne({
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
      },
      where: {
        id: userId,
      },
    });
    for (const key in updateUserDto) {
      userToBeUpdated[key] = updateUserDto[key];
    }
    const user = await this.userRepository.save(userToBeUpdated);
    return user;
  }

  async removeOne(userId: number) {
    const userToBeRemoved = await this.userRepository.findOneBy({ id: userId });
    return await this.userRepository.remove(userToBeRemoved);
  }
}
