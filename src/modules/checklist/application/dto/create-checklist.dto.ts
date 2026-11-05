import { IsArray, IsIn, IsOptional, IsString } from 'class-validator';
import { TipoChecklist } from '../../domain/checklist.entity';

export class CreateChecklistDto {
  @IsIn(['ENTRADA', 'DIAGNOSTICO', 'SAIDA'])
  tipo: TipoChecklist;

  @IsOptional()
  @IsString()
  observacoes?: string;

  @IsArray()
  @IsString({ each: true })
  fotos: string[];
}
