import { Plano } from '../../../common/enums/plano.enum';

export class Tenant {
  constructor(
    public readonly id: string,
    public nome: string,
    public plano: Plano,
    public modulosLiberados: string[],
  ) {}

  possuiModulo(modulo: string): boolean {
    return this.modulosLiberados.includes(modulo);
  }
}
