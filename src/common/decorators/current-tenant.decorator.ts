import { createParamDecorator } from '@nestjs/common';
import { tenantStorage } from '../context/tenant-context.store';

export const CurrentTenant = createParamDecorator(() => {
  return tenantStorage.getStore()?.tenantId;
});
