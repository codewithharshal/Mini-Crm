import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { CustomersService } from './customer.service.js';
import { CreateCustomerDto } from './dto/customers.dto.js';
import { Roles } from '../users/decorators/roles.decorator.js';
import { UserRole } from '../auth/enum/userRole.enum.js';
import { UpdateCustomerDto } from './dto/updateCustomer.dto.js';

@Controller('customers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  getCustomers(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {
    return this.customersService.getCustomerPaginated(page, limit);
  }

  @Roles(UserRole.ADMIN)
  @Post('create')
  createCustomer(@Body() dto: CreateCustomerDto) {
    return this.customersService.CreateCustomer(dto);
  }

  @Get(':id')
  getCustomerById(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.getCustomerById(id);
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  updateCustomer(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCustomerDto,
  ) {
    return this.customersService.updateCustomer(id, dto);
  }

  @Roles(UserRole.ADMIN)
  @Delete('delete/:id')
  deleteCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.deleteCustomer(id);
  }
}
