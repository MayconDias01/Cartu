import { Inject, Injectable } from '@nestjs/common';
import { Usuario } from '../../domain/usuario.entity';
import { USUARIO_REPOSITORY, UsuarioRepository } from '../../domain/usuario.repository';

@Injectable()
export class ListUsuariosUseCase {
  constructor(@Inject(USUARIO_REPOSITORY) private readonly usuarioRepository: UsuarioRepository) {}

  execute(): Promise<Usuario[]> {
    return this.usuarioRepository.findAll();
  }
}
