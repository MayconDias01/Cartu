import { Inject, Injectable } from '@nestjs/common';
import { StatusOrdemServico } from '../domain/ordem-servico.entity';
import { ORDEM_SERVICO_REPOSITORY, OrdemServicoRepository } from '../domain/ordem-servico.repository';

@Injectable()
export class ContarOrdensPorStatusUseCase {
  constructor(
    @Inject(ORDEM_SERVICO_REPOSITORY) private readonly ordemServicoRepository: OrdemServicoRepository,
  ) {}

  async execute(): Promise<Record<StatusOrdemServico, number>> {
    const ordens = await this.ordemServicoRepository.findAll();
    const contagem: Record<string, number> = {
      ABERTA: 0,
      EM_ANDAMENTO: 0,
      AGUARDANDO_PECA: 0,
      CONCLUIDA: 0,
      CANCELADA: 0,
    };
    for (const ordem of ordens) {
      contagem[ordem.status] += 1;
    }
    return contagem as Record<StatusOrdemServico, number>;
  }
}
