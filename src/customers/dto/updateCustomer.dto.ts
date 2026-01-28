// src/customers/dto/update-customer.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './customers.dto.js';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
