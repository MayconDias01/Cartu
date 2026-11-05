import { Inject, Injectable } from '@nestjs/common';
import { FINANCEIRO_REPOSITORY, FiltroLancamento, FinanceiroRepository } from '../domain/financeiro.repository';
import { Lancamento } from '../domain/lancamento.entity';

@Injectable()
export class ListLancamentosUseCase {
  constructor(@Inject(FINANCEIRO_REPOSITORY) private readonly financeiroRepository: FinanceiroRepository) {}

  execute(filtro?: FiltroLancamento): Promise<Lancamento[]> {
    return this.financeiroRepository.findAll(filtro);
  }
}
