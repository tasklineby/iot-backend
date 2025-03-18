import { OmitType } from '@nestjs/mapped-types';
import { DetectorDto } from './detector.dto';

export class CreateDetectorDto extends OmitType(DetectorDto, ['id' as const]) {}
