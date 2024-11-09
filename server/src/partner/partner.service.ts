import { ForbiddenException, Injectable } from '@nestjs/common';
import { PartnerDto } from './dto/partner.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerGroup } from '@prisma/client';
import { CustomerDto } from './dto/customer.dto';
import { SupplierDto } from './dto/supplier.dto';

@Injectable()
export class PartnerService {
  constructor(private prismaService: PrismaService) {}

  getAll() {
    const partners = this.prismaService.partner.findMany();
    return partners;
  }

  async createPartner(dto: PartnerDto) {
    // console.log(JSON.stringify(dto));
    const isPartner = await this.prismaService.partner.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (isPartner) throw new ForbiddenException('Access Denied');

    const newPartner = await this.prismaService.partner.create({
      data: {
        name: dto.name,
        email: dto.email,
        customerGroup: dto.customerGroup,
        phoneNumber: dto.phoneNumber,
        country: dto.country,
        city: dto.city,
        zipCode: dto.zipCode,
        address: dto.address,
      },
    });

    return newPartner;
  }

  async updatePartner(partnerId: number, userEmail: string, dto: PartnerDto) {
    const user = await this.prismaService.users.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) throw new ForbiddenException('User not found');

    const partner = await this.prismaService.partner.findUnique({
      where: {
        id: partnerId,
      },
    });
    if (!partner) throw new ForbiddenException('Partner not found');

    const updatedPartner = await this.prismaService.partner.update({
      where: {
        id: partnerId,
      },
      data: {
        name: dto.name,
        email: dto.email,
        customerGroup: dto.customerGroup,
        phoneNumber: dto.phoneNumber,
        country: dto.country,
        city: dto.city,
        zipCode: dto.zipCode,
        address: dto.address,
      },
    });

    console.log(updatedPartner);

    return updatedPartner;
  }

  async deletePartner(partnerId: number, userEmail: string) {
    const user = await this.prismaService.users.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) throw new ForbiddenException('User not found');

    const partner = await this.prismaService.partner.findUnique({
      where: {
        id: partnerId,
      },
    });
    if (!partner) throw new ForbiddenException('Partner not found');

    await this.prismaService.partner.delete({
      where: {
        id: partnerId,
      },
    });
    return partner;
  }
}
