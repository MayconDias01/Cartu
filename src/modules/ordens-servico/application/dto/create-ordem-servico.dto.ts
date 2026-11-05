import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateOrdemServicoDto {
  @IsString()
  clienteId: string;

  @IsString()
  veiculoId: string;

  @IsOptional()
  @IsString()
  mecanicoId?: string;

  @IsString()
  @MinLength(5)
  descricaoProblema: string;
}
