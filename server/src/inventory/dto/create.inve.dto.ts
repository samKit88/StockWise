import { IsDecimal, IsEnum, IsNumber, IsString } from 'class-validator';
import { Product, Tax, Unit } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class CreateInveDto {
  @IsString()
  name: string;
  @IsString()
  barcode: string;
  @IsString()
  category: string;
  @IsString()
  brand: string;
  // @IsDecimal()
  buyingPrice: number;
  // @IsDecimal()
  sellingPrice: number;
  @IsEnum(Unit)
  productUnit: Unit;
  @IsNumber()
  quantity: number;
  @IsEnum(Tax)
  taxType: Tax;
  @IsString()
  description: string;
  @IsEnum(Product)
  productType: Product;
}
