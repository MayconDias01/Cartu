# Cartu

SaaS multi-tenant para gestão de oficinas automotivas (funilaria, automecânica,
autoelétrica, maquinário pesado). Monólito modular em Clean Architecture, NestJS +
TypeScript + PostgreSQL/Prisma.

## Setup

```bash
npm install
cp .env.example .env
docker compose up -d postgres
npm run prisma:migrate
npm run start:dev
```

API disponível em `http://localhost:3000`. `npm run prisma:migrate` aplica as
migrations versionadas em `prisma/migrations/` e já roda `prisma generate`.

Como não há endpoint público de onboarding ainda, o primeiro tenant e o primeiro
usuário (perfil `DONO`) precisam ser criados direto no banco (via Prisma Studio ou
um script) até existir um fluxo de cadastro.

## Estrutura

```
src/
  common/            guards, decorators, enums e contexto compartilhados
    context/          AsyncLocalStorage do tenant atual (tenant-context.store.ts)
    interceptors/      TenantContextInterceptor — popula o contexto após os guards
    guards/            RbacGuard, PlanoGuard, SuperAdminGuard, JwtAuthGuard
  infra/
    prisma/            PrismaService com o middleware obrigatório de isolamento por tenant_id
    integrations/      stubs de WhatsApp e PIX (ainda sem integração real)
  modules/
    auth/              login/JWT + cadastro de funcionários (Usuario)
    tenants/           cadastro de tenant, plano e módulos liberados
    clientes/          clientes e veículos
    catalogo/          produtos e serviços
    estoque/           movimentações de estoque
    ordens-servico/    OS — contém a regra de domínio "não fecha sem checklist de saída"
    checklist/         checklist de entrada/diagnóstico/saída
    garantias/         garantia por OS
    financeiro/        contas a pagar/receber
    arquivos/          referências de arquivo (S3), nunca o binário no banco
    fornecedores/      fornecedores e compras — Premium
    vendas/            orçamentos e PDV — Premium
    fiscal/            placeholder para NF-e/NFS-e (fase 2) — Premium
    relatorios/         operacionais (Básico) e financeiros avançados (Premium)
prisma/schema.prisma
prisma/migrations/
test/tenant-isolation.spec.ts  teste obrigatório de isolamento entre tenants
```

Cada módulo de negócio segue a mesma divisão em camadas: `domain` (entidades e
contratos de repositório) → `application` (casos de uso e DTOs) → `infrastructure`
(implementação Prisma) → `presentation` (controller). Regra de dependência: `domain`
não importa nada; `application` importa só `domain`; `infrastructure` importa
`application` e `domain`; `presentation` importa só `application`.

## RBAC e planos

- Perfis (`src/common/enums/role.enum.ts`): `DONO > GERENTE > ATENDENTE > MECANICO`.
  `RbacGuard` + `@RequiredRole(...)` aplicam um limiar mínimo; onde a regra não é
  hierárquica (ex: checklist, que o Atendente só vê mas o Mecânico cria), a checagem
  fica explícita no caso de uso.
- Módulos Premium (`src/common/enums/modulo.enum.ts`): `PlanoGuard` +
  `@RequiredModulo(...)` bloqueiam o acesso quando o tenant não tem o módulo liberado.
  `Tenant.modulosParaPlano(plano)` decide automaticamente quais módulos um tenant
  Básico/Premium recebe.
- Isolamento multi-tenant: todo model (exceto `Tenant`) exige `tenantId` no contexto
  (`AsyncLocalStorage`, populado pelo `TenantContextInterceptor` a partir do JWT ou do
  header `X-Tenant-Id` no login). `SuperAdmin` (fora da hierarquia de tenants) ignora
  esse filtro.

## Próximos passos

Relatórios financeiros mais ricos, integração real de WhatsApp/PIX, emissão de
NF-e/NFS-e e um fluxo de onboarding (criação de tenant + primeiro usuário via API)
ainda não existem — entram seguindo o fluxo "novo módulo" da skill de arquitetura.
