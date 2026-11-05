import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OrdemServico } from '../domain/ordem-servico.entity';
import { ORDEM_SERVICO_REPOSITORY, OrdemServicoRepository } from '../domain/ordem-servico.repository';
import { CHECKLIST_SAIDA_PORT, ChecklistSaidaPort } from '../domain/checklist-saida.port';
import { FindOrdemServicoUseCase } from './find-ordem-servico.use-case';
import { UsuarioLogado } from './usuario-logado';

@Injectable()
export class FecharOrdemServicoUseCase {
  constructor(
    @Inject(ORDEM_SERVICO_REPOSITORY) private readonly ordemServicoRepository: OrdemServicoRepository,
    @Inject(CHECKLIST_SAIDA_PORT) private readonly checklistSaidaPort: ChecklistSaidaPort,
    private readonly findOrdemServicoUseCase: FindOrdemServicoUseCase,
  ) {}

  async execute(id: string, usuario: UsuarioLogado): Promise<OrdemServico> {
    const ordemServico = await this.findOrdemServicoUseCase.execute(id, usuario);
    const possuiChecklistSaida = await this.checklistSaidaPort.existeChecklistSaida(id);

    try {
      ordemServico.fechar(possuiChecklistSaida);
    } catch (erro) {
      throw new BadRequestException((erro as Error).message);
    }

    return this.ordemServicoRepository.updateStatus(id, ordemServico.status);
  }
}
