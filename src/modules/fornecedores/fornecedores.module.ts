import { Module } from '@nestjs/common';
import { TenantsModule } from '../tenants/tenants.module';
import { FORNECEDOR_REPOSITORY } from './domain/fornecedor.repository';
import { PrismaFornecedorRepository } from './infrastructure/prisma-fornecedor.repository';
import { FornecedoresController } from './presentation/fornecedores.controller';
import { CreateFornecedorUseCase } from './application/create-fornecedor.use-case';
import { ListFornecedoresUseCase } from './application/list-fornecedores.use-case';
import { RegistrarCompraUseCase } from './application/registrar-compra.use-case';

@Module({
  imports: [TenantsModule],
  controllers: [FornecedoresController],
  providers: [
    ListFornecedoresUseCase,
    CreateFornecedorUseCase,
    RegistrarCompraUseCase,
    { provide: FORNECEDOR_REPOSITORY, useClass: PrismaFornecedorRepository },
  ],
})
export class FornecedoresModule {}
