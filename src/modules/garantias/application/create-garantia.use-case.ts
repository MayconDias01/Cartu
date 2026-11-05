import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { FindOrdemServicoUseCase } from '../../ordens-servico/application/find-ordem-servico.use-case';
import { UsuarioLogado } from '../../ordens-servico/application/usuario-logado';
import { Garantia } from '../domain/garantia.entity';
import { GARANTIA_REPOSITORY, GarantiaRepository, NovaGarantia } from '../domain/garantia.repository';

@Injectable()
export class CreateGarantiaUseCase {
  constructor(
    @Inject(GARANTIA_REPOSITORY) private readonly garantiaRepository: GarantiaRepository,
    private readonly findOrdemServicoUseCase: FindOrdemServicoUseCase,
  ) {}

  async execute(dados: NovaGarantia, usuario: UsuarioLogado): Promise<Garantia> {
    await this.findOrdemServicoUseCase.execute(dados.ordemServicoId, usuario);

    const existente = await this.garantiaRepository.findByOrdemServico(dados.ordemServicoId);
    if (existente) {
      throw new BadRequestException('Esta ordem de serviço já possui garantia registrada');
    }

    return this.garantiaRepository.create(dados);
  }
}
