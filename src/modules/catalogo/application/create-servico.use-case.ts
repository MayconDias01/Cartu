import { Inject, Injectable } from '@nestjs/common';
import { CATALOGO_REPOSITORY, CatalogoRepository, NovoServico } from '../domain/catalogo.repository';
import { Servico } from '../domain/servico.entity';

@Injectable()
export class CreateServicoUseCase {
  constructor(@Inject(CATALOGO_REPOSITORY) private readonly catalogoRepository: CatalogoRepository) {}

  execute(dados: NovoServico): Promise<Servico> {
    return this.catalogoRepository.createServico(dados);
  }
}
