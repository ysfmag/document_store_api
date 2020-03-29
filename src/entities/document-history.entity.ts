import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Document } from './document.entity';

@Entity()
@Unique(['document', 'version'])
export class DocumentHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb', nullable: true })
  content: string;

  @Column()
  version: number;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne(
    () => Document,
    document => document.history,
    {
      primary: true,
      nullable: false,
    },
  )
  @JoinColumn({ name: 'documentId' })
  document: Document;
}
