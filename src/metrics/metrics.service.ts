import { Injectable } from '@nestjs/common';
import { CreateMetricDto } from './dto/create-metric.dto';
import { UpdateMetricDto } from './dto/update-metric.dto';
import { MetricsEntity } from './entities/metric.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Repository, FindOptionsWhere, LessThan } from 'typeorm';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class MetricsService {
  constructor(
    @InjectRepository(MetricsEntity)
    private readonly metricsRepository: Repository<MetricsEntity>,
  ) {}

  async create(metrics: CreateMetricDto) {
    try {
      this.metricsRepository.create(metrics);
      return await this.metricsRepository.save(metrics);
    } catch (err) {
      throw new BadRequestException('Invalid input');
    }
  }

  async findAll() {
    return await this.metricsRepository.find();
  }

  async findOne(where: FindOptionsWhere<MetricsEntity>) {
    const queryBuilder = this.metricsRepository
      .createQueryBuilder('company')
      .where(where);

    return await queryBuilder.getOne();
  }

  async update(id: number, updateMetricsDto: UpdateMetricDto) {
    return await this.metricsRepository.update(id, updateMetricsDto);
  }

  async remove(id: number) {
    return await this.metricsRepository.delete(id);
  }

  @Cron('* * * 1 * *')
  async clearExpiredMetrics() {
    const expired = new Date();
    expired.setDate(expired.getDate() - 30);

    await this.metricsRepository.delete({
      timestamp: LessThan(expired),
    });
  }
}
