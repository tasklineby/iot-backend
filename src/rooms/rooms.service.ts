import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomEntity } from './entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly companiesRepository: Repository<RoomEntity>,
  ) {}

  async create(room: CreateRoomDto) {
    try {
      this.companiesRepository.create(room);
      return await this.companiesRepository.save(room);
    } catch (err) {
      throw new BadRequestException('Invalid input');
    }
  }

  async findAll() {
    return await this.companiesRepository.find();
  }

  async findOne(where: FindOptionsWhere<RoomEntity>) {
    const queryBuilder = this.companiesRepository
      .createQueryBuilder('company')
      .where(where);

    return await queryBuilder.getOne();
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    return await this.companiesRepository.update(id, updateRoomDto);
  }

  async remove(id: number) {
    return await this.companiesRepository.delete(id);
  }
}
