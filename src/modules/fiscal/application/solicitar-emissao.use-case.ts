import { Inject, Injectable } from '@nestjs/common';
import { DadosFiscais } from '../domain/dados-fiscais.entity';
import {
  DADOS_FISCAIS_REPOSITORY,
  DadosFiscaisRepository,
  NovoDadosFiscais,
} from '../domain/dados-fiscais.repository';

/**
 * Placeholder: emissão de NF-e/NFS-e é fase 2 do produto. Por enquanto só
 * registra a solicitação como PENDENTE para integração futura.
 */
@Injectable()
export class SolicitarEmissaoUseCase {
  constructor(
    @Inject(DADOS_FISCAIS_REPOSITORY) private readonly dadosFiscaisRepository: DadosFiscaisRepository,
  ) {}

  execute(dados: NovoDadosFiscais): Promise<DadosFiscais> {
    return this.dadosFiscaisRepository.create(dados);
  }
}
