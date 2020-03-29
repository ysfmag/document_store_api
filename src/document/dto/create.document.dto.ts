import { IsObject } from 'class-validator';

export class CreateDocumentDto {
  @IsObject()
  document: any | {};
}
