import { Module } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { WishlistsController } from './wishlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishList } from '../wishlists/entities/wishlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WishList])],
  controllers: [WishlistsController],
  providers: [WishlistsService],
  exports: [WishlistsService],
})
export class WishlistsModule {}
