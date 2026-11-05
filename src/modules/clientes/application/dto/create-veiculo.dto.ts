import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateVeiculoDto {
  @IsString()
  placa: string;

  @IsString()
  modelo: string;

  @IsOptional()
  @IsString()
  marca?: string;

  @IsOptional()
  @IsInt()
  @Min(1950)
  @Max(2100)
  ano?: number;
}
