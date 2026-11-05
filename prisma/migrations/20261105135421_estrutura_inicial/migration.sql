-- CreateEnum
CREATE TYPE "Plano" AS ENUM ('BASICO', 'PREMIUM');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DONO', 'GERENTE', 'ATENDENTE', 'MECANICO');

-- CreateEnum
CREATE TYPE "StatusOrdemServico" AS ENUM ('ABERTA', 'EM_ANDAMENTO', 'AGUARDANDO_PECA', 'CONCLUIDA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "TipoChecklist" AS ENUM ('ENTRADA', 'DIAGNOSTICO', 'SAIDA');

-- CreateEnum
CREATE TYPE "TipoMovimentacaoEstoque" AS ENUM ('ENTRADA', 'SAIDA');

-- CreateEnum
CREATE TYPE "StatusCompra" AS ENUM ('PENDENTE', 'RECEBIDA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "StatusOrcamento" AS ENUM ('ABERTO', 'APROVADO', 'RECUSADO', 'CONVERTIDO');

-- CreateEnum
CREATE TYPE "FormaPagamento" AS ENUM ('DINHEIRO', 'CARTAO', 'PIX');

-- CreateEnum
CREATE TYPE "TipoLancamentoFinanceiro" AS ENUM ('PAGAR', 'RECEBER');

-- CreateEnum
CREATE TYPE "StatusDocumentoFiscal" AS ENUM ('PENDENTE', 'EMITIDA', 'CANCELADA');

-- CreateTable
CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "plano" "Plano" NOT NULL DEFAULT 'BASICO',
    "modulosLiberados" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT,
    "email" TEXT,
    "cpfCnpj" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Veiculo" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "marca" TEXT,
    "ano" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Veiculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrdemServico" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "veiculoId" TEXT NOT NULL,
    "mecanicoId" TEXT,
    "status" "StatusOrdemServico" NOT NULL DEFAULT 'ABERTA',
    "descricaoProblema" TEXT NOT NULL,
    "valorTotal" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrdemServico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Checklist" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "ordemServicoId" TEXT NOT NULL,
    "tipo" "TipoChecklist" NOT NULL,
    "observacoes" TEXT,
    "fotos" TEXT[],
    "autorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Checklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Garantia" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "ordemServicoId" TEXT NOT NULL,
    "prazoDias" INTEGER NOT NULL,
    "termos" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Garantia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "precoVenda" DECIMAL(10,2) NOT NULL,
    "unidade" TEXT NOT NULL DEFAULT 'UN',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Servico" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "preco" DECIMAL(10,2) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstoqueMovimentacao" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "tipo" "TipoMovimentacaoEstoque" NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "motivo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EstoqueMovimentacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fornecedor" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT,
    "telefone" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fornecedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Compra" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "fornecedorId" TEXT NOT NULL,
    "valorTotal" DECIMAL(10,2) NOT NULL,
    "status" "StatusCompra" NOT NULL DEFAULT 'PENDENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orcamento" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "valorTotal" DECIMAL(10,2) NOT NULL,
    "status" "StatusOrcamento" NOT NULL DEFAULT 'ABERTO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Orcamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venda" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "clienteId" TEXT,
    "valorTotal" DECIMAL(10,2) NOT NULL,
    "formaPagamento" "FormaPagamento" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Venda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Financeiro" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "tipo" "TipoLancamentoFinanceiro" NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "vencimento" TIMESTAMP(3) NOT NULL,
    "pago" BOOLEAN NOT NULL DEFAULT false,
    "ordemServicoId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Financeiro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DadosFiscais" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "ordemServicoId" TEXT,
    "numeroNota" TEXT,
    "status" "StatusDocumentoFiscal" NOT NULL DEFAULT 'PENDENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DadosFiscais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Arquivo" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "ordemServicoId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Arquivo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Usuario_tenantId_idx" ON "Usuario"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_tenantId_email_key" ON "Usuario"("tenantId", "email");

-- CreateIndex
CREATE INDEX "Cliente_tenantId_idx" ON "Cliente"("tenantId");

-- CreateIndex
CREATE INDEX "Veiculo_tenantId_idx" ON "Veiculo"("tenantId");

-- CreateIndex
CREATE INDEX "Veiculo_clienteId_idx" ON "Veiculo"("clienteId");

-- CreateIndex
CREATE INDEX "OrdemServico_tenantId_status_idx" ON "OrdemServico"("tenantId", "status");

-- CreateIndex
CREATE INDEX "OrdemServico_tenantId_mecanicoId_idx" ON "OrdemServico"("tenantId", "mecanicoId");

-- CreateIndex
CREATE INDEX "Checklist_tenantId_ordemServicoId_idx" ON "Checklist"("tenantId", "ordemServicoId");

-- CreateIndex
CREATE UNIQUE INDEX "Garantia_ordemServicoId_key" ON "Garantia"("ordemServicoId");

-- CreateIndex
CREATE INDEX "Garantia_tenantId_idx" ON "Garantia"("tenantId");

-- CreateIndex
CREATE INDEX "Produto_tenantId_idx" ON "Produto"("tenantId");

-- CreateIndex
CREATE INDEX "Servico_tenantId_idx" ON "Servico"("tenantId");

-- CreateIndex
CREATE INDEX "EstoqueMovimentacao_tenantId_produtoId_idx" ON "EstoqueMovimentacao"("tenantId", "produtoId");

-- CreateIndex
CREATE INDEX "Fornecedor_tenantId_idx" ON "Fornecedor"("tenantId");

-- CreateIndex
CREATE INDEX "Compra_tenantId_idx" ON "Compra"("tenantId");

-- CreateIndex
CREATE INDEX "Orcamento_tenantId_idx" ON "Orcamento"("tenantId");

-- CreateIndex
CREATE INDEX "Venda_tenantId_idx" ON "Venda"("tenantId");

-- CreateIndex
CREATE INDEX "Financeiro_tenantId_tipo_pago_idx" ON "Financeiro"("tenantId", "tipo", "pago");

-- CreateIndex
CREATE INDEX "DadosFiscais_tenantId_idx" ON "DadosFiscais"("tenantId");

-- CreateIndex
CREATE INDEX "Arquivo_tenantId_idx" ON "Arquivo"("tenantId");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Veiculo" ADD CONSTRAINT "Veiculo_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdemServico" ADD CONSTRAINT "OrdemServico_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdemServico" ADD CONSTRAINT "OrdemServico_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "Veiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checklist" ADD CONSTRAINT "Checklist_ordemServicoId_fkey" FOREIGN KEY ("ordemServicoId") REFERENCES "OrdemServico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Garantia" ADD CONSTRAINT "Garantia_ordemServicoId_fkey" FOREIGN KEY ("ordemServicoId") REFERENCES "OrdemServico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstoqueMovimentacao" ADD CONSTRAINT "EstoqueMovimentacao_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orcamento" ADD CONSTRAINT "Orcamento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Financeiro" ADD CONSTRAINT "Financeiro_ordemServicoId_fkey" FOREIGN KEY ("ordemServicoId") REFERENCES "OrdemServico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DadosFiscais" ADD CONSTRAINT "DadosFiscais_ordemServicoId_fkey" FOREIGN KEY ("ordemServicoId") REFERENCES "OrdemServico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Arquivo" ADD CONSTRAINT "Arquivo_ordemServicoId_fkey" FOREIGN KEY ("ordemServicoId") REFERENCES "OrdemServico"("id") ON DELETE SET NULL ON UPDATE CASCADE;
