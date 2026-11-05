import { Role } from '../../../common/enums/role.enum';
import { Usuario } from './usuario.entity';

export interface NovoUsuario {
  nome: string;
  email: string;
  senhaHash: string;
  role: Role;
}

export interface UsuarioRepository {
  findByEmail(email: string): Promise<Usuario | null>;
  findAll(): Promise<Usuario[]>;
  create(dados: NovoUsuario): Promise<Usuario>;
}

export const USUARIO_REPOSITORY = Symbol('USUARIO_REPOSITORY');
