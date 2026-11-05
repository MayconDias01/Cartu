import { Injectable } from '@nestjs/common';
import { ListLancamentosUseCase } from '../../financeiro/application/list-lancamentos.use-case';

@Injectable()
export class RelatorioFinanceiroUseCase {
  constructor(private readonly listLancamentosUseCase: ListLancamentosUseCase) {}

  async execute() {
    const lancamentos = await this.listLancamentosUseCase.execute();

    const somar = (tipo: 'PAGAR' | 'RECEBER', pago: boolean) =>
      lancamentos
        .filter((lancamento) => lancamento.tipo === tipo && lancamento.pago === pago)
        .reduce((total, lancamento) => total + lancamento.valor, 0);

    return {
      aPagarPendente: somar('PAGAR', false),
      aPagarQuitado: somar('PAGAR', true),
      aReceberPendente: somar('RECEBER', false),
      aReceberQuitado: somar('RECEBER', true),
    };
  }
}
