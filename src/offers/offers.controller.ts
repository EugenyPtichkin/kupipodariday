import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  async create(@Body() createOfferDto: CreateOfferDto, @Req() req) {
    return await this.offersService.create(req.user.id, createOfferDto);
  }

  @Get()
  async findAll() {
    return await this.offersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.offersService.findOneById(id);
  }
}
