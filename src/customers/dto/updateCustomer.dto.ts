// src/customers/dto/update-customer.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from './customers.dto.js';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
