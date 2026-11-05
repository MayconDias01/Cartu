import { Inject, Injectable } from '@nestjs/common';
import { FINANCEIRO_REPOSITORY, FinanceiroRepository, NovoLancamento } from '../domain/financeiro.repository';
import { Lancamento } from '../domain/lancamento.entity';

@Injectable()
export class CreateLancamentoUseCase {
  constructor(@Inject(FINANCEIRO_REPOSITORY) private readonly financeiroRepository: FinanceiroRepository) {}

  execute(dados: NovoLancamento): Promise<Lancamento> {
    return this.financeiroRepository.create(dados);
  }
}
