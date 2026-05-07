import React, { useState } from 'react';
import { Bell, Calendar, ChevronRight, X } from 'lucide-react';
import { Stage } from './StageSwitcher';
interface MobileProfileDrawerProps {
  currentStage?: Stage;
  onNavigateToMilestones?: () => void;
}
export function MobileProfileDrawer({
  currentStage = '1',
  onNavigateToMilestones
}: MobileProfileDrawerProps) {
  const [open, setOpen] = useState(false);
  const isProfileVariant = currentStage === '1';
  return (
    <div className="lg:hidden">
      {/* Popup card above the bell button */}
      {open &&
      <div className="fixed bottom-[148px] right-3 left-3 z-40 max-w-[420px] sm:left-auto sm:w-[360px]">
          <div className="bg-white border border-[#dee2e6] rounded-[12px] shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 pt-3 pb-2">
              <span className="text-[12px] font-bold uppercase tracking-wide text-[#868e96]">
                Reminders
              </span>
              <button
              onClick={() => setOpen(false)}
              className="w-[24px] h-[24px] flex items-center justify-center text-[#adb5bd] hover:text-[#495057] transition-colors"
              aria-label="Close">
              
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-4 pb-4">
              {isProfileVariant ?
            <ProfileRow /> :

            <MilestonesRow
              onClick={() => {
                setOpen(false);
                onNavigateToMilestones?.();
              }} />

            }
            </div>
          </div>
        </div>
      }

      {/* Floating bell button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-[88px] right-4 z-40 w-[48px] h-[48px] rounded-full bg-[#228be6] text-white shadow-lg flex items-center justify-center hover:bg-[#1c7ed6] transition-colors"
        aria-label="Reminders">
        
        <Bell className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#fa5252] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
          1
        </span>
      </button>
    </div>);

}
function ProfileRow() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-[40px] h-[40px] rounded-full bg-[#e9ecef] flex items-center justify-center text-[#495057] text-[13px] font-bold shrink-0">
        ME
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-[13px] font-bold text-[#212529] truncate">
            Complete your profile
          </span>
          <span className="text-[12px] text-[#868e96] shrink-0">65%</span>
        </div>
        <div className="w-full h-[4px] bg-[#e9ecef] rounded-full overflow-hidden mt-1.5">
          <div
            className="h-full bg-[#228be6] rounded-full"
            style={{
              width: '65%'
            }} />
          
        </div>
      </div>
      <button
        className="px-3 h-[28px] text-[12px] font-medium text-white bg-[#228be6] hover:bg-[#1c7ed6] transition-colors shrink-0"
        style={{
          borderRadius: 999
        }}>
        
        Finish
      </button>
    </div>);

}
function MilestonesRow({ onClick }: {onClick: () => void;}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 text-left hover:bg-[#f8f9fa] -mx-1 px-1 py-1 rounded-[8px] transition-colors">
      
      <div className="w-[40px] h-[40px] rounded-full bg-[#e7f5ff] flex items-center justify-center text-[#228be6] shrink-0">
        <Calendar className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-bold text-[#212529] truncate">
          Upcoming Milestones
        </p>
        <p className="text-[12px] text-[#868e96] truncate">
          Tap to view your milestones
        </p>
      </div>
      <ChevronRight className="w-5 h-5 text-[#adb5bd] shrink-0" />
    </button>);

}