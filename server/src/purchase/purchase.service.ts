import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PurchaseDto } from './dto/purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(private prismaService: PrismaService) {}
  async getAll() {
    const purchaseData = await this.prismaService.purchase.findMany({
      include: {
        partner: {
          select: { name: true },
        },
        purchaseItmes: {
          select: {
            quantity: true,
            unitPrice: true,
          },
        },
      },
    });

    const responseData = purchaseData.map((item) => ({
      ...item,
      partner: item.partner.name,
      orderdDate: item.orderdDate.toISOString().slice(0, 10),
      totalAmount: item.purchaseItmes
        .reduce(
          (sum, item) => sum + Number(item.quantity) * Number(item.unitPrice),
          0,
        )
        .toLocaleString(),
    }));

    return responseData;
  }

  async create(data: PurchaseDto) {
    const purchaseData = await this.prismaService.purchase.create({
      data: {
        orderdDate: data.orderDate,
        purchaseNumber: data.salesNumber,
        partnerId: data.partnerId,
        purchaseItmes: {
          create: data.salesItems?.map((item) => ({
            inventoryId: item.inventoryId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
        },
      },
    });

    return purchaseData;
  }
}
