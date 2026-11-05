import { Injectable, Logger } from '@nestjs/common';

export interface CobrancaPix {
  copiaECola: string;
  qrCodeBase64: string;
}

/**
 * Integração PIX com QR Code (cobrança automática) — plano Premium.
 * Stub: até a integração real com um PSP ser configurada, apenas simula a cobrança.
 */
@Injectable()
export class PixService {
  private readonly logger = new Logger(PixService.name);

  async gerarCobranca(valor: number): Promise<CobrancaPix> {
    this.logger.log(`[stub] gerando cobrança PIX de R$ ${valor.toFixed(2)}`);
    return { copiaECola: 'stub-nao-implementado', qrCodeBase64: '' };
  }
}
