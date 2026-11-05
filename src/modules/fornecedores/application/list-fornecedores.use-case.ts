import { Inject, Injectable } from '@nestjs/common';
import { Fornecedor } from '../domain/fornecedor.entity';
import { FORNECEDOR_REPOSITORY, FornecedorRepository } from '../domain/fornecedor.repository';

@Injectable()
export class ListFornecedoresUseCase {
  constructor(@Inject(FORNECEDOR_REPOSITORY) private readonly fornecedorRepository: FornecedorRepository) {}

  execute(): Promise<Fornecedor[]> {
    return this.fornecedorRepository.findAll();
  }
}
