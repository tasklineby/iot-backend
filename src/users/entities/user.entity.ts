import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
