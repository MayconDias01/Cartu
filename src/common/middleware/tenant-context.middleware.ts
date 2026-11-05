import { AsyncLocalStorage } from 'async_hooks';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export interface TenantContext {
  tenantId?: string;
  isSuperAdmin?: boolean;
}

export const tenantStorage = new AsyncLocalStorage<TenantContext>();

@Injectable()
export class TenantContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const user = (req as Request & { user?: { tenantId?: string; role?: string } }).user;
    const context: TenantContext = {
      tenantId: user?.tenantId ?? (req.headers['x-tenant-id'] as string | undefined),
      isSuperAdmin: user?.role === 'SUPER_ADMIN',
    };
    tenantStorage.run(context, () => next());
  }
}
