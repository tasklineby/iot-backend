import { RoomEntity } from 'src/rooms/entities/room.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { MetricsEntity } from 'src/metrics/entities/metric.entity';

@Entity({ name: 'detectors' })
export class DetectorEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  currentMetricsValue: number;

  @Column()
  currentMetricsType: string;

  @Column()
  currentMetricsUnit: string;

  @ManyToOne(() => RoomEntity, (room) => room.detectors)
  room: RoomEntity;

  @OneToMany(() => MetricsEntity, (metric) => metric.detector)
  metrics: MetricsEntity[];
}
