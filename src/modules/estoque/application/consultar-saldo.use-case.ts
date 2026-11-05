import { Inject, Injectable } from '@nestjs/common';
import { ESTOQUE_REPOSITORY, EstoqueRepository } from '../domain/estoque.repository';

@Injectable()
export class ConsultarSaldoUseCase {
  constructor(@Inject(ESTOQUE_REPOSITORY) private readonly estoqueRepository: EstoqueRepository) {}

  execute(produtoId: string): Promise<number> {
    return this.estoqueRepository.saldoAtual(produtoId);
  }
}
