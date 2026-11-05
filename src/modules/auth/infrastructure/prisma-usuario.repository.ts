import { Injectable } from '@nestjs/common';
import { Role } from '../../../common/enums/role.enum';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { Usuario } from '../domain/usuario.entity';
import { UsuarioRepository } from '../domain/usuario.repository';

@Injectable()
export class PrismaUsuarioRepository implements UsuarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Usuario | null> {
    // tenantId é injetado pelo middleware do PrismaService a partir do contexto da requisição.
    const row = await this.prisma.usuario.findFirst({ where: { email } });
    if (!row) return null;
    return new Usuario(row.id, row.tenantId, row.nome, row.email, row.senhaHash, row.role as Role);
  }
}
