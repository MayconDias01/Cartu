import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateArquivoDto {
  @IsString()
  nome: string;

  @IsUrl()
  url: string;

  @IsString()
  tipo: string;

  @IsOptional()
  @IsString()
  ordemServicoId?: string;
}
