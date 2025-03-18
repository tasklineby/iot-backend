import { Module } from '@nestjs/common';
import { DetectorsService } from './detectors.service';
import { DetectorsController } from './detectors.controller';

@Module({
  controllers: [DetectorsController],
  providers: [DetectorsService],
})
export class DetectorsModule {}
