import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class UserDto extends UserEntity {
  @IsNumber()
  id: number;

  @IsNumber()
  companyId: number;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsBoolean()
  isMaster: boolean;
}
