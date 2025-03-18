import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricsEntity } from './entities/metric.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MetricsEntity])],
  controllers: [MetricsController],
  providers: [MetricsService],
})
export class MetricsModule {}
