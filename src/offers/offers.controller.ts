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
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

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

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offersService.updateOneById(id, updateOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.offersService.removeOneById(id);
  }
}
