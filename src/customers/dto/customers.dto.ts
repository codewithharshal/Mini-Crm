import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Customer name',
    example: 'John Doe',
  })
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: 'Customer email address',
    example: 'john.doe@company.com',
  })
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    description: 'Customer phone number',
    example: '+1234567890',
  })
  @IsNotEmpty()
  phone!: string;

  @ApiProperty({
    description: 'Customer company name',
    example: 'Acme Corp',
    required: false,
  })
  company!: string;
}
