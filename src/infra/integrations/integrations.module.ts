import { Module } from '@nestjs/common';
import { PixService } from './pix.service';
import { WhatsAppService } from './whatsapp.service';

@Module({
  providers: [WhatsAppService, PixService],
  exports: [WhatsAppService, PixService],
})
export class IntegrationsModule {}
