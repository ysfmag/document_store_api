import { Test, TestingModule } from '@nestjs/testing';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Document } from 'entities/document.entity';
import { DocumentHistory } from 'entities/document-history.entity';
import { DocumentRepository } from './document.repository';
import { DocumentHistoryRepository } from './document-history.repository';

const fakeDocument = {
  document: {
    name: '68c0d0ssss8',
    type: '3',
    quantity: 20,
  },
};
const fakeDocumentDB = new Document();
fakeDocumentDB.documentId = 'b3f88f32-8547-4fb5-95ec-74723aeb9079';
fakeDocumentDB.version = 1;
fakeDocumentDB.document = '{"name":"68c0d0ssss8","type":"3","quantity":20}';

describe('Document Controller', () => {
  let controller: DocumentController;
  let service: DocumentService;
  let documentRepository: DocumentRepository;
  let documentHistoryRepository: DocumentHistoryRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentController],
      providers: [
        DocumentService,
        {
          provide: getRepositoryToken(DocumentRepository),
          useClass: DocumentRepository,
        },
        {
          provide: getRepositoryToken(DocumentHistoryRepository),
          useClass: DocumentHistoryRepository,
        },
      ],
    }).compile();

    controller = module.get<DocumentController>(DocumentController);
    service = module.get<DocumentService>(DocumentService);
    documentRepository = module.get<DocumentRepository>(DocumentRepository);
    documentHistoryRepository = module.get<DocumentHistoryRepository>(
      DocumentHistoryRepository,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create document', async () => {
    const documentRepositoryCreateSpy = jest
      .spyOn(documentRepository, 'createDocument')
      .mockResolvedValueOnce(fakeDocumentDB);

    jest
      .spyOn(documentHistoryRepository, 'createDocumentHistory')
      .mockResolvedValueOnce(new DocumentHistory());

    const documentServiceCreateSpy = jest.spyOn(service, 'create');
    const documentCreated = await controller.create(fakeDocument);
    expect(documentServiceCreateSpy).toHaveBeenCalledTimes(1);
    expect(documentRepositoryCreateSpy).toHaveBeenCalledTimes(1);
    expect(documentCreated?.document).toStrictEqual(fakeDocument.document);
    expect(documentCreated?.version).toEqual(1);
  });
});
