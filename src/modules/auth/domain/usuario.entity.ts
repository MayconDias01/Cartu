import { Role } from '../../../common/enums/role.enum';

export class Usuario {
  constructor(
    public readonly id: string,
    public readonly tenantId: string,
    public nome: string,
    public email: string,
    public senhaHash: string,
    public role: Role,
  ) {}
}
