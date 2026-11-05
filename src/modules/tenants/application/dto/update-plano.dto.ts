import { IsEnum } from 'class-validator';
import { Plano } from '../../../../common/enums/plano.enum';

export class UpdatePlanoDto {
  @IsEnum(Plano)
  plano: Plano;
}
