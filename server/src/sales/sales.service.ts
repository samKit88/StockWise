import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { salesDto } from './dto/sales.dto';

@Injectable()
export class SalesService {
  constructor(private prismaService: PrismaService) {}
  async getAll() {
    const salesData = await this.prismaService.sales.findMany({
      include: {
        partner: {
          select: { name: true },
        },
        salesItems: {
          select: {
            quantity: true,
            unitPrice: true,
          },
        },
      },
    });

    const responseData = salesData.map((item) => ({
      ...item,
      partner: item.partner.name,
      orderdDate: item.orderdDate.toISOString().slice(0, 10),
      totalAmount: item.salesItems
        .reduce(
          (sum, item) => sum + Number(item.quantity) * Number(item.unitPrice),
          0,
        )
        .toLocaleString(),
    }));

    return responseData;
  }

  async create(data: salesDto) {
    const salesData = await this.prismaService.sales.create({
      data: {
        orderdDate: data.orderDate,
        salesNumber: data.salesNumber,
        partnerId: data.partnerId,
        salesItems: {
          create: data.salesItems?.map((item) => ({
            inventoryId: item.inventoryId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
        },
      },
    });

    return salesData;
  }
}
