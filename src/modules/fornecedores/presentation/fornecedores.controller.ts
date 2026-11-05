import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RequiredModulo } from '../../../common/decorators/required-plano.decorator';
import { RequiredRole } from '../../../common/decorators/required-role.decorator';
import { Modulo } from '../../../common/enums/modulo.enum';
import { Role } from '../../../common/enums/role.enum';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { PlanoGuard } from '../../../common/guards/plano.guard';
import { RbacGuard } from '../../../common/guards/rbac.guard';
import { CreateCompraDto } from '../application/dto/create-compra.dto';
import { CreateFornecedorDto } from '../application/dto/create-fornecedor.dto';
import { CreateFornecedorUseCase } from '../application/create-fornecedor.use-case';
import { ListFornecedoresUseCase } from '../application/list-fornecedores.use-case';
import { RegistrarCompraUseCase } from '../application/registrar-compra.use-case';

// Fornecedores e compras — exclusivo do plano Premium.
@UseGuards(JwtAuthGuard, RbacGuard, PlanoGuard)
@RequiredRole(Role.GERENTE)
@RequiredModulo(Modulo.FORNECEDORES_COMPRAS)
@Controller('fornecedores')
export class FornecedoresController {
  constructor(
    private readonly listFornecedoresUseCase: ListFornecedoresUseCase,
    private readonly createFornecedorUseCase: CreateFornecedorUseCase,
    private readonly registrarCompraUseCase: RegistrarCompraUseCase,
  ) {}

  @Get()
  findAll() {
    return this.listFornecedoresUseCase.execute();
  }

  @Post()
  create(@Body() dto: CreateFornecedorDto) {
    return this.createFornecedorUseCase.execute(dto);
  }

  @Post(':id/compras')
  registrarCompra(@Param('id') fornecedorId: string, @Body() dto: CreateCompraDto) {
    return this.registrarCompraUseCase.execute({ fornecedorId, ...dto });
  }
}
