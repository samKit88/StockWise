import { IsDate, IsNumber, IsString } from 'class-validator';

export class ReceiptDto {
  @IsString()
  receiptNumber: string;
  // @IsDate()
  receiptData: Date;
  @IsNumber()
  partnerId: number;
  @IsNumber()
  salesId: number;
}
