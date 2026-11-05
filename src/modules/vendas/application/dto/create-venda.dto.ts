import { IsIn, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { FormaPagamento } from '../../domain/venda.entity';

export class CreateVendaDto {
  @IsOptional()
  @IsString()
  clienteId?: string;

  @IsNumber()
  @IsPositive()
  valorTotal: number;

  @IsIn(['DINHEIRO', 'CARTAO', 'PIX'])
  formaPagamento: FormaPagamento;
}
