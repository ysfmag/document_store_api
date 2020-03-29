import { Test, TestingModule } from '@nestjs/testing';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Document } from 'entities/document.entity';
import { DocumentHistory } from 'entities/document-history.entity';
import { Repository } from 'typeorm';

class DocumentRepository extends Repository<Document> {}

class DocumentHistoryRepository extends Repository<Document> {}

describe('Document Controller', () => {
  let controller: DocumentController;
  let service: DocumentService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentController],
      providers: [
        DocumentService,
        {
          provide: getRepositoryToken(Document),
          useClass: DocumentRepository,
        },
        {
          provide: getRepositoryToken(DocumentHistory),
          useClass: DocumentHistoryRepository,
        },
      ],
    }).compile();

    controller = module.get<DocumentController>(DocumentController);
    service = module.get<DocumentService>(DocumentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
