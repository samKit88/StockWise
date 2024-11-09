import { Decimal } from '@prisma/client/runtime/library';
import { IsNumber } from 'class-validator';

export class CustomerDto {
  // @IsNumber()
  customerDiscount: number;
}
