import { IsNumber, IsString } from 'class-validator';
import { CompanyEntity } from '../entities/company.entity';

export class CompanyDto extends CompanyEntity {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsNumber()
  masterId: number;
}
