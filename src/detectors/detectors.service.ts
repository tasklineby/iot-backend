import { Injectable, Inject } from '@nestjs/common';
import { CreateDetectorDto } from './dto/create-detector.dto';
import { UpdateDetectorDto } from './dto/update-detector.dto';
import { DetectorEntity } from './entities/detector.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { GeminiAIService } from 'src/ai-data-processor/gemini-ai.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import {
  REDIS_ANALYTICS_PREFIX,
  REDIS_KEY_DELIMITER,
  REDIS_METRICS_PREFIX,
} from 'src/constants/constants';

@Injectable()
export class DetectorsService {
  constructor(
    @InjectRepository(DetectorEntity)
    private readonly detectorsRepository: Repository<DetectorEntity>,
    private readonly geminiAIService: GeminiAIService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
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

  async getMetricsAnalytics(id: number) {
    const cachedAnalytics = await this.cacheManager.get(
      `${REDIS_ANALYTICS_PREFIX}${REDIS_KEY_DELIMITER}${id}`,
    );
    if (cachedAnalytics) {
      return cachedAnalytics;
    }
    const queryBuilder = this.getMetrics(id);
    let promptParameters;
    if (queryBuilder !== null) {
      promptParameters = queryBuilder;
    }
    const result = {
      detector: promptParameters,
      analysis:
        await this.geminiAIService.generateMetricsAnalytics(promptParameters),
    };
    await this.cacheManager.set(
      `${REDIS_ANALYTICS_PREFIX}${REDIS_KEY_DELIMITER}${id}`,
      result,
      1000 * 60 * 30,
    );
    return result;
  }

  async getMetrics(id: number) {
    const cachedMetrics = await this.cacheManager.get(
      `${REDIS_METRICS_PREFIX}${REDIS_KEY_DELIMITER}${id}`,
    );
    if (cachedMetrics) {
      return cachedMetrics;
    }
    const queryBuilder = await this.detectorsRepository
      .createQueryBuilder('detector')
      .leftJoinAndSelect('detector.metrics', 'metrics')
      .where('detector.id = :id', { id: id })
      .getOne();

    await this.cacheManager.set(
      `${REDIS_METRICS_PREFIX}${REDIS_KEY_DELIMITER}${id}`,
      queryBuilder,
      1000 * 60 * 10,
    );
    return queryBuilder;
  }

  async update(id: number, updateDetectorDto: UpdateDetectorDto) {
    return await this.detectorsRepository.update(id, updateDetectorDto);
  }

  async remove(id: number) {
    return await this.detectorsRepository.delete(id);
  }

  async getDetectors(companyId: number) {
    const queryBuilder = await this.detectorsRepository
      .createQueryBuilder('detector')
      .leftJoinAndSelect('detector.metrics', 'metrics')
      .where('detector.companyId = :id', { id: companyId })
      .getMany();

    if (queryBuilder) return queryBuilder;
    else throw new BadRequestException('No detectors in this company');
  }

  private getCacheKey(id: string | number) {
    return;
  }
}
