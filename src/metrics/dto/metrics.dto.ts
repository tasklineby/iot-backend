import { IsDate, IsNumber, IsString } from 'class-validator';
import { MetricsEntity } from '../entities/metric.entity';

export class MetricsDto extends MetricsEntity {
  @IsNumber()
  id: number;

  @IsNumber()
  detectorId: number;

  @IsNumber()
  value: number;

  @IsDate()
  timestamp: Date;

  @IsString()
  type: string;

  @IsString()
  unit: string;
}
