import { Usuario } from './usuario.entity';

export interface UsuarioRepository {
  findByEmail(email: string): Promise<Usuario | null>;
}

export const USUARIO_REPOSITORY = Symbol('USUARIO_REPOSITORY');
