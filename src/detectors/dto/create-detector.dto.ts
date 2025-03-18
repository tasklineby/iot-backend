import { OmitType } from '@nestjs/mapped-types';
import { DetectorDto } from './detector.dto';

export class CreateDetectorDto extends OmitType(DetectorDto, [
  'id',
  'minValue',
  'maxValue' as const,
]) {}
