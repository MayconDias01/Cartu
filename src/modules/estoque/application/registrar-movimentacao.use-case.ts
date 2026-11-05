import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { FindProdutoUseCase } from '../../catalogo/application/find-produto.use-case';
import { ESTOQUE_REPOSITORY, EstoqueRepository, NovaMovimentacao } from '../domain/estoque.repository';
import { Movimentacao } from '../domain/movimentacao.entity';

@Injectable()
export class RegistrarMovimentacaoUseCase {
  constructor(
    @Inject(ESTOQUE_REPOSITORY) private readonly estoqueRepository: EstoqueRepository,
    private readonly findProdutoUseCase: FindProdutoUseCase,
  ) {}

  async execute(dados: NovaMovimentacao): Promise<Movimentacao> {
    await this.findProdutoUseCase.execute(dados.produtoId);

    if (dados.tipo === 'SAIDA') {
      const saldo = await this.estoqueRepository.saldoAtual(dados.produtoId);
      if (saldo < dados.quantidade) {
        throw new BadRequestException('Saldo em estoque insuficiente para esta saída');
      }
    }

    return this.estoqueRepository.registrar(dados);
  }
}
