import { Inject, Injectable } from '@nestjs/common';
import { Fornecedor } from '../domain/fornecedor.entity';
import { FORNECEDOR_REPOSITORY, FornecedorRepository, NovoFornecedor } from '../domain/fornecedor.repository';

@Injectable()
export class CreateFornecedorUseCase {
  constructor(@Inject(FORNECEDOR_REPOSITORY) private readonly fornecedorRepository: FornecedorRepository) {}

  execute(dados: NovoFornecedor): Promise<Fornecedor> {
    return this.fornecedorRepository.create(dados);
  }
}
