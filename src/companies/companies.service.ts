import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyEntity } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companiesRepository: Repository<CompanyEntity>,
  ) {}

  async create(company: CreateCompanyDto) {
    try {
      this.companiesRepository.create(company);
      return await this.companiesRepository.save(company);
    } catch (err) {
      throw new BadRequestException('Invalid credentials');
    }
  }

  async findAll() {
    return await this.companiesRepository.find();
  }

  async findOne(where: FindOptionsWhere<CompanyEntity>) {
    const queryBuilder = this.companiesRepository
      .createQueryBuilder('company')
      .where(where);

    return await queryBuilder.getOne();
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return await this.companiesRepository.update(id, updateCompanyDto);
  }

  async remove(id: number) {
    return await this.companiesRepository.delete(id);
  }
}
