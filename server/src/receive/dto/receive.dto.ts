import { Type } from 'class-transformer';
import { IsArray, IsNumber, Matches, ValidateNested } from 'class-validator';

export class ReceivedItemsDto {
  @IsNumber()
  quantity: number;
  @IsNumber()
  purchasedItemsId: number;
}

export class ReceiveDto {
  @Matches(/^SSO-\d+$/, { message: 'Invalid order format' })
  receiveNumber: string;

  @IsNumber()
  purchaseId: number;

  @IsNumber()
  partnerId: number;
  // @IsDate()
  receivedDate: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReceivedItemsDto)
  receivedItems: ReceivedItemsDto[];
}
