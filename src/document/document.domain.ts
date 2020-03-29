import { Document } from 'entities/document.entity';
import { DocumentHistory } from 'entities/document-history.entity';
import { DocumentResponse } from './model/document.response';
import { DocumentHistoryResponse } from './model/document-history.response';
const DOCUMENT_INIT_VERSION = 1;

export const createDocumentInstance = (documentContent: any): Document => {
  const newDocument = new Document();
  newDocument.document = JSON.stringify(documentContent);
  newDocument.version = DOCUMENT_INIT_VERSION;
  return newDocument;
};

export const createDocumentHistoryInsance = (document: Document) => {
  const newDocumentHistory = new DocumentHistory();
  newDocumentHistory.content = document.document;
  // this will get the documentDd from document to documentHistory
  newDocumentHistory.document = document;
  newDocumentHistory.version = document.version;
  return newDocumentHistory;
};

export const documentResponseFormat = (
  document: Document | undefined,
): DocumentResponse | undefined => {
  if (document) {
    return {
      id: document.documentId,
      createdDate: document.createdDate,
      updatedDate: document.updatedDate,
      version: document.version,
      document: JSON.parse(document && document.document),
    };
  }
  return undefined;
};

export const formatUpdateDocumentContent = (
  currentDocument: Document,
  documentContent: any,
): Document => {
  const newDocumentContent = JSON.stringify(documentContent);
  const newDocumentVersion =
    (currentDocument && currentDocument?.version + 1) || 0;

  return Object.assign(currentDocument, {
    document: newDocumentContent,
    version: newDocumentVersion,
  });
};

export const formatDocumentHistoryReponse = (
  documentId: string,
  documetHistory: DocumentHistory | undefined,
): DocumentHistoryResponse | undefined => {
  if (documetHistory) {
    return {
      documentId: documentId,
      createdDate: documetHistory.createdDate,
      version: documetHistory.version,
      document: JSON.parse(documetHistory.content),
    };
  }
  return undefined;
};
