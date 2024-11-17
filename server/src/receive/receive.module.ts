import { Module } from '@nestjs/common';
import { ReceiveController } from './receive.controller';
import { ReceiveService } from './receive.service';

@Module({
  controllers: [ReceiveController],
  providers: [ReceiveService]
})
export class ReceiveModule {}
