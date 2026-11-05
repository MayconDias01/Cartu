import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUIRED_ROLE_KEY } from '../decorators/required-role.decorator';
import { Role } from '../enums/role.enum';

const ROLE_HIERARCHY = [Role.MECANICO, Role.ATENDENTE, Role.GERENTE, Role.DONO];

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<Role>(REQUIRED_ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRole) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user?.role) {
      throw new ForbiddenException('Usuario sem perfil definido');
    }

    const userLevel = ROLE_HIERARCHY.indexOf(user.role);
    const requiredLevel = ROLE_HIERARCHY.indexOf(requiredRole);
    if (userLevel < requiredLevel) {
      throw new ForbiddenException('Perfil sem permissao para este recurso');
    }
    return true;
  }
}
