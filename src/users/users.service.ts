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
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email } = createUserDto;
    const exists = await this.userRepository.exists({
      where: [{ username }, { email }],
    });
    if (exists) {
      throw new ConflictException(
        'Пользователь с таким email или username уже зарегистрирован',
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

  async findMany(query: string): Promise<User[]> {
    return await this.userRepository.find({
      where: [{ username: query }, { email: query }],
    });
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Пользователь с таким id не найден');
    }
    return user;
  }

  async findByUserName(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException('Пользователь user не найден');
    }
    return user;
  }

  async updateOneById(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
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
        throw new ConflictException(
          'Ошибка валидации переданных значений: email уже занят',
        );
      }
    }
    if (username) {
      const userUsesUserName = await this.userRepository.findOne({
        select: {
          username: true,
          email: true,
          password: true,
        },
        where: {
          username: username,
        },
      });
      if (userUsesUserName && userUsesUserName.id !== userId) {
        throw new ConflictException(
          'Ошибка валидации переданных значений: username уже занят',
        );
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
    await this.userRepository.update({ id: userId }, userToBeUpdated);
    return this.userRepository.findOneBy({ id: userId });
  }

  async findWishes(userId: number): Promise<Wish[]> {
    const user = await this.userRepository.findOne({
      relations: { wishes: true },
      where: { id: userId },
    });
    return user.wishes;
  }
}
