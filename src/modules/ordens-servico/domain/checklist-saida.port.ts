/**
 * Porta de saída: evita que ordens-servico dependa do módulo checklist
 * (que já depende de ordens-servico para validar o vínculo), prevenindo
 * dependência circular entre módulos.
 */
export interface ChecklistSaidaPort {
  existeChecklistSaida(ordemServicoId: string): Promise<boolean>;
}

export const CHECKLIST_SAIDA_PORT = Symbol('CHECKLIST_SAIDA_PORT');
