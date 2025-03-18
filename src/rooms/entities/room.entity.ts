import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyEntity } from 'src/companies/entities/company.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { DetectorEntity } from 'src/detectors/entities/detector.entity';

@Entity({ name: 'rooms' })
export class RoomEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  companyId: number;

  @Column()
  ownerId: number;

  @ManyToOne(() => CompanyEntity, (company) => company.rooms)
  company: CompanyEntity;

  @ManyToOne(() => UserEntity, (user) => user.rooms)
  owner: UserEntity;

  @OneToMany(() => DetectorEntity, (detector) => detector.room)
  detectors: DetectorEntity[];
}
