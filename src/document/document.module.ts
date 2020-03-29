import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Document } from 'entities/document.entity';
import { DocumentHistory } from 'entities/document-history.entity';
import { DocumentService } from './document.service';

@Module({
  imports: [TypeOrmModule.forFeature([Document, DocumentHistory])],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
