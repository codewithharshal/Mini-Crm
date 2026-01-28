import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { CustomersModule } from './customers/customer.module.js';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
