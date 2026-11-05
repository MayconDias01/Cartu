import { Controller, Get, UseGuards } from '@nestjs/common';
import { RequiredModulo } from '../../../common/decorators/required-plano.decorator';
import { RequiredRole } from '../../../common/decorators/required-role.decorator';
import { Modulo } from '../../../common/enums/modulo.enum';
import { Role } from '../../../common/enums/role.enum';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { PlanoGuard } from '../../../common/guards/plano.guard';
import { RbacGuard } from '../../../common/guards/rbac.guard';
import { RelatorioFinanceiroUseCase } from '../application/relatorio-financeiro.use-case';
import { RelatorioOperacionalUseCase } from '../application/relatorio-operacional.use-case';

@UseGuards(JwtAuthGuard, RbacGuard, PlanoGuard)
@Controller('relatorios')
export class RelatoriosController {
  constructor(
    private readonly relatorioOperacionalUseCase: RelatorioOperacionalUseCase,
    private readonly relatorioFinanceiroUseCase: RelatorioFinanceiroUseCase,
  ) {}

  // Operacionais: Dono/Gerente Total, Atendente também vê, Mecânico sem acesso.
  @RequiredRole(Role.ATENDENTE)
  @Get('operacionais')
  operacionais() {
    return this.relatorioOperacionalUseCase.execute();
  }

  // Financeiros avançados: só Dono/Gerente e só no plano Premium.
  @RequiredRole(Role.GERENTE)
  @RequiredModulo(Modulo.RELATORIOS_FINANCEIROS)
  @Get('financeiros')
  financeiros() {
    return this.relatorioFinanceiroUseCase.execute();
  }
}
