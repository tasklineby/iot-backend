import { Injectable } from '@nestjs/common';
import { CreateDetectorDto } from './dto/create-detector.dto';
import { UpdateDetectorDto } from './dto/update-detector.dto';

@Injectable()
export class DetectorsService {
  create(createDetectorDto: CreateDetectorDto) {
    return 'This action adds a new detector';
  }

  findAll() {
    return `This action returns all detectors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detector`;
  }

  update(id: number, updateDetectorDto: UpdateDetectorDto) {
    return `This action updates a #${id} detector`;
  }

  remove(id: number) {
    return `This action removes a #${id} detector`;
  }
}
