import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tenantStorage } from '../context/tenant-context.store';

/**
 * Precisa ser um Interceptor, não um middleware Express: guards (incluindo o
 * JwtAuthGuard) só populam req.user DEPOIS dos middlewares e ANTES dos
 * interceptors, então é aqui que tenantId fica disponível de forma confiável.
 * Para rotas sem JWT (ex: /auth/login), cai para o header X-Tenant-Id.
 */
@Injectable()
export class TenantContextInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context
      .switchToHttp()
      .getRequest<Request & { user?: { tenantId?: string; role?: string } }>();

    return new Observable((subscriber) => {
      tenantStorage.run(
        {
          tenantId: req.user?.tenantId ?? (req.headers['x-tenant-id'] as string | undefined),
          isSuperAdmin: req.user?.role === 'SUPER_ADMIN',
        },
        () => next.handle().subscribe(subscriber),
      );
    });
  }
}
