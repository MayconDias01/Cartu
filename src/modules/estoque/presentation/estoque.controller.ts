import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RequiredRole } from '../../../common/decorators/required-role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../../common/guards/rbac.guard';
import { ConsultarSaldoUseCase } from '../application/consultar-saldo.use-case';
import { RegistrarMovimentacaoDto } from '../application/dto/registrar-movimentacao.dto';
import { RegistrarMovimentacaoUseCase } from '../application/registrar-movimentacao.use-case';

@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('estoque')
export class EstoqueController {
  constructor(
    private readonly registrarMovimentacaoUseCase: RegistrarMovimentacaoUseCase,
    private readonly consultarSaldoUseCase: ConsultarSaldoUseCase,
  ) {}

  @RequiredRole(Role.ATENDENTE)
  @Post('movimentacoes')
  registrar(@Body() dto: RegistrarMovimentacaoDto) {
    return this.registrarMovimentacaoUseCase.execute(dto);
  }

  @Get('produtos/:produtoId/saldo')
  saldo(@Param('produtoId') produtoId: string) {
    return this.consultarSaldoUseCase.execute(produtoId).then((saldo) => ({ produtoId, saldo }));
  }
}
