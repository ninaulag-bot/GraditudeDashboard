import React from 'react';
import { RotateCcw } from 'lucide-react';
export type Stage = '1' | '2' | '2.5' | '3' | '4' | '5' | '6' | 'edge';
interface StageSwitcherProps {
  currentStage: Stage;
  onStageChange: (stage: Stage) => void;
  onReset: () => void;
}
export function StageSwitcher({
  currentStage,
  onStageChange,
  onReset
}: StageSwitcherProps) {
  const stages: {
    id: Stage;
    label: string;
  }[] = [
  {
    id: '1',
    label: 'Stage 1'
  },
  {
    id: '2',
    label: 'Stage 2'
  },
  {
    id: '2.5',
    label: 'Stage 2.5'
  },
  {
    id: '3',
    label: 'Stage 3'
  },
  {
    id: '4',
    label: 'Stage 4'
  },
  {
    id: '5',
    label: 'Stage 5'
  },
  {
    id: '6',
    label: 'Stage 6'
  },
  {
    id: 'edge',
    label: 'Edge Case'
  }];

  return (
    <div className="bg-[#212529] text-white px-4 py-2 flex items-center justify-between overflow-x-auto shrink-0 z-50 relative">
      <div className="flex items-center gap-2 min-w-max">
        <span className="text-[12px] font-bold uppercase tracking-wider text-[#adb5bd] mr-2">
          Prototype Stage:
        </span>
        {stages.map((stage) =>
        <button
          key={stage.id}
          onClick={() => onStageChange(stage.id)}
          className={`px-3 py-1.5 text-[13px] font-medium rounded-full transition-colors ${currentStage === stage.id ? 'bg-[#228be6] text-white' : 'bg-[#343a40] text-[#ced4da] hover:bg-[#495057]'}`}>
          
            {stage.label}
          </button>
        )}
      </div>
      <button
        onClick={onReset}
        className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-[#ced4da] hover:text-white hover:bg-[#343a40] rounded-full transition-colors ml-4 shrink-0">
        
        <RotateCcw className="w-3.5 h-3.5" />
        Reset
      </button>
    </div>);

}