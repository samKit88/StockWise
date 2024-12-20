import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InveDto } from './dto/inve.dto';
import { CategoryDto } from './dto/category.dto';
import { BrandDto } from './dto/brand.dto';
import { QueryDto } from './dto/query.dto';
import * as fs from 'fs';
import * as path from 'path';
import { error } from 'console';
import { NotFoundError } from 'rxjs';
import { CreateInveDto } from './dto/create.inve.dto';

@Injectable()
export class InventoryService {
  constructor(private prismaService: PrismaService) {}

  async getAll(page: number, limit: number, queryDto: QueryDto) {
    const skipItem = (page - 1) * limit;
    const productes = await this.prismaService.inventory.findMany({
      skip: skipItem,
      take: limit,
      where: { name: { contains: queryDto.search } },
      orderBy: { [queryDto.sort]: queryDto.order },
      include: {
        category: true,
        brand: true,
      },
    });

    if (!productes) return 'No producte';

    return productes;
  }

  async getByID(reqId: number) {
    const producte = await this.prismaService.inventory.findUnique({
      where: {
        id: reqId,
      },
    });

    if (!producte)
      throw new NotFoundException(`item with ID ${reqId} doesn't exist.`);

    return producte;
  }

  async createNewinv(dto: CreateInveDto, userEmail: string) {
    // console.log(JSON.stringify(dto));
    const isUser = await this.prismaService.users.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!isUser) throw new ForbiddenException('Access Denied');

    const category = await this.createNewCategory({ name: dto.category });
    const brand = await this.createNewBrand({ name: dto.brand });

    const newProducte = await this.prismaService.inventory.create({
      data: {
        name: dto.name,
        userId: isUser.id,
        // user: { connect: { id: isUser.id } },
        barcode: dto.barcode,
        categoryId: category.id,
        brandId: brand.id,
        buyingPrice: dto.buyingPrice,
        sellingPrice: dto.sellingPrice,
        productUnit: dto.productUnit,
        quantity: dto.quantity,
        taxType: dto.taxType,
        description: dto.description,
        productType: dto.productType,
      },
    });

    return dto;
  }

  async createNewCategory(dto: CategoryDto) {
    // const isUser = await this.prismaService.user.findUnique({
    //   where: {
    //     email: userEmai,
    //   },
    // });

    // if (!isUser) throw new ForbiddenException('Access Denied');

    const checkCategory = await this.prismaService.category.findUnique({
      where: {
        name: dto.name,
      },
    });

    // if (checkCategory) throw new ForbiddenException('Category exsist');
    if (checkCategory) return checkCategory;

    const newCategory = await this.prismaService.category.create({
      data: {
        name: dto.name,
      },
    });

    return newCategory;
  }

  async createNewBrand(dto: BrandDto) {
    // const isUser = await this.prismaService.user.findUnique({
    //   where: {
    //     email: userEmail,
    //   },
    // });

    // if (!isUser) throw new ForbiddenException('Access Denied');

    const checkBrand = await this.prismaService.brand.findUnique({
      where: {
        name: dto.name,
      },
    });

    // if (checkBrand) throw new ForbiddenException('Brand Exsit');
    if (checkBrand) return checkBrand;

    const newBrand = await this.prismaService.brand.create({
      data: {
        name: dto.name,
      },
    });

    return newBrand;
  }

  async updateInventory(inventoryId: number, userEmail: string, dto: InveDto) {
    const isUser = await this.prismaService.users.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!isUser) throw new ForbiddenException('Access Denied');

    const checkItem = await this.prismaService.inventory.findUnique({
      where: {
        id: inventoryId,
      },
    });

    if (!checkItem)
      throw new NotFoundException(`Item with ID ${inventoryId} doesn't exist`);

    const updatedInve = await this.prismaService.inventory.update({
      where: {
        id: inventoryId,
      },
      data: {
        name: dto.name,
        userId: isUser.id,
        barcode: dto.barcode,
        categoryId: dto.categoryId,
        brandId: dto.brandId,
        buyingPrice: dto.buyingPrice,
        sellingPrice: dto.sellingPrice,
        productUnit: dto.productUnit,
        quantity: dto.quantity,
        taxType: dto.taxType,
        description: dto.description,
        productType: dto.productType,
      },
    });

    return updatedInve;
  }

  async deleteInventory(inventoryId: number, userEmail: string) {
    const isUser = await this.prismaService.users.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!isUser) throw new ForbiddenException('Access Denied');

    const checkInventory = await this.prismaService.inventory.findUnique({
      where: {
        id: inventoryId,
      },
    });

    if (!checkInventory) throw new ForbiddenException('Not found');

    const deleteInve = await this.prismaService.inventory.delete({
      where: {
        id: inventoryId,
      },
    });

    if (deleteInve) return 'Item successfully deleted.';
  }

  async uploadImage(inventoryId: number, fileUrl: string) {
    const producte = await this.prismaService.inventory.findUnique({
      where: {
        id: inventoryId,
      },
    });

    if (!producte) throw new ForbiddenException('No Producte');

    const countImage = await this.prismaService.image.count({
      where: {
        inventoryId: producte.id,
      },
    });

    if (countImage >= 5)
      throw new ForbiddenException('Can not add another image');

    const image = await this.prismaService.image.create({
      data: {
        imageURL: fileUrl,
        inventory: { connect: { id: inventoryId } },
      },
    });

    return 'images successfully uploaded.';
  }

  async getImageById(inventoryId: number) {
    const item = await this.prismaService.inventory.findUnique({
      where: {
        id: inventoryId,
      },
    });

    if (!item)
      throw new NotFoundException(`Itme whit Id ${inventoryId} not found`);

    const itemImages = await this.prismaService.image.findMany({
      where: {
        inventoryId: item.id,
      },
    });

    return itemImages;
  }

  async deleteImage(inventoryId: number, deleteImageId: number) {
    const item = await this.prismaService.inventory.findUnique({
      where: {
        id: inventoryId,
      },
    });

    if (!item)
      throw new NotFoundException(`Item with Id ${inventoryId} not found`);

    const findImage = await this.prismaService.image.findUnique({
      where: {
        id: deleteImageId,
        inventoryId: item.id,
      },
    });

    if (!findImage)
      throw new NotFoundException(`Image with Id ${deleteImageId} not found`);

    const imageDeleted = await this.prismaService.image.delete({
      where: {
        id: deleteImageId,
        inventoryId: item.id,
      },
    });

    const filePath = path.join(imageDeleted.imageURL);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(`Error deleting file ${err}`);
      }
    });

    return imageDeleted;
  }
}

// {

//   "name": "Iphone",
//   "barcode": "asdfadf",
//   "categoryId": 1,
//   "brand": 2,
//   "buyingPrice": 13.99,
//   "sellingPrice": 21.88,
//   "productUnit": "pieces",
//   "quantity": 10,
//   "taxType": "taxable",
//   "description": "asfasdfsd",
//   "productType": "Use"
// }
