import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  async create(createWishDto: CreateWishDto) {
    const newWish = await this.wishRepository.save(createWishDto);
    return newWish;
  }

  findAll() {
    return `This action returns all wishes`;
  }

  async findOne(wishId: number) {
    const wish = await this.wishRepository.findOneBy({ id: wishId });
    return wish;
  }

  async updateOne(wishId: number, updateWishDto: UpdateWishDto) {
    const wishToBeUpdated = await this.wishRepository.findOne({
      select: {
        id: true,
        name: true,
        link: true,
        image: true,
        price: true,
        raised: true,
      },
      where: {
        id: wishId,
      },
    });
    for (const key in updateWishDto) {
      wishToBeUpdated[key] = updateWishDto[key];
    }
    const wish = await this.wishRepository.save(wishToBeUpdated);
    return wish;
  }

  async removeOne(wishId: number) {
    const wishToBeRemoved = await this.wishRepository.findOneBy({ id: wishId });
    return await this.wishRepository.remove(wishToBeRemoved);
  }
}
