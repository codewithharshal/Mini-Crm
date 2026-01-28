import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCustomerDto } from './dto/customers.dto.js';
import { UpdateCustomerDto } from './dto/updateCustomer.dto.js';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async CreateCustomer(dto: CreateCustomerDto) {
    // Validation
    const existingCustomer = await this.prisma.customer.findUnique({
      where: { email: dto.email },
    });

    const existingCustomerPhone = await this.prisma.customer.findUnique({
      where: { phone: Number(dto.phone) },
    });

    if (existingCustomer || existingCustomerPhone) {
      throw new ConflictException(
        'Customer with this email and phone already exists',
      );
    }
    // Implementation for creating a customer
    const newCustomer = await this.prisma.customer.create({
      data: {
        // customer data fields
        name: dto.name,
        email: dto.email,
        phone: Number(dto.phone),
        company: dto.company,
      },
      select: {
        customer_id: true,
        name: true,
        email: true,
        phone: true,
        company: true,
      },
    });
    return newCustomer;
  }

  async getCustomerPaginated(page: number, limit: number) {
    page = page < 1 ? 1 : page;
    limit = limit > 10 ? 10 : limit;
    const skip = (page - 1) * limit;

    const [customers, totalCount] = await this.prisma.$transaction([
      this.prisma.customer.findMany({
        skip,
        take: limit,
        orderBy: { customer_id: 'asc' },
        select: {
          customer_id: true,
          name: true,
          email: true,
          phone: true,
          company: true,
        },
      }),
      this.prisma.customer.count(),
    ]);
    return {
      page,
      limit,
      totalCount,
      totalPage: Math.ceil(totalCount / limit),
      data: customers,
    };
  }

  async getCustomerById(id: number) {
    const customer = await this.prisma.customer.findUnique({
      where: { customer_id: id },
      select: {
        customer_id: true,
        name: true,
        email: true,
        phone: true,
        company: true,
      },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }

  async updateCustomer(id: number, dto: UpdateCustomerDto) {
    const customer = await this.prisma.customer.findUnique({
      where: { customer_id: id },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return this.prisma.customer.update({
      where: { customer_id: id },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.email && { email: dto.email }),
        ...(dto.phone && { phone: Number(dto.phone) }),
        ...(dto.company && { company: dto.company }),
      },
      select: {
        customer_id: true,
        name: true,
        email: true,
        phone: true,
        company: true,
        updatedAt: true,
      },
    });
  }

  async deleteCustomer(id: number) {
    const customer = await this.prisma.customer.findUnique({
      where: { customer_id: id },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    await this.prisma.customer.delete({
      where: { customer_id: id },
    });

    return { message: 'Customer deleted successfully' };
  }
}
