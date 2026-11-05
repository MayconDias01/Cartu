import { Inject, Injectable } from '@nestjs/common';
import { DadosFiscais } from '../domain/dados-fiscais.entity';
import { DADOS_FISCAIS_REPOSITORY, DadosFiscaisRepository } from '../domain/dados-fiscais.repository';

@Injectable()
export class ListarDadosFiscaisUseCase {
  constructor(
    @Inject(DADOS_FISCAIS_REPOSITORY) private readonly dadosFiscaisRepository: DadosFiscaisRepository,
  ) {}

  execute(): Promise<DadosFiscais[]> {
    return this.dadosFiscaisRepository.findAll();
  }
}
