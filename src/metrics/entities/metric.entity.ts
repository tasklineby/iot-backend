import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { DetectorEntity } from 'src/detectors/entities/detector.entity';

@Entity({ name: 'metrics' })
export class MetricsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  detectorId: number;

  @Column()
  value: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column()
  type: string;

  @Column()
  unit: string;

  @ManyToOne(() => DetectorEntity, (detector) => detector.metrics)
  detector: DetectorEntity;
}
