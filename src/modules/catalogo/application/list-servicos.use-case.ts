import { Inject, Injectable } from '@nestjs/common';
import { CATALOGO_REPOSITORY, CatalogoRepository } from '../domain/catalogo.repository';
import { Servico } from '../domain/servico.entity';

@Injectable()
export class ListServicosUseCase {
  constructor(@Inject(CATALOGO_REPOSITORY) private readonly catalogoRepository: CatalogoRepository) {}

  execute(): Promise<Servico[]> {
    return this.catalogoRepository.findAllServicos();
  }
}
