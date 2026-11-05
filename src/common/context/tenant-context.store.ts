import { AsyncLocalStorage } from 'async_hooks';

export interface TenantContext {
  tenantId?: string;
  isSuperAdmin?: boolean;
}

export const tenantStorage = new AsyncLocalStorage<TenantContext>();
