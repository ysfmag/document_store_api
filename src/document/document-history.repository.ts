import { Document } from 'entities/document.entity';
import { DocumentHistory } from 'entities/document-history.entity';
import { Repository, EntityRepository } from 'typeorm';
import { createDocumentHistoryInsance } from './document.domain';

@EntityRepository(Repository)
export class DocumentHistoryRepository extends Repository<DocumentHistory> {
  async createDocumentHistory(saveDocument: Document) {
    return this.save(createDocumentHistoryInsance(saveDocument));
  }
}
