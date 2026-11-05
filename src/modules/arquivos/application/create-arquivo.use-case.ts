import { Inject, Injectable } from '@nestjs/common';
import { ARQUIVO_REPOSITORY, ArquivoRepository, NovoArquivo } from '../domain/arquivo.repository';
import { Arquivo } from '../domain/arquivo.entity';

@Injectable()
export class CreateArquivoUseCase {
  constructor(@Inject(ARQUIVO_REPOSITORY) private readonly arquivoRepository: ArquivoRepository) {}

  execute(dados: NovoArquivo): Promise<Arquivo> {
    return this.arquivoRepository.create(dados);
  }
}
