import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class UserDto extends UserEntity {
  @IsNumber()
  id: number;

  @IsString()
  companyCode: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsBoolean()
  isMaster: boolean;
}
