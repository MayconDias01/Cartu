import { Inject, Injectable } from '@nestjs/common';
import { FINANCEIRO_REPOSITORY, FinanceiroRepository } from '../domain/financeiro.repository';
import { Lancamento } from '../domain/lancamento.entity';

@Injectable()
export class MarcarPagoUseCase {
  constructor(@Inject(FINANCEIRO_REPOSITORY) private readonly financeiroRepository: FinanceiroRepository) {}

  execute(id: string): Promise<Lancamento> {
    return this.financeiroRepository.marcarComoPago(id);
  }
}
