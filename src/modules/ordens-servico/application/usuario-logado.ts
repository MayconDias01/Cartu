import { Role } from '../../../common/enums/role.enum';

export interface UsuarioLogado {
  userId: string;
  tenantId: string;
  role: Role;
}
