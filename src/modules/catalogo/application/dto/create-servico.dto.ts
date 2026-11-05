import { IsNumber, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateServicoDto {
  @IsString()
  @MinLength(2)
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsNumber()
  @IsPositive()
  preco: number;
}
