import { IsNumber } from 'class-validator';

export class DiffDto {
  @IsNumber()
  version_1: number;

  @IsNumber()
  version_2: number;
}
