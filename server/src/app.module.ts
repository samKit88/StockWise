import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail/mail.service';
import { InventoryModule } from './inventory/inventory.module';
import { AuthGuard } from './guards/auth.guards';
import { PartnerModule } from './partner/partner.module';
import { SalesModule } from './sales/sales.module';
import { PurchaseModule } from './purchase/purchase.module';
import { ReceiptModule } from './receipt/receipt.module';
import { ShipmentModule } from './shipment/shipment.module';
import { ReceiveModule } from './receive/receive.module';

@Module({
  imports: [
    AuthModule,
    InventoryModule,
    PartnerModule,
    SalesModule,
    PurchaseModule,
    PrismaModule,
    ReceiptModule,
    ShipmentModule,
    ReceiveModule,

    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [config],
    }),
    MailModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        secret: config.get('jwt.secret'),
      }),
      global: true,
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,

    // {
    //   provide: 'APP_GUARD',
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule {}
