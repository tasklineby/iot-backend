import { Module } from '@nestjs/common';
import { DetectorsService } from './detectors.service';
import { DetectorsController } from './detectors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetectorEntity } from './entities/detector.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetectorEntity])],
  controllers: [DetectorsController],
  providers: [DetectorsService],
})
export class DetectorsModule {}
