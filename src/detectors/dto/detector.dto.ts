import { IsNumber, IsString } from 'class-validator';
import { DetectorEntity } from '../entities/detector.entity';

export class DetectorDto extends DetectorEntity {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  currentMetricsValue: number;

  @IsString()
  currentMetricsType: string;

  @IsString()
  currentMetricsUnit: string;

  @IsNumber()
  roomId: number;

  @IsNumber()
  minValue: number;

  @IsNumber()
  maxValue: number;
}
