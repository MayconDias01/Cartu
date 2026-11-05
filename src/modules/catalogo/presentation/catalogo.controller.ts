import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RequiredRole } from '../../../common/decorators/required-role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../../common/guards/rbac.guard';
import { CreateProdutoDto } from '../application/dto/create-produto.dto';
import { CreateServicoDto } from '../application/dto/create-servico.dto';
import { CreateProdutoUseCase } from '../application/create-produto.use-case';
import { CreateServicoUseCase } from '../application/create-servico.use-case';
import { ListProdutosUseCase } from '../application/list-produtos.use-case';
import { ListServicosUseCase } from '../application/list-servicos.use-case';

@UseGuards(JwtAuthGuard, RbacGuard)
@Controller()
export class CatalogoController {
  constructor(
    private readonly listProdutosUseCase: ListProdutosUseCase,
    private readonly createProdutoUseCase: CreateProdutoUseCase,
    private readonly listServicosUseCase: ListServicosUseCase,
    private readonly createServicoUseCase: CreateServicoUseCase,
  ) {}

  @Get('produtos')
  findAllProdutos() {
    return this.listProdutosUseCase.execute();
  }

  @RequiredRole(Role.GERENTE)
  @Post('produtos')
  createProduto(@Body() dto: CreateProdutoDto) {
    return this.createProdutoUseCase.execute(dto);
  }

  @Get('servicos')
  findAllServicos() {
    return this.listServicosUseCase.execute();
  }

  @RequiredRole(Role.GERENTE)
  @Post('servicos')
  createServico(@Body() dto: CreateServicoDto) {
    return this.createServicoUseCase.execute(dto);
  }
}
