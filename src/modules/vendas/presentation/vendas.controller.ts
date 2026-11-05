import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RequiredModulo } from '../../../common/decorators/required-plano.decorator';
import { RequiredRole } from '../../../common/decorators/required-role.decorator';
import { Modulo } from '../../../common/enums/modulo.enum';
import { Role } from '../../../common/enums/role.enum';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { PlanoGuard } from '../../../common/guards/plano.guard';
import { RbacGuard } from '../../../common/guards/rbac.guard';
import { CreateOrcamentoDto } from '../application/dto/create-orcamento.dto';
import { CreateVendaDto } from '../application/dto/create-venda.dto';
import { CriarOrcamentoUseCase } from '../application/criar-orcamento.use-case';
import { ListarVendasUseCase } from '../application/listar-vendas.use-case';
import { RegistrarVendaUseCase } from '../application/registrar-venda.use-case';

// Vendas / PDV — exclusivo do plano Premium. Mecânico sem acesso.
@UseGuards(JwtAuthGuard, RbacGuard, PlanoGuard)
@RequiredRole(Role.ATENDENTE)
@RequiredModulo(Modulo.VENDAS_PDV)
@Controller()
export class VendasController {
  constructor(
    private readonly criarOrcamentoUseCase: CriarOrcamentoUseCase,
    private readonly registrarVendaUseCase: RegistrarVendaUseCase,
    private readonly listarVendasUseCase: ListarVendasUseCase,
  ) {}

  @Post('orcamentos')
  criarOrcamento(@Body() dto: CreateOrcamentoDto) {
    return this.criarOrcamentoUseCase.execute(dto);
  }

  @Get('vendas')
  listarVendas() {
    return this.listarVendasUseCase.execute();
  }

  @Post('vendas')
  registrarVenda(@Body() dto: CreateVendaDto) {
    return this.registrarVendaUseCase.execute(dto);
  }
}
