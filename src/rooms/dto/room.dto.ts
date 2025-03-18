import { IsNumber, IsString } from 'class-validator';
import { RoomEntity } from '../entities/room.entity';

export class RoomDto extends RoomEntity {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  companyId: number;

  @IsNumber()
  ownerId: number;
}
