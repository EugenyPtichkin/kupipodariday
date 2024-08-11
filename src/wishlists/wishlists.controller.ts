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
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  findAll() {
    return this.wishlistsService.findAll();
  }

  @Post()
  async create(@Req() req, @Body() createWishlistDto: CreateWishlistDto) {
    return await this.wishlistsService.create(req.user.id, createWishlistDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.wishlistsService.findOneById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return this.wishlistsService.updateOneById(id, updateWishlistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.wishlistsService.removeOneById(id);
  }
}
