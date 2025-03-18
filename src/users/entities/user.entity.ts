import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyEntity } from 'src/companies/entities/company.entity';
import { RoomEntity } from 'src/rooms/entities/room.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  companyId: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ nullable: false, default: false })
  isMaster: boolean;

  @ManyToOne(() => CompanyEntity, (company) => company.users)
  company: CompanyEntity;

  @OneToMany(() => RoomEntity, (room) => room.ownerId)
  rooms: RoomEntity[];
}
