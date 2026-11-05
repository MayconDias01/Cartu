import { Plano } from '../../../common/enums/plano.enum';
import { Tenant } from './tenant.entity';

export interface NovoTenant {
  nome: string;
  plano: Plano;
  modulosLiberados: string[];
}

export interface TenantRepository {
  findById(id: string): Promise<Tenant | null>;
  create(dados: NovoTenant): Promise<Tenant>;
}

export const TENANT_REPOSITORY = Symbol('TENANT_REPOSITORY');
