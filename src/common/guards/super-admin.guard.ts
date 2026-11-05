import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

/**
 * SuperAdmin é um perfil fora da hierarquia de tenants (dono do sistema Cartu,
 * não o "Dono" da oficina) — por isso não reaproveita o RbacGuard/Role.
 */
@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    if (user?.role !== 'SUPER_ADMIN') {
      throw new ForbiddenException('Acesso restrito ao dono do sistema');
    }
    return true;
  }
}
