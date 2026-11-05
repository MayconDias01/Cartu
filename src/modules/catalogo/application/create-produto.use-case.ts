import { Inject, Injectable } from '@nestjs/common';
import { CATALOGO_REPOSITORY, CatalogoRepository, NovoProduto } from '../domain/catalogo.repository';
import { Produto } from '../domain/produto.entity';

@Injectable()
export class CreateProdutoUseCase {
  constructor(@Inject(CATALOGO_REPOSITORY) private readonly catalogoRepository: CatalogoRepository) {}

  execute(dados: NovoProduto): Promise<Produto> {
    return this.catalogoRepository.createProduto(dados);
  }
}
