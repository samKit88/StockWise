import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { AuthGuard } from '@nestjs/passport';
import { salesDto } from 'src/sales/dto/sales.dto';
import { ShipmentDto } from './dto/shipment.dto';

@Controller('shipment')
export class ShipmentController {
  constructor(private shipmentService: ShipmentService) {}
  @Get()
  getAll() {
    return this.shipmentService.getAll();
  }
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.OK)
  createSale(@Body() data: ShipmentDto) {
    console.log('sales items', data);
    return this.shipmentService.create(data);
  }
}
