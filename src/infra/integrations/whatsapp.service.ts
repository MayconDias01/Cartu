import { Injectable, Logger } from '@nestjs/common';

/**
 * Integração WhatsApp (orçamento e status de OS) — plano Básico.
 * Stub: loga a intenção de envio até a integração real (ex: WhatsApp Cloud API) ser configurada.
 */
@Injectable()
export class WhatsAppService {
  private readonly logger = new Logger(WhatsAppService.name);

  async enviarMensagem(telefone: string, mensagem: string): Promise<void> {
    this.logger.log(`[stub] WhatsApp para ${telefone}: ${mensagem}`);
  }
}
