import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricsEntity } from './entities/metric.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([MetricsEntity]),
    ScheduleModule.forRoot(),
  ],
  controllers: [MetricsController],
  providers: [MetricsService],
})
export class MetricsModule {}
