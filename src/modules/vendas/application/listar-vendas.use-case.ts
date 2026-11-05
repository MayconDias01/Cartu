import { Inject, Injectable } from '@nestjs/common';
import { VENDAS_REPOSITORY, VendasRepository } from '../domain/vendas.repository';
import { Venda } from '../domain/venda.entity';

@Injectable()
export class ListarVendasUseCase {
  constructor(@Inject(VENDAS_REPOSITORY) private readonly vendasRepository: VendasRepository) {}

  execute(): Promise<Venda[]> {
    return this.vendasRepository.listarVendas();
  }
}
