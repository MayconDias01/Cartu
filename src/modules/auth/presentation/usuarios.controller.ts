import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RequiredRole } from '../../../common/decorators/required-role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../../common/guards/rbac.guard';
import { Usuario } from '../domain/usuario.entity';
import { CreateUsuarioDto } from '../application/dto/create-usuario.dto';
import { CreateUsuarioUseCase } from '../application/use-cases/create-usuario.use-case';
import { ListUsuariosUseCase } from '../application/use-cases/list-usuarios.use-case';

// Funcionários: Dono Total, Gerente Ver, Atendente/Mecânico sem acesso.
@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly createUsuarioUseCase: CreateUsuarioUseCase,
    private readonly listUsuariosUseCase: ListUsuariosUseCase,
  ) {}

  @RequiredRole(Role.GERENTE)
  @Get()
  async findAll() {
    const usuarios = await this.listUsuariosUseCase.execute();
    return usuarios.map(this.semSenha);
  }

  @RequiredRole(Role.DONO)
  @Post()
  async create(@Body() dto: CreateUsuarioDto) {
    const usuario = await this.createUsuarioUseCase.execute(dto.nome, dto.email, dto.senha, dto.role);
    return this.semSenha(usuario);
  }

  private semSenha(usuario: Usuario) {
    const { id, nome, email, role } = usuario;
    return { id, nome, email, role };
  }
}
