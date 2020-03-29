import { Document } from 'entities/document.entity';
import { Repository, EntityRepository } from 'typeorm';
import {
  createDocumentInstance,
  formatUpdateDocumentContent,
} from './document.domain';

@EntityRepository(Repository)
export class DocumentRepository extends Repository<Document> {
  async createDocument(documentContent: any): Promise<Document> {
    return this.save(createDocumentInstance(documentContent));
  }
  async updateDocument(
    currentDocument: Document,
    documentContent: any,
  ): Promise<Document> {
    return this.save(
      formatUpdateDocumentContent(currentDocument, documentContent),
    );
  }
}
