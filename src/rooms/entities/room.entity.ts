import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyEntity } from 'src/companies/entities/company.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity({ name: 'rooms' })
export class RoomEntity {
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
}
