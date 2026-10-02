import React, { useState } from 'react';
import { ShieldAlert, ChevronRight, X } from 'lucide-react';

interface Props {
  onOpenModal: () => void;
}

export const HealthDisclaimerBanner: React.FC<Props> = ({ onOpenModal }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-amber-50/90 border-b border-amber-200/80 px-4 py-2.5 text-xs text-amber-900">
      <div className="max-w-xl mx-auto flex items-center justify-between gap-2">
        <button
          onClick={onOpenModal}
          className="flex items-center gap-2 text-left hover:underline focus:outline-hidden flex-1"
        >
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
          <span className="line-clamp-1 text-[11px] sm:text-xs">
            <strong>Aviso de Saúde:</strong> Material educativo. Consulte profissionais para orientações individuais.
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-amber-700 shrink-0 opacity-60" />
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="text-amber-700/70 hover:text-amber-900 p-1 rounded-md"
          aria-label="Dispensar aviso rápido"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
