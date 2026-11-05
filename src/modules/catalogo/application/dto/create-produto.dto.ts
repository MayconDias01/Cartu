import { IsNumber, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @MinLength(2)
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsNumber()
  @IsPositive()
  precoVenda: number;

  @IsOptional()
  @IsString()
  unidade?: string;
}
