import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetectorsService } from './detectors.service';
import { CreateDetectorDto } from './dto/create-detector.dto';
import { UpdateDetectorDto } from './dto/update-detector.dto';

@Controller('detectors')
export class DetectorsController {
  constructor(private readonly detectorsService: DetectorsService) {}

  @Post()
  create(@Body() createDetectorDto: CreateDetectorDto) {
    return this.detectorsService.create(createDetectorDto);
  }

  @Get()
  findAll() {
    return this.detectorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detectorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetectorDto: UpdateDetectorDto) {
    return this.detectorsService.update(+id, updateDetectorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detectorsService.remove(+id);
  }
}
