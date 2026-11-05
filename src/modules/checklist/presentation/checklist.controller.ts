import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { UsuarioLogado } from '../../ordens-servico/application/usuario-logado';
import { CreateChecklistDto } from '../application/dto/create-checklist.dto';
import { CreateChecklistUseCase } from '../application/create-checklist.use-case';
import { ListChecklistUseCase } from '../application/list-checklist.use-case';

@UseGuards(JwtAuthGuard)
@Controller('ordens-servico/:ordemServicoId/checklist')
export class ChecklistController {
  constructor(
    private readonly createChecklistUseCase: CreateChecklistUseCase,
    private readonly listChecklistUseCase: ListChecklistUseCase,
  ) {}

  @Get()
  findAll(@Param('ordemServicoId') ordemServicoId: string, @Req() req: Request) {
    return this.listChecklistUseCase.execute(ordemServicoId, req.user as UsuarioLogado);
  }

  @Post()
  create(
    @Param('ordemServicoId') ordemServicoId: string,
    @Body() dto: CreateChecklistDto,
    @Req() req: Request,
  ) {
    return this.createChecklistUseCase.execute({ ordemServicoId, ...dto }, req.user as UsuarioLogado);
  }
}
