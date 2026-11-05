import { IsEnum, IsString, MinLength } from 'class-validator';
import { Plano } from '../../../../common/enums/plano.enum';

export class CreateTenantDto {
  @IsString()
  @MinLength(2)
  nome: string;

  @IsEnum(Plano)
  plano: Plano;
}
