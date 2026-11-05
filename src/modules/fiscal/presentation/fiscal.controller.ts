import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RequiredModulo } from '../../../common/decorators/required-plano.decorator';
import { RequiredRole } from '../../../common/decorators/required-role.decorator';
import { Modulo } from '../../../common/enums/modulo.enum';
import { Role } from '../../../common/enums/role.enum';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { PlanoGuard } from '../../../common/guards/plano.guard';
import { RbacGuard } from '../../../common/guards/rbac.guard';
import { CreateDadosFiscaisDto } from '../application/dto/create-dados-fiscais.dto';
import { ListarDadosFiscaisUseCase } from '../application/listar-dados-fiscais.use-case';
import { SolicitarEmissaoUseCase } from '../application/solicitar-emissao.use-case';

// Dados fiscais (NF-e/NFS-e) — exclusivo do plano Premium.
@UseGuards(JwtAuthGuard, RbacGuard, PlanoGuard)
@RequiredRole(Role.GERENTE)
@RequiredModulo(Modulo.DADOS_FISCAIS)
@Controller('fiscal')
export class FiscalController {
  constructor(
    private readonly solicitarEmissaoUseCase: SolicitarEmissaoUseCase,
    private readonly listarDadosFiscaisUseCase: ListarDadosFiscaisUseCase,
  ) {}

  @Get()
  findAll() {
    return this.listarDadosFiscaisUseCase.execute();
  }

  @Post()
  solicitarEmissao(@Body() dto: CreateDadosFiscaisDto) {
    return this.solicitarEmissaoUseCase.execute(dto);
  }
}
