import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Role } from '../../../common/enums/role.enum';
import { FindOrdemServicoUseCase } from '../../ordens-servico/application/find-ordem-servico.use-case';
import { UsuarioLogado } from '../../ordens-servico/application/usuario-logado';
import { Checklist } from '../domain/checklist.entity';
import { CHECKLIST_REPOSITORY, ChecklistRepository, NovoChecklist } from '../domain/checklist.repository';

@Injectable()
export class CreateChecklistUseCase {
  constructor(
    @Inject(CHECKLIST_REPOSITORY) private readonly checklistRepository: ChecklistRepository,
    private readonly findOrdemServicoUseCase: FindOrdemServicoUseCase,
  ) {}

  async execute(dados: Omit<NovoChecklist, 'autorId'>, usuario: UsuarioLogado): Promise<Checklist> {
    if (usuario.role === Role.ATENDENTE) {
      throw new ForbiddenException('Atendente só pode visualizar o checklist');
    }

    // Lança 404/403 se a OS não existir ou, sendo mecânico, não for a sua.
    await this.findOrdemServicoUseCase.execute(dados.ordemServicoId, usuario);

    return this.checklistRepository.create({ ...dados, autorId: usuario.userId });
  }
}
