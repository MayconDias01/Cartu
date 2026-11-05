import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RequiredRole } from '../../../common/decorators/required-role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../../common/guards/rbac.guard';
import { FindTenantUseCase } from '../application/find-tenant.use-case';

@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('tenants')
export class TenantsController {
  constructor(private readonly findTenantUseCase: FindTenantUseCase) {}

  @RequiredRole(Role.DONO)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findTenantUseCase.execute(id);
  }
}
