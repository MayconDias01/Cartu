import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CATALOGO_REPOSITORY, CatalogoRepository } from '../domain/catalogo.repository';
import { Produto } from '../domain/produto.entity';

@Injectable()
export class FindProdutoUseCase {
  constructor(@Inject(CATALOGO_REPOSITORY) private readonly catalogoRepository: CatalogoRepository) {}

  async execute(id: string): Promise<Produto> {
    const produto = await this.catalogoRepository.findProdutoById(id);
    if (!produto) throw new NotFoundException('Produto não encontrado');
    return produto;
  }
}
