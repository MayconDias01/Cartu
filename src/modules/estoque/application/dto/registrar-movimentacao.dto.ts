import { IsIn, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';
import { TipoMovimentacao } from '../../domain/movimentacao.entity';

export class RegistrarMovimentacaoDto {
  @IsString()
  produtoId: string;

  @IsIn(['ENTRADA', 'SAIDA'])
  tipo: TipoMovimentacao;

  @IsInt()
  @IsPositive()
  quantidade: number;

  @IsOptional()
  @IsString()
  motivo?: string;
}
