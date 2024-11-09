import { CustomerGroup } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class PartnerDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsEnum(CustomerGroup)
  customerGroup: CustomerGroup;

  @IsNumber()
  phoneNumber: number;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  address: string;

  @IsNumber()
  zipCode: number;
}
