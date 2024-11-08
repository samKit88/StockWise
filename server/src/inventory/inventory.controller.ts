import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InveDto } from './dto/inve.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CategoryDto } from './dto/category.dto';
import { BrandDto } from './dto/brand.dto';
import { QueryDto } from './dto/query.dto';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'src/utils/constants';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateDto } from './dto/update.dto';
import { CreateInveDto } from './dto/create.inve.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private invService: InventoryService) {}

  @Get()
  getAll(@Query() queryDto: QueryDto) {
    const page = parseInt(queryDto.page || `${DEFAULT_PAGE}`);
    const limit = parseInt(queryDto.limit || `${DEFAULT_PAGE_SIZE}`);

    return this.invService.getAll(page, limit, queryDto);
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    const reqId = parseInt(id);
    return this.invService.getByID(reqId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.OK)
  createNewinv(@Body() dto: CreateInveDto, @Req() req: Request) {
    const user = req.user as { email: string };

    console.log('from create inventory', dto);
    return this.invService.createNewinv(dto, user['email']);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  updateInventory(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() dto: UpdateDto,
  ) {
    const user = req.user as { email: string };
    const inventoryId = parseInt(id);
    return this.invService.updateInventory(inventoryId, user['email'], dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  deleteInventory(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as { email: string };
    const inventoryId = parseInt(id);
    return this.invService.deleteInventory(inventoryId, user['email']);
  }

  @Post('/:id/images')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      return 'file is not there bro';
    }
    const inventoryId = parseInt(id);
    const fileUrl = `uploads/${file.filename}`;
    return this.invService.uploadImage(inventoryId, fileUrl);
  }

  @Get('/:id/images')
  getImageById(@Param('id') id: string) {
    const inventoryId = parseInt(id);
    return this.invService.getImageById(inventoryId);
  }

  @Delete('/:id/images/:imageId')
  deleteImageById(@Param('id') id: string, @Param('imageId') imageId: string) {
    const inventoryId = parseInt(id);
    const deleteImageId = parseInt(imageId);

    return this.invService.deleteImage(inventoryId, deleteImageId);
  }
}
