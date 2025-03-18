import { Injectable, UseGuards } from '@nestjs/common';
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
    private readonly detectorsRepository: Repository<DetectorEntity>,
  ) {}

  async create(detector: CreateDetectorDto) {
    try {
      this.detectorsRepository.create(detector);
      return await this.detectorsRepository.save(detector);
    } catch (err) {
      throw new BadRequestException('Invalid credentials');
    }
  }

  async findAll() {
    return await this.detectorsRepository.find();
  }

  async findOne(where: FindOptionsWhere<DetectorEntity>) {
    const queryBuilder = this.detectorsRepository
      .createQueryBuilder('company')
      .where(where);

    return await queryBuilder.getOne();
  }

  async setExtremes(
    id: number,
    extremes: { maxValue: number; minValue: number },
  ) {
    return await this.detectorsRepository.update(id, extremes);
  }

  async update(id: number, updateDetectorDto: UpdateDetectorDto) {
    return await this.detectorsRepository.update(id, updateDetectorDto);
  }

  async remove(id: number) {
    return await this.detectorsRepository.delete(id);
  }
}
