import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentResponse } from './model/document.response';
import { DocumentHistoryResponse } from './model/document-history.response';
import { DiffDto } from './dto/diff.dto';
import { CreateDocumentDto } from './dto/create.document.dto';
import { UpdateDocumentDto } from './dto/update.document.dto';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  create(
    @Body() { document }: CreateDocumentDto,
  ): Promise<DocumentResponse | undefined> {
    return this.documentService.create(document);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<DocumentResponse | undefined> {
    return this.documentService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() { document }: UpdateDocumentDto,
  ): Promise<DocumentResponse | undefined> {
    return this.documentService.update(id, document);
  }

  @Get(':id/history')
  async findHistory(
    @Param('id') id: string,
  ): Promise<(DocumentHistoryResponse | undefined)[] | undefined> {
    return this.documentService.findHistory(id);
  }

  @Post(':id/diff')
  diff(
    @Param('id') id: string,
    @Body()
    diffVersion: DiffDto,
  ): Promise<any | undefined> {
    return this.documentService.diff(id, diffVersion);
  }
}
