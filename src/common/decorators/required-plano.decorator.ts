import { SetMetadata } from '@nestjs/common';
import { Modulo } from '../enums/modulo.enum';

export const REQUIRED_MODULO_KEY = 'requiredModulo';
export const RequiredModulo = (modulo: Modulo) => SetMetadata(REQUIRED_MODULO_KEY, modulo);
