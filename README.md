# Cartu

SaaS multi-tenant para gestão de oficinas automotivas (funilaria, automecânica,
autoelétrica, maquinário pesado). Monólito modular em Clean Architecture, NestJS +
TypeScript + PostgreSQL/Prisma.

## Setup

```bash
npm install
cp .env.example .env
docker compose up -d postgres
npm run prisma:generate
npm run prisma:migrate
npm run start:dev
```

API disponível em `http://localhost:3000`.

## Estrutura

```
src/
  common/           guards, decorators e middleware compartilhados (RBAC, contexto de tenant)
  infra/prisma/     PrismaService com o middleware obrigatório de isolamento por tenant_id
  modules/
    auth/           login e emissão de JWT
      domain/       entidades e contratos de repositório
      application/  casos de uso e DTOs
      infrastructure/ implementação Prisma, estratégia JWT
      presentation/ controllers (adaptador HTTP)
    tenants/        mesma divisão em camadas para o cadastro de tenants
prisma/schema.prisma
test/tenant-isolation.spec.ts  teste obrigatório de isolamento entre tenants
```

Regra de dependência entre camadas: `domain` não importa nada; `application` importa só
`domain`; `infrastructure` importa `application` e `domain`; `presentation` importa só
`application`.

## Próximos módulos

Clientes/veículos, ordens de serviço, checklist, financeiro, estoque e PDV ainda não
existem — serão adicionados incrementalmente seguindo o fluxo "novo módulo" descrito na
skill de arquitetura (`domain → application → infrastructure → presentation`, com o
teste de isolamento de tenant escrito antes do código de negócio).
