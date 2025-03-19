import { Module } from '@nestjs/common';
import { DetectorsService } from './detectors.service';
import { DetectorsController } from './detectors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetectorEntity } from './entities/detector.entity';
import { JwtModule } from '@nestjs/jwt';
import { DataProcessorModule } from 'src/ai-data-processor/data-processor.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetectorEntity]),
    JwtModule,
    DataProcessorModule,
  ],
  controllers: [DetectorsController],
  providers: [DetectorsService],
  exports: [DetectorsService],
})
export class DetectorsModule {}
