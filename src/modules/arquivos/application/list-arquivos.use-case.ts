import { Inject, Injectable } from '@nestjs/common';
import { ARQUIVO_REPOSITORY, ArquivoRepository } from '../domain/arquivo.repository';
import { Arquivo } from '../domain/arquivo.entity';

@Injectable()
export class ListArquivosUseCase {
  constructor(@Inject(ARQUIVO_REPOSITORY) private readonly arquivoRepository: ArquivoRepository) {}

  execute(ordemServicoId?: string): Promise<Arquivo[]> {
    return this.arquivoRepository.findAll(ordemServicoId);
  }
}
