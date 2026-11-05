import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Modulo, MODULOS_PREMIUM } from '../enums/modulo.enum';
import { FindTenantUseCase } from '../../modules/tenants/application/find-tenant.use-case';
import { REQUIRED_MODULO_KEY } from '../decorators/required-plano.decorator';

/**
 * Verificação na camada de Aplicação de qual plano o tenant contratou —
 * nunca apenas ocultar o recurso no frontend.
 */
@Injectable()
export class PlanoGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly findTenantUseCase: FindTenantUseCase,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const modulo = this.reflector.getAllAndOverride<Modulo>(REQUIRED_MODULO_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!modulo || !MODULOS_PREMIUM.has(modulo)) return true;

    const { user } = context.switchToHttp().getRequest();
    const tenant = await this.findTenantUseCase.execute(user.tenantId);

    if (!tenant.possuiModulo(modulo)) {
      throw new ForbiddenException(`Módulo ${modulo} disponível apenas no plano Premium`);
    }
    return true;
  }
}
