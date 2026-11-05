import { createParamDecorator } from '@nestjs/common';
import { tenantStorage } from '../middleware/tenant-context.middleware';

export const CurrentTenant = createParamDecorator(() => {
  return tenantStorage.getStore()?.tenantId;
});
