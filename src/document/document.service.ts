import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from 'entities/document.entity';
import { DocumentHistory } from 'entities/document-history.entity';
import {
  documentResponseFormat,
  formatDocumentHistoryReponse,
} from './document.domain';
import { DocumentResponse } from './model/document.response';
import { DocumentHistoryResponse } from './model/document-history.response';
import * as jsonDiff from 'json-diff';
import { DocumentRepository } from './document.repository';
import { DocumentHistoryRepository } from './document-history.repository';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(DocumentRepository)
    private readonly documentRepository: DocumentRepository,
    @InjectRepository(DocumentHistoryRepository)
    private readonly documentHistoryRepository: DocumentHistoryRepository,
  ) {}

  async create(documentContent: any): Promise<DocumentResponse | undefined> {
    const saveDocument = await this.documentRepository.createDocument(
      documentContent,
    );
    await this.documentHistoryRepository.createDocumentHistory(saveDocument);
    return documentResponseFormat(saveDocument);
  }

  findOne = async (id: string): Promise<DocumentResponse | undefined> => {
    const document = await this.documentRepository.findOne(id);
    console.log('document', document);
    return documentResponseFormat(document);
  };

  update = async (
    id: string,
    documentContent: any,
  ): Promise<DocumentResponse | undefined> => {
    const currentDocument = await this.documentRepository.findOne(id);

    if (currentDocument) {
      const newDocument = await this.documentRepository.updateDocument(
        currentDocument,
        documentContent,
      );

      await this.documentHistoryRepository.createDocumentHistory(newDocument);
      return documentResponseFormat(newDocument);
    }

    return undefined;
  };

  findHistory = async (
    id: string,
  ): Promise<(DocumentHistoryResponse | undefined)[] | undefined> => {
    const d = new Document();
    d.documentId = id;
    const documentHistory: DocumentHistory[] = await this.documentHistoryRepository.find(
      {
        document: d,
      },
    );
    if (documentHistory.length !== 0) {
      const response: (
        | DocumentHistoryResponse
        | undefined
      )[] = documentHistory.map(history =>
        formatDocumentHistoryReponse(id, history),
      );

      return response;
    }
    return undefined;
  };

  diff = async (id: string, diffVersion: any): Promise<any | undefined> => {
    console.log(id, diffVersion);

    const { version_1: version1, version_2: version2 } = diffVersion;
    const d = new Document();
    d.documentId = id;
    const documentHistory1: DocumentHistory[] = await this.documentHistoryRepository.find(
      {
        version: version1,
        document: d,
      },
    );
    const documentHistory2: DocumentHistory[] = await this.documentHistoryRepository.find(
      {
        version: version2,
        document: d,
      },
    );
    if (documentHistory2.length === 0 || documentHistory2.length === 0) {
      return {};
    }

    const diffObject = jsonDiff.diff(
      JSON.parse(documentHistory1[0].content),
      JSON.parse(documentHistory2[0].content),
    );
    const diffMessage: any = diffObject ? diffObject : 'equal';
    return {
      diff: diffMessage,
      verion_1: {
        version: version1,
        document: JSON.parse(documentHistory1[0].content),
      },
      version_2: {
        version: version2,
        document: JSON.parse(documentHistory2[0].content),
      },
    };
  };
}
