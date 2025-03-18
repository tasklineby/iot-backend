import { OmitType } from '@nestjs/mapped-types';
import { CompanyDto } from './company.dto';

export class CreateCompanyDto extends OmitType(CompanyDto, [
  'id',
  'masterId' as const,
]) {}
