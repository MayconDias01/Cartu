import { Module } from '@nestjs/common';
import { OrdensServicoModule } from '../ordens-servico/ordens-servico.module';
import { CHECKLIST_REPOSITORY } from './domain/checklist.repository';
import { PrismaChecklistRepository } from './infrastructure/prisma-checklist.repository';
import { ChecklistController } from './presentation/checklist.controller';
import { CreateChecklistUseCase } from './application/create-checklist.use-case';
import { ListChecklistUseCase } from './application/list-checklist.use-case';

@Module({
  imports: [OrdensServicoModule],
  controllers: [ChecklistController],
  providers: [
    CreateChecklistUseCase,
    ListChecklistUseCase,
    { provide: CHECKLIST_REPOSITORY, useClass: PrismaChecklistRepository },
  ],
})
export class ChecklistModule {}
