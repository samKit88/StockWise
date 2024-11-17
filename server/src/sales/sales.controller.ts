import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { AuthGuard } from '@nestjs/passport';
import { salesDto } from './dto/sales.dto';

@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Get()
  getAll() {
    return this.salesService.getAll();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id') id: string) {
    const customerId = parseInt(id);
    return this.salesService.getById(customerId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.OK)
  createSale(@Body() data: salesDto) {
    console.log('sales items', data);
    return this.salesService.create(data);
  }
}
