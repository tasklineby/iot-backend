import { Module } from '@nestjs/common';
import { DetectorsService } from './detectors.service';
import { DetectorsController } from './detectors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetectorEntity } from './entities/detector.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([DetectorEntity]), JwtModule],
  controllers: [DetectorsController],
  providers: [DetectorsService],
  exports: [DetectorsService],
})
export class DetectorsModule {}
