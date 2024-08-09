import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}
  async create(createOfferDto: CreateOfferDto) {
    const newOffer = await this.offerRepository.save(createOfferDto);
    return newOffer;
  }

  findAll() {
    return `This action returns all offers`;
  }

  findOne(offerId: number) {
    return this.offerRepository.findOneBy({ id: offerId });
  }

  async updateOne(offerId: number, updateOfferDto: UpdateOfferDto) {
    const offerToBeUpdated = await this.offerRepository.findOne({
      select: {
        id: true,
        amount: true,
        hidden: true,
      },
      where: {
        id: offerId,
      },
    });
    for (const key in updateOfferDto) {
      offerToBeUpdated[key] = updateOfferDto[key];
    }
    const offer = await this.offerRepository.save(offerToBeUpdated);
    return offer;
  }

  async removeOne(offerId: number) {
    const offerToBeRemoved = await this.offerRepository.findOneBy({
      id: offerId,
    });
    return await this.offerRepository.remove(offerToBeRemoved);
  }
}
