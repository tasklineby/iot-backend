import { Injectable } from '@nestjs/common';
import { CreateDetectorDto } from './dto/create-detector.dto';
import { UpdateDetectorDto } from './dto/update-detector.dto';
import { DetectorEntity } from './entities/detector.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class DetectorsService {
  constructor(
    @InjectRepository(DetectorEntity)
    private readonly companiesRepository: Repository<DetectorEntity>,
  ) {}

  async create(detector: CreateDetectorDto) {
    try {
      this.companiesRepository.create(detector);
      return await this.companiesRepository.save(detector);
    } catch (err) {
      throw new BadRequestException('Invalid credentials');
    }
  }

  async findAll() {
    return await this.companiesRepository.find();
  }

  async findOne(where: FindOptionsWhere<DetectorEntity>) {
    const queryBuilder = this.companiesRepository
      .createQueryBuilder('company')
      .where(where);

    return await queryBuilder.getOne();
  }

  async update(id: number, updateDetectorDto: UpdateDetectorDto) {
    return await this.companiesRepository.update(id, updateDetectorDto);
  }

  async remove(id: number) {
    return await this.companiesRepository.delete(id);
  }
}
