import { IsDateString, IsIn, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { TipoLancamento } from '../../domain/lancamento.entity';

export class CreateLancamentoDto {
  @IsIn(['PAGAR', 'RECEBER'])
  tipo: TipoLancamento;

  @IsString()
  descricao: string;

  @IsNumber()
  @IsPositive()
  valor: number;

  @IsDateString()
  vencimento: string;

  @IsOptional()
  @IsString()
  ordemServicoId?: string;
}
