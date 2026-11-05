import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { RequiredRole } from '../../../common/decorators/required-role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../../common/guards/rbac.guard';
import { CreateLancamentoDto } from '../application/dto/create-lancamento.dto';
import { CreateLancamentoUseCase } from '../application/create-lancamento.use-case';
import { ListLancamentosUseCase } from '../application/list-lancamentos.use-case';
import { MarcarPagoUseCase } from '../application/marcar-pago.use-case';

// Financeiro: Dono/Gerente Total, Atendente/Mecânico sem acesso.
@UseGuards(JwtAuthGuard, RbacGuard)
@RequiredRole(Role.GERENTE)
@Controller('financeiro')
export class FinanceiroController {
  constructor(
    private readonly createLancamentoUseCase: CreateLancamentoUseCase,
    private readonly listLancamentosUseCase: ListLancamentosUseCase,
    private readonly marcarPagoUseCase: MarcarPagoUseCase,
  ) {}

  @Get()
  findAll() {
    return this.listLancamentosUseCase.execute();
  }

  @Post()
  create(@Body() dto: CreateLancamentoDto) {
    return this.createLancamentoUseCase.execute({ ...dto, vencimento: new Date(dto.vencimento) });
  }

  @Patch(':id/pago')
  marcarPago(@Param('id') id: string) {
    return this.marcarPagoUseCase.execute(id);
  }
}
