import { tenantStorage } from '../src/common/context/tenant-context.store';

describe('isolamento de tenant (AsyncLocalStorage)', () => {
  it('não vaza tenantId entre execuções concorrentes', async () => {
    const resultados: string[] = [];

    const executar = (tenantId: string) =>
      tenantStorage.run({ tenantId }, async () => {
        await new Promise((resolve) => setTimeout(resolve, Math.random() * 10));
        resultados.push(tenantStorage.getStore()?.tenantId ?? 'sem-tenant');
      });

    await Promise.all([executar('tenant-a'), executar('tenant-b'), executar('tenant-c')]);

    expect(resultados.sort()).toEqual(['tenant-a', 'tenant-b', 'tenant-c']);
  });

  it('fora de uma requisição não existe tenant no contexto', () => {
    expect(tenantStorage.getStore()).toBeUndefined();
  });
});
