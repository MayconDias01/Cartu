import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateGarantiaDto {
  @IsInt()
  @IsPositive()
  prazoDias: number;

  @IsString()
  termos: string;
}
