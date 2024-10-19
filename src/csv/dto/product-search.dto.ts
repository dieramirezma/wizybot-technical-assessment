import { IsString } from 'class-validator';

export class ProductSearchDto {
  @IsString()
  keyword: string;
}
