import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { RoomEntity } from 'src/rooms/entities/room.entity';
import { DetectorEntity } from 'src/detectors/entities/detector.entity';

@Entity({ name: 'companies' })
export class CompanyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  code: string;

  @Column({ nullable: true })
  masterId: number;

  @OneToMany(() => UserEntity, (user) => user.companyId)
  users: UserEntity[];

  @OneToMany(() => RoomEntity, (room) => room.company)
  rooms: RoomEntity[];

  @OneToMany(() => DetectorEntity, (detector) => detector.company)
  detectors: DetectorEntity[];
}
