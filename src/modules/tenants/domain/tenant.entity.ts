import { Modulo, MODULOS_PREMIUM } from '../../../common/enums/modulo.enum';
import { Plano } from '../../../common/enums/plano.enum';

const MODULOS_BASICO = Object.values(Modulo).filter((modulo) => !MODULOS_PREMIUM.has(modulo));

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

  static modulosParaPlano(plano: Plano): string[] {
    return plano === Plano.PREMIUM ? Object.values(Modulo) : MODULOS_BASICO;
  }
}
