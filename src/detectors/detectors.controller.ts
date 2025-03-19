import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DetectorsService } from './detectors.service';
import { CreateDetectorDto } from './dto/create-detector.dto';
import { UpdateDetectorDto } from './dto/update-detector.dto';
import { RoleJwtGuard } from 'src/auth/guards/role.guard';

@UseGuards(RoleJwtGuard)
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

  @Get(':id/analytics')
  getMetricsAnalytics(@Param('id') id: string) {
    return this.detectorsService.getMetricsAnalytics(+id);
  }

  @Get(':id/metrics')
  getMetrics(@Param('id') id: string) {
    return this.detectorsService.getMetrics(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detectorsService.findOne({ id: +id });
  }

  @Put(':id/extremes')
  setExtremes(
    @Param('id') id: string,
    @Body() extremes: { maxValue: number; minValue: number },
  ) {
    return this.detectorsService.setExtremes(+id, extremes);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDetectorDto: UpdateDetectorDto,
  ) {
    return this.detectorsService.update(+id, updateDetectorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detectorsService.remove(+id);
  }
}
