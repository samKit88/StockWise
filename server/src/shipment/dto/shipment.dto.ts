import { Type } from 'class-transformer';
import { IsArray, IsNumber, Matches, ValidateNested } from 'class-validator';

export class ShippedItemsDto {
  @IsNumber()
  quantity: number;
  @IsNumber()
  salesItemId: number;
}

export class ShipmentDto {
  @Matches(/^SSO-\d+$/, { message: 'Invalid order format' })
  shipmentNumber: string;

  @IsNumber()
  salesId: number;

  @IsNumber()
  partnerId: number;
  // @IsDate()
  shipmentDate: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ShippedItemsDto)
  shippedItems: ShippedItemsDto[];
}
