import { MetricsDto } from './metrics.dto';
import { OmitType } from '@nestjs/mapped-types';

export class CreateMetricDto extends OmitType(MetricsDto, ['id' as const]) {}
