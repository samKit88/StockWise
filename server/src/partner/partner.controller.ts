import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PartnerService } from './partner.service';
import { PartnerDto } from './dto/partner.dto';
import { Request } from 'express';

@Controller('partner')
export class PartnerController {
  constructor(private partnerService: PartnerService) {}

  @Get()
  getAll() {
    return this.partnerService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.OK)
  createPartner(@Body() dto: PartnerDto, @Req() req: Request) {
    // console.log('from create partner', dto);

    return this.partnerService.createPartner(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  updatePartner(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() dto: PartnerDto,
  ) {
    const partnerId = parseInt(id);
    const user = req.user as { email: string };
    return this.partnerService.updatePartner(partnerId, user['email'], dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  deletePartner(@Param('id') id: string, @Req() req: Request) {
    const partnerId = parseInt(id);
    const user = req.user as { email: string };
    return this.partnerService.deletePartner(partnerId, user['email']);
  }
}
