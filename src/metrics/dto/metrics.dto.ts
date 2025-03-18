import { IsDate, IsDateString, IsNumber, IsString } from 'class-validator';
import { MetricsEntity } from '../entities/metric.entity';

export class MetricsDto extends MetricsEntity {
  @IsNumber()
  id: number;

  @IsNumber()
  detectorId: number;

  @IsNumber()
  value: number;

  @IsDateString()
  timestamp: Date;

  @IsString()
  type: string;

  @IsString()
  unit: string;
}
