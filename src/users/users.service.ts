import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username, email } = createUserDto;
    const exists = await this.userRepository.exists({
      where: [{ username }, { email }],
    });
    if (exists) {
      throw new ConflictException(
        'Пользователь с таким email или username уже существует',
      );
    }
    const user = this.userRepository.create({
      username: createUserDto.username,
      about: createUserDto.about,
      avatar: createUserDto.avatar,
      email: createUserDto.email,
      password: this.hashService.getHash(createUserDto.password),
    });
    const newUser = await this.userRepository.save(user);
    return newUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Пользователь с таким id не найден');
    }
    return user;
  }

  async updateOne(userId: number, updateUserDto: UpdateUserDto) {
    const { username, email, password } = updateUserDto;
    if (email) {
      const userUsesEmail = await this.userRepository.findOne({
        select: {
          username: true,
          email: true,
          password: true,
        },
        where: {
          email: email,
        },
      });
      if (userUsesEmail && userUsesEmail.id !== userId) {
        throw new ConflictException('Такой email уже используется');
      }
    }
    if (username) {
      const userUsesUsername = await this.userRepository.findOne({
        select: {
          username: true,
          email: true,
          password: true,
        },
        where: {
          username: username,
        },
      });
      if (userUsesUsername && userUsesUsername.id !== userId) {
        throw new ConflictException('Такой username уже используется');
      }
    }
    if (password) {
      const hashedPassword = this.hashService.getHash(password);
      updateUserDto.password = hashedPassword;
    }

    const userToBeUpdated = await this.userRepository.findOne({
      select: {
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
    const updatedUser = await this.userRepository.update(
      { id: userId },
      userToBeUpdated,
    );
    return updatedUser;
  }

  async removeOne(userId: number) {
    const userToBeRemoved = await this.userRepository.findOneBy({ id: userId });
    return await this.userRepository.remove(userToBeRemoved);
  }
}
