import { Inject, Injectable } from '@nestjs/common';
import { NovaVenda, VENDAS_REPOSITORY, VendasRepository } from '../domain/vendas.repository';
import { Venda } from '../domain/venda.entity';

@Injectable()
export class RegistrarVendaUseCase {
  constructor(@Inject(VENDAS_REPOSITORY) private readonly vendasRepository: VendasRepository) {}

  execute(dados: NovaVenda): Promise<Venda> {
    return this.vendasRepository.registrarVenda(dados);
  }
}
