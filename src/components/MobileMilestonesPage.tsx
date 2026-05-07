import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Stage } from './StageSwitcher';
import { UpcomingMilestones } from './UpcomingMilestones';
interface MobileMilestonesPageProps {
  currentStage: Stage;
  onBack: () => void;
}
export function MobileMilestonesPage({
  currentStage,
  onBack
}: MobileMilestonesPageProps) {
  return (
    <div className="flex-1 flex flex-col bg-[#f1f3f5] overflow-y-auto">
      <div className="flex items-center gap-3 bg-white border-b border-[#dee2e6] px-4 h-[56px] shrink-0">
        <button
          onClick={onBack}
          className="w-[36px] h-[36px] flex items-center justify-center text-[#495057] hover:bg-[#f8f9fa] rounded-[8px] transition-colors -ml-2"
          aria-label="Back">
          
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-[16px] font-bold text-[#212529]">
          Upcoming Milestones
        </h1>
      </div>
      <div className="p-4">
        <div className="bg-white rounded-[8px] border border-[#dee2e6] p-5 shadow-sm">
          <UpcomingMilestones currentStage={currentStage} bare />
        </div>
      </div>
    </div>);

}