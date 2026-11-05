import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { RequiredRole } from '../../../common/decorators/required-role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../../common/guards/rbac.guard';
import { CreateArquivoDto } from '../application/dto/create-arquivo.dto';
import { CreateArquivoUseCase } from '../application/create-arquivo.use-case';
import { ListArquivosUseCase } from '../application/list-arquivos.use-case';

@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('arquivos')
export class ArquivosController {
  constructor(
    private readonly createArquivoUseCase: CreateArquivoUseCase,
    private readonly listArquivosUseCase: ListArquivosUseCase,
  ) {}

  @Get()
  findAll(@Query('ordemServicoId') ordemServicoId?: string) {
    return this.listArquivosUseCase.execute(ordemServicoId);
  }

  @RequiredRole(Role.ATENDENTE)
  @Post()
  create(@Body() dto: CreateArquivoDto) {
    return this.createArquivoUseCase.execute(dto);
  }
}
