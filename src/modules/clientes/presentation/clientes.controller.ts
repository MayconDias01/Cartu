import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RequiredRole } from '../../../common/decorators/required-role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../../common/guards/rbac.guard';
import { AddVeiculoUseCase } from '../application/add-veiculo.use-case';
import { CreateClienteUseCase } from '../application/create-cliente.use-case';
import { CreateClienteDto } from '../application/dto/create-cliente.dto';
import { CreateVeiculoDto } from '../application/dto/create-veiculo.dto';
import { FindClienteUseCase } from '../application/find-cliente.use-case';
import { ListClientesUseCase } from '../application/list-clientes.use-case';

@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('clientes')
export class ClientesController {
  constructor(
    private readonly listClientesUseCase: ListClientesUseCase,
    private readonly findClienteUseCase: FindClienteUseCase,
    private readonly createClienteUseCase: CreateClienteUseCase,
    private readonly addVeiculoUseCase: AddVeiculoUseCase,
  ) {}

  // Mecânico tem acesso de leitura — nenhum RequiredRole aqui.
  @Get()
  findAll() {
    return this.listClientesUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findClienteUseCase.execute(id);
  }

  @RequiredRole(Role.ATENDENTE)
  @Post()
  create(@Body() dto: CreateClienteDto) {
    return this.createClienteUseCase.execute(dto);
  }

  @RequiredRole(Role.ATENDENTE)
  @Post(':id/veiculos')
  addVeiculo(@Param('id') clienteId: string, @Body() dto: CreateVeiculoDto) {
    return this.addVeiculoUseCase.execute({ clienteId, ...dto });
  }
}
