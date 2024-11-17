import { Injectable } from '@nestjs/common';
import { truncate } from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReceiveDto } from './dto/receive.dto';
import { ShipmentDto } from 'src/shipment/dto/shipment.dto';

@Injectable()
export class ReceiveService {
  constructor(private prismaService: PrismaService) {}
  async getAll() {
    const receivedData = await this.prismaService.receive.findMany({
      include: {
        partner: {
          select: { name: true },
        },
        receivedItems: {
          include: {
            purchaseItems: {
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
    return receivedData;
  }

  async create(data: ReceiveDto) {
    const receivedData = await this.prismaService.receive.create({
      data: {
        receiveNumber: data.receiveNumber,
        purchaseId: data.purchaseId,
        partnerId: data.partnerId,
        receivedDate: data.receivedDate,
        receivedItems: {
          create: data.receivedItems?.map((item) => ({
            quantity: item.quantity,
            purchasedItemsId: item.purchasedItemsId,
          })),
        },
      },
    });
    return receivedData;
  }
}
