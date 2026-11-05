import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { RequiredRole } from '../../../common/decorators/required-role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../../common/guards/rbac.guard';
import { CreateOrdemServicoDto } from '../application/dto/create-ordem-servico.dto';
import { CreateOrdemServicoUseCase } from '../application/create-ordem-servico.use-case';
import { FecharOrdemServicoUseCase } from '../application/fechar-ordem-servico.use-case';
import { FindOrdemServicoUseCase } from '../application/find-ordem-servico.use-case';
import { ListOrdensServicoUseCase } from '../application/list-ordens-servico.use-case';
import { UsuarioLogado } from '../application/usuario-logado';

@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('ordens-servico')
export class OrdensServicoController {
  constructor(
    private readonly listOrdensServicoUseCase: ListOrdensServicoUseCase,
    private readonly findOrdemServicoUseCase: FindOrdemServicoUseCase,
    private readonly createOrdemServicoUseCase: CreateOrdemServicoUseCase,
    private readonly fecharOrdemServicoUseCase: FecharOrdemServicoUseCase,
  ) {}

  @Get()
  findAll(@Req() req: Request) {
    return this.listOrdensServicoUseCase.execute(req.user as UsuarioLogado);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.findOrdemServicoUseCase.execute(id, req.user as UsuarioLogado);
  }

  @RequiredRole(Role.ATENDENTE)
  @Post()
  create(@Body() dto: CreateOrdemServicoDto) {
    return this.createOrdemServicoUseCase.execute(dto);
  }

  @Patch(':id/fechar')
  fechar(@Param('id') id: string, @Req() req: Request) {
    return this.fecharOrdemServicoUseCase.execute(id, req.user as UsuarioLogado);
  }
}
