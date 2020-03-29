import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { DocumentHistory } from './document-history.entity';

@Entity()
export class Document {
  @PrimaryGeneratedColumn('uuid')
  documentId: string;

  @Column({ type: 'jsonb', nullable: true })
  document: any;

  @Column()
  version: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(
    () => DocumentHistory,
    history => history.document,
    { cascade: true },
  )
  history: DocumentHistory[];
}
