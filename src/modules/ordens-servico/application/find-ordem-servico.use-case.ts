import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '../../../common/enums/role.enum';
import { OrdemServico } from '../domain/ordem-servico.entity';
import { ORDEM_SERVICO_REPOSITORY, OrdemServicoRepository } from '../domain/ordem-servico.repository';
import { UsuarioLogado } from './usuario-logado';

@Injectable()
export class FindOrdemServicoUseCase {
  constructor(
    @Inject(ORDEM_SERVICO_REPOSITORY) private readonly ordemServicoRepository: OrdemServicoRepository,
  ) {}

  async execute(id: string, usuario: UsuarioLogado): Promise<OrdemServico> {
    const ordemServico = await this.ordemServicoRepository.findById(id);
    if (!ordemServico) throw new NotFoundException('Ordem de serviço não encontrada');

    if (usuario.role === Role.MECANICO && ordemServico.mecanicoId !== usuario.userId) {
      throw new ForbiddenException('Mecânico só pode ver as próprias ordens de serviço');
    }

    return ordemServico;
  }
}
