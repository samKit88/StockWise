import {
  IsArray,
  IsDate,
  IsNumber,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SalesItemsDto {
  @IsNumber()
  quantity: number;

  @IsNumber()
  unitPrice: number;

  @IsNumber()
  inventoryId: number;
}

export class salesDto {
  @Matches(/^SO-\d+$/, { message: 'Invalid order format' })
  salesNumber: string;

  // @IsDate()
  orderDate: Date;

  @IsNumber()
  partnerId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SalesItemsDto)
  salesItems: SalesItemsDto[];
}
