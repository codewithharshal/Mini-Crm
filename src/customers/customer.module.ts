import { Module } from '@nestjs/common';
import { CustomersController } from './customer.controller.js';
import { CustomersService } from './customer.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
