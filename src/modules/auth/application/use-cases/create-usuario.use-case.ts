import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Role } from '../../../../common/enums/role.enum';
import { Usuario } from '../../domain/usuario.entity';
import { USUARIO_REPOSITORY, UsuarioRepository } from '../../domain/usuario.repository';

@Injectable()
export class CreateUsuarioUseCase {
  constructor(@Inject(USUARIO_REPOSITORY) private readonly usuarioRepository: UsuarioRepository) {}

  async execute(nome: string, email: string, senha: string, role: Role): Promise<Usuario> {
    const existente = await this.usuarioRepository.findByEmail(email);
    if (existente) {
      throw new ConflictException('Já existe um usuário com este e-mail neste tenant');
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    return this.usuarioRepository.create({ nome, email, senhaHash, role });
  }
}
