import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';
import { OmitType } from '@nestjs/mapped-types';
import { CompanyDto } from './company.dto';

export class UpdateCompanyDto extends PartialType(
  OmitType(CompanyDto, ['id' as const]),
) {}
