import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { CurrentTenant } from '../../../common/decorators/current-tenant.decorator';
import { RequiredRole } from '../../../common/decorators/required-role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../../common/guards/rbac.guard';
import { SuperAdminGuard } from '../../../common/guards/super-admin.guard';
import { FindTenantUseCase } from '../application/find-tenant.use-case';
import { UpdatePlanoDto } from '../application/dto/update-plano.dto';
import { UpdatePlanoUseCase } from '../application/update-plano.use-case';

@Controller('tenants')
export class TenantsController {
  constructor(
    private readonly findTenantUseCase: FindTenantUseCase,
    private readonly updatePlanoUseCase: UpdatePlanoUseCase,
  ) {}

  @UseGuards(JwtAuthGuard, RbacGuard)
  @RequiredRole(Role.DONO)
  @Get('me')
  findMe(@CurrentTenant() tenantId: string) {
    return this.findTenantUseCase.execute(tenantId);
  }

  @UseGuards(JwtAuthGuard, SuperAdminGuard)
  @Patch(':id/plano')
  updatePlano(@Param('id') id: string, @Body() dto: UpdatePlanoDto) {
    return this.updatePlanoUseCase.execute(id, dto.plano);
  }
}
