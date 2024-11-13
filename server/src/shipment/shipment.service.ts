import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShipmentDto } from './dto/shipment.dto';

@Injectable()
export class ShipmentService {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    const shippedData = await this.prismaService.shipment.findMany({
      include: {
        partner: {
          select: { id: true, name: true },
        },
        shippedItems: {
          include: {
            salesItem: {
              select: {
                unitPrice: true,
                inventory: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return shippedData;
  }

  async create(data: ShipmentDto) {
    const shippedData = await this.prismaService.shipment.create({
      data: {
        shipmentNumber: data.shipmentNumber,
        partnerId: data.partnerId,
        salesId: data.salesId,
        shipmentDate: data.shipmentDate,
        shippedItems: {
          create: data.shippedItems?.map((item) => ({
            quantity: item.quantity,
            salesItemId: item.salesItemId,
          })),
        },
      },
    });
    return shippedData;
  }
}
