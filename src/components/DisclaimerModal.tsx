import React from 'react';
import { ShieldAlert, X, HeartPulse } from 'lucide-react';
import { HEALTH_DISCLAIMER } from '../data/substitutions';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl border border-stone-200 max-h-[90vh] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="disclaimer-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 bg-amber-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 id="disclaimer-title" className="text-base font-bold text-stone-900">
                Aviso Importante & Saúde
              </h3>
              <p className="text-xs text-stone-500">Orientações de segurança e uso educativo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-stone-500 hover:bg-stone-200/60 transition-colors"
            aria-label="Fechar aviso"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-sm text-stone-700 leading-relaxed">
          <div className="p-3.5 bg-amber-50/60 border border-amber-200/70 rounded-xl text-amber-900 text-xs font-medium flex items-start gap-2.5">
            <HeartPulse className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
            <span>
              Este material tem finalidade estritamente educativa e não substitui consulta, diagnóstico ou tratamento profissional.
            </span>
          </div>

          <div className="space-y-3 text-stone-600 text-xs sm:text-sm">
            <p>
              As sugestões são gerais e podem não ser adequadas para todas as pessoas. Gestantes, lactantes, adolescentes, pessoas idosas, pessoas com diabetes, hipertensão, doenças renais, doenças gastrointestinais, transtornos alimentares, alergias ou outras condições de saúde devem buscar orientação individualizada antes de iniciar mudanças alimentares ou de atividade física.
            </p>
            <p>
              Não existe resultado igual para todas as pessoas. O objetivo deste programa é ajudar você a desenvolver hábitos mais consistentes, e não estabelecer uma meta obrigatória de peso.
            </p>
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 font-medium">
              <p className="font-semibold mb-1">Atenção a sinais de alerta:</p>
              Interrompa a atividade e procure atendimento se sentir dor no peito, falta de ar intensa, desmaio, confusão, palpitações persistentes ou qualquer sintoma importante. Sinta-se à vontade para ajustar o ritmo conforme necessário para sua segurança.
            </div>
          </div>

          <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-400">
            BÔNUS 2 · Lista de Substituições Inteligentes · Versão Educativa
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 bg-stone-50">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
          >
            Compreendi e estou de acordo
          </button>
        </div>
      </div>
    </div>
  );
};
