import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { User } from './../users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(id: number, createWishDto: CreateWishDto) {
    const user = await this.userRepository.findOneBy({ id });
    //eslint-disable-next-line
    const { password, ...restUser } = user;
    const newWish = await this.wishRepository.save({
      ...createWishDto,
      owner: restUser,
    });
    return newWish;
  }

  async findLast() {
    const wishes = await this.wishRepository.find({
      order: { createdAt: 'DESC' },
      skip: 0,
      take: 40,
    });
    return wishes;
  }

  async findTop() {
    const wishes = await this.wishRepository.find({
      order: { copied: 'DESC' },
      skip: 0,
      take: 20,
    });
    return wishes;
  }

  async findOneById(wishId: number) {
    const wish = await this.wishRepository.findOne({
      where: { id: wishId },
      relations: {
        owner: true,
        offers: {
          user: true,
        },
      },
    });
    if (!wish) {
      throw new NotFoundException('Подарок не найден');
    }
    return wish;
  }

  async updateOneById(
    userId: number,
    wishId: number,
    updateWishDto: UpdateWishDto,
  ) {
    const wishToBeUpdated = await this.wishRepository.findOne({
      where: { id: wishId },
      relations: { owner: true },
    });
    if (!wishToBeUpdated) {
      throw new NotFoundException('Подарок не найден');
    }
    if (wishToBeUpdated.owner.id !== userId) {
      throw new BadRequestException('Чужой подарок нельзя редактировать');
    }
    if (
      (updateWishDto.price || updateWishDto.description) &&
      wishToBeUpdated.raised > 0
    ) {
      throw new BadRequestException(
        'Цену и описанеи подарка нельзя редактировать, поскольку на него уже скидываются',
      );
    }
    await this.wishRepository.update(wishId, updateWishDto);
    const updatedWish = await this.wishRepository.findOneBy({ id: wishId });
    return updatedWish;
  }

  async removeOneById(userId: number, wishId: number) {
    const wishToBeRemoved = await this.wishRepository.findOne({
      where: { id: wishId },
      relations: { owner: true },
    });
    if (!wishToBeRemoved) {
      throw new NotFoundException('Подарок не найден');
    }
    if (wishToBeRemoved.owner.id !== userId) {
      throw new BadRequestException('Чужой подарок нельзя удалить');
    }
    await this.wishRepository.delete(wishId);
    return wishToBeRemoved;
  }

  async copyWish(userId: number, wishId: number) {
    const wishToBeCopied = await this.wishRepository.findOne({
      where: { id: wishId },
      relations: { owner: true },
    });
    if (!wishToBeCopied) {
      throw new NotFoundException('Подарок не найден');
    }
    if (wishToBeCopied.owner.id === userId) {
      throw new BadRequestException('Свой подарок нельзя скопировать к себе');
    }
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { wishes: true },
    });

    const isUserHasWish = user.wishes.some(
      (wishItem) => wishItem.id === wishToBeCopied.wishId,
    );
    if (isUserHasWish) {
      throw new ConflictException('У Вас уже есть этот подарок');
    }

    const copyOfWish = this.wishRepository.create(wishToBeCopied);
    copyOfWish.copied = 0;
    copyOfWish.raised = 0;
    copyOfWish.owner = user;
    wishToBeCopied.copied++;
    await this.wishRepository.save(wishToBeCopied);
    await this.wishRepository.insert(copyOfWish);

    return {};
  }
}
