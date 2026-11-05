import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateOrcamentoDto {
  @IsString()
  clienteId: string;

  @IsNumber()
  @IsPositive()
  valorTotal: number;
}
