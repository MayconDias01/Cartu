import { Inject, Injectable } from '@nestjs/common';
import { Role } from '../../../common/enums/role.enum';
import { OrdemServico } from '../domain/ordem-servico.entity';
import { ORDEM_SERVICO_REPOSITORY, OrdemServicoRepository } from '../domain/ordem-servico.repository';
import { UsuarioLogado } from './usuario-logado';

@Injectable()
export class ListOrdensServicoUseCase {
  constructor(
    @Inject(ORDEM_SERVICO_REPOSITORY) private readonly ordemServicoRepository: OrdemServicoRepository,
  ) {}

  // Mecânico só vê as próprias OS — filtro aplicado na camada de Aplicação,
  // não apenas ocultado no frontend.
  execute(usuario: UsuarioLogado): Promise<OrdemServico[]> {
    const filtro = usuario.role === Role.MECANICO ? { mecanicoId: usuario.userId } : undefined;
    return this.ordemServicoRepository.findAll(filtro);
  }
}
