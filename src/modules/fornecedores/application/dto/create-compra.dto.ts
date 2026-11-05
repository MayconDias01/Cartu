import { IsNumber, IsPositive } from 'class-validator';

export class CreateCompraDto {
  @IsNumber()
  @IsPositive()
  valorTotal: number;
}
