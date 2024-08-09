import { Module } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { WishlistsController } from './wishlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Wish } from '../wishes/entities/wish.entity';
import { Offer } from '../offers/entities/offer.entity';
import { WishList } from '../wishlists/entities/wishlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wish, WishList, Offer])],
  controllers: [WishlistsController],
  providers: [WishlistsService],
})
export class WishlistsModule {}
