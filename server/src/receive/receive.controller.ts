import { Controller, Get } from '@nestjs/common';
import { ReceiveService } from './receive.service';

@Controller('receive')
export class ReceiveController {
  constructor(private receiveService: ReceiveService) {}

  @Get()
  getAll() {
    return this.receiveService.getAll();
  }
}
