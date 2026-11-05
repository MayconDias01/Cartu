import { Module } from '@nestjs/common';
import { CATALOGO_REPOSITORY } from './domain/catalogo.repository';
import { PrismaCatalogoRepository } from './infrastructure/prisma-catalogo.repository';
import { CatalogoController } from './presentation/catalogo.controller';
import { CreateProdutoUseCase } from './application/create-produto.use-case';
import { CreateServicoUseCase } from './application/create-servico.use-case';
import { FindProdutoUseCase } from './application/find-produto.use-case';
import { ListProdutosUseCase } from './application/list-produtos.use-case';
import { ListServicosUseCase } from './application/list-servicos.use-case';

@Module({
  controllers: [CatalogoController],
  providers: [
    ListProdutosUseCase,
    FindProdutoUseCase,
    CreateProdutoUseCase,
    ListServicosUseCase,
    CreateServicoUseCase,
    { provide: CATALOGO_REPOSITORY, useClass: PrismaCatalogoRepository },
  ],
  exports: [FindProdutoUseCase],
})
export class CatalogoModule {}
