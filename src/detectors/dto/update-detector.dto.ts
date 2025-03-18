import { PartialType } from '@nestjs/mapped-types';
import { CreateDetectorDto } from './create-detector.dto';

export class UpdateDetectorDto extends PartialType(CreateDetectorDto) {}
