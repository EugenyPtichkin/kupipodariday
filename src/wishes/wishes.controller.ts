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
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  async create(
    @Req() req,
    @Body() createWishDto: CreateWishDto,
  ): Promise<Wish> {
    return await this.wishesService.create(req.user.id, createWishDto);
  }

  @Get('last')
  async findLast(): Promise<Wish[]> {
    return await this.wishesService.findLast();
  }

  @Get('top')
  async findTop(): Promise<Wish[]> {
    return await this.wishesService.findTop();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Wish> {
    return await this.wishesService.findOneById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') wishId: number,
    @Body() updateWishDto: UpdateWishDto,
    @Req() req,
  ): Promise<Wish> {
    return await this.wishesService.updateOneById(
      req.user.id,
      wishId,
      updateWishDto,
    );
  }

  @Delete(':id')
  async removeOne(@Req() req, @Param('id') wishId: number): Promise<Wish> {
    return await this.wishesService.removeOneById(req.user.id, wishId);
  }

  @Post(':id/copy')
  async copyWish(@Req() req, @Param('id') wishId: number) {
    return await this.wishesService.copyWish(req.user.id, wishId);
  }
}
