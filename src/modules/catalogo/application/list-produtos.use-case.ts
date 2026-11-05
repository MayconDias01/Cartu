import { Inject, Injectable } from '@nestjs/common';
import { CATALOGO_REPOSITORY, CatalogoRepository } from '../domain/catalogo.repository';
import { Produto } from '../domain/produto.entity';

@Injectable()
export class ListProdutosUseCase {
  constructor(@Inject(CATALOGO_REPOSITORY) private readonly catalogoRepository: CatalogoRepository) {}

  execute(): Promise<Produto[]> {
    return this.catalogoRepository.findAllProdutos();
  }
}
