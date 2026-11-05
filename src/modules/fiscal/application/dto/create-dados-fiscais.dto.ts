import { IsOptional, IsString } from 'class-validator';

export class CreateDadosFiscaisDto {
  @IsOptional()
  @IsString()
  ordemServicoId?: string;
}
