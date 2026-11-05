import { Injectable } from '@nestjs/common';
import { ContarOrdensPorStatusUseCase } from '../../ordens-servico/application/contar-por-status.use-case';

@Injectable()
export class RelatorioOperacionalUseCase {
  constructor(private readonly contarOrdensPorStatusUseCase: ContarOrdensPorStatusUseCase) {}

  async execute() {
    return { ordensServicoPorStatus: await this.contarOrdensPorStatusUseCase.execute() };
  }
}
