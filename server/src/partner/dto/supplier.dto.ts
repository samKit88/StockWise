import { IsString } from 'class-validator';

export class SupplierDto {
  @IsString()
  supplierTerms: string;
}
