import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { RequiredRole } from '../../../common/decorators/required-role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../../common/guards/rbac.guard';
import { UsuarioLogado } from '../../ordens-servico/application/usuario-logado';
import { CreateGarantiaDto } from '../application/dto/create-garantia.dto';
import { CreateGarantiaUseCase } from '../application/create-garantia.use-case';

@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('ordens-servico/:ordemServicoId/garantia')
export class GarantiasController {
  constructor(private readonly createGarantiaUseCase: CreateGarantiaUseCase) {}

  @RequiredRole(Role.GERENTE)
  @Post()
  create(
    @Param('ordemServicoId') ordemServicoId: string,
    @Body() dto: CreateGarantiaDto,
    @Req() req: Request,
  ) {
    return this.createGarantiaUseCase.execute({ ordemServicoId, ...dto }, req.user as UsuarioLogado);
  }
}
