import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishList } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(WishList)
    private wishListRepository: Repository<WishList>,
  ) {}

  async findAll() {
    return await this.wishListRepository.find({
      relations: {
        owner: true,
        items: true,
      },
    });
  }
  async create(userId: number, createWishlistDto: CreateWishlistDto) {
    const newWishlist = await this.wishListRepository.save(createWishlistDto);
    return newWishlist;
  }

  async findOneById(wishListId: number) {
    const wishList = await this.wishListRepository.findOneBy({
      id: wishListId,
    });
    return wishList;
  }

  async updateOneById(
    wishListId: number,
    updateWishlistDto: UpdateWishlistDto,
  ) {
    const wishListToBeUpdated = await this.wishListRepository.findOne({
      select: {
        id: true,
        name: true,
        image: true,
      },
      where: {
        id: wishListId,
      },
    });
    for (const key in updateWishlistDto) {
      wishListToBeUpdated[key] = updateWishlistDto[key];
    }
    const wishList = await this.wishListRepository.save(wishListToBeUpdated);
    return wishList;
  }

  async removeOneById(wishListId: number) {
    const wishToBeRemoved = await this.wishListRepository.findOneBy({
      id: wishListId,
    });
    return await this.wishListRepository.remove(wishToBeRemoved);
  }
}
