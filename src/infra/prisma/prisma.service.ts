import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { tenantStorage } from '../../common/context/tenant-context.store';

const ACOES_FILTRAVEIS_POR_WHERE = [
  'findMany',
  'findFirst',
  'update',
  'updateMany',
  'delete',
  'deleteMany',
  'count',
  'aggregate',
  'groupBy',
];

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    this.$use(async (params, next) => {
      // Tenant nunca é filtrado por si mesmo; todo outro model exige tenant_id no contexto.
      if (params.model && params.model !== 'Tenant') {
        const context = tenantStorage.getStore();

        if (!context?.isSuperAdmin) {
          if (!context?.tenantId) {
            throw new Error('tenant_id não definido no contexto');
          }
          if (ACOES_FILTRAVEIS_POR_WHERE.includes(params.action)) {
            params.args.where = { ...params.args.where, tenantId: context.tenantId };
          }
          if (params.action === 'create') {
            params.args.data = { ...params.args.data, tenantId: context.tenantId };
          }
          if (params.action === 'upsert') {
            params.args.where = { ...params.args.where, tenantId: context.tenantId };
            params.args.create = { ...params.args.create, tenantId: context.tenantId };
          }
        }
      }

      return next(params);
    });

    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
