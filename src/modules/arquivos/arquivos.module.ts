import { Module } from '@nestjs/common';
import { ARQUIVO_REPOSITORY } from './domain/arquivo.repository';
import { PrismaArquivoRepository } from './infrastructure/prisma-arquivo.repository';
import { ArquivosController } from './presentation/arquivos.controller';
import { CreateArquivoUseCase } from './application/create-arquivo.use-case';
import { ListArquivosUseCase } from './application/list-arquivos.use-case';

@Module({
  controllers: [ArquivosController],
  providers: [
    CreateArquivoUseCase,
    ListArquivosUseCase,
    { provide: ARQUIVO_REPOSITORY, useClass: PrismaArquivoRepository },
  ],
})
export class ArquivosModule {}
