import { Module } from '@nestjs/common';
import { OrdensServicoModule } from '../ordens-servico/ordens-servico.module';
import { GARANTIA_REPOSITORY } from './domain/garantia.repository';
import { PrismaGarantiaRepository } from './infrastructure/prisma-garantia.repository';
import { GarantiasController } from './presentation/garantias.controller';
import { CreateGarantiaUseCase } from './application/create-garantia.use-case';

@Module({
  imports: [OrdensServicoModule],
  controllers: [GarantiasController],
  providers: [
    CreateGarantiaUseCase,
    { provide: GARANTIA_REPOSITORY, useClass: PrismaGarantiaRepository },
  ],
})
export class GarantiasModule {}
