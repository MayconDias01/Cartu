import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from '../../../../common/enums/role.enum';

export class CreateUsuarioDto {
  @IsString()
  @MinLength(2)
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  senha: string;

  @IsEnum(Role)
  role: Role;
}
