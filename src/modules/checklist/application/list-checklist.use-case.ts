import { Inject, Injectable } from '@nestjs/common';
import { FindOrdemServicoUseCase } from '../../ordens-servico/application/find-ordem-servico.use-case';
import { UsuarioLogado } from '../../ordens-servico/application/usuario-logado';
import { Checklist } from '../domain/checklist.entity';
import { CHECKLIST_REPOSITORY, ChecklistRepository } from '../domain/checklist.repository';

@Injectable()
export class ListChecklistUseCase {
  constructor(
    @Inject(CHECKLIST_REPOSITORY) private readonly checklistRepository: ChecklistRepository,
    private readonly findOrdemServicoUseCase: FindOrdemServicoUseCase,
  ) {}

  async execute(ordemServicoId: string, usuario: UsuarioLogado): Promise<Checklist[]> {
    // Garante que mecânico só liste o checklist das próprias OS.
    await this.findOrdemServicoUseCase.execute(ordemServicoId, usuario);
    return this.checklistRepository.findByOrdemServico(ordemServicoId);
  }
}
