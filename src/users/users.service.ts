import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CompaniesService } from 'src/companies/companies.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly companiesService: CompaniesService,
  ) {}
  private readonly logger = new Logger(UsersService.name);

  async create(user: CreateUserDto) {
    try {
      this.userRepository.create(user);
      const userEntity = await this.userRepository.save(user);
      if (userEntity.isMaster) {
        this.companiesService.update(userEntity.companyId, {
          masterId: userEntity.id,
        });
        return userEntity;
      }
    } catch (err) {
      this.logger.error('Invalid credentials');
      throw new BadRequestException('Invalid credentials');
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(
    where: FindOptionsWhere<UserEntity>,
    selectPassword: boolean = false,
  ) {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .where(where);

    if (selectPassword) {
      queryBuilder.addSelect('user.password');
    }

    return await queryBuilder.getOne();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
