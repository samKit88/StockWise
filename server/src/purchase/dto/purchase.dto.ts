import {
  IsArray,
  IsDate,
  IsNumber,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PurchaseItemDto {
  @IsNumber()
  quantity: number;

  @IsNumber()
  unitPrice: number;

  @IsNumber()
  inventoryId: number;
}

export class PurchaseDto {
  @Matches(/^PO-\d+$/, { message: 'Invalid order format' })
  salesNumber: string;

  // @IsDate()
  orderDate: Date;

  @IsNumber()
  partnerId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseItemDto)
  salesItems: PurchaseItemDto[];
}
