import React from 'react';
import { Stage } from './StageSwitcher';
interface ProfileCardProps {
  currentStage?: Stage;
}
export function ProfileCard({ currentStage = '1' }: ProfileCardProps) {
  const getProgressData = () => {
    if (currentStage === '1') {
      return {
        percent: 20,
        title: 'Complete your profile',
        subtitle: 'A complete profile helps you get matched faster.'
      };
    }
    if (currentStage === '2') {
      return {
        percent: 45,
        title: 'Complete your profile',
        subtitle: 'Mentors want to know your goals.'
      };
    }
    return {
      percent: 65,
      title: 'Complete your profile',
      subtitle: '65% complete'
    };
  };
  const data = getProgressData();
  return (
    <div className="bg-transparent md:bg-white md:rounded-[8px] md:border md:border-[#dee2e6] md:p-5 md:shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-[40px] h-[40px] rounded-full bg-[#e9ecef] flex items-center justify-center text-[#495057] text-[14px] font-medium shrink-0">
          ME
        </div>
        <div>
          <h4 className="text-[14px] font-medium text-[#212529]">
            {data.title}
          </h4>
          <p className="text-[12px] text-[#868e96] mt-0.5">{data.subtitle}</p>
        </div>
      </div>

      <div className="w-full h-[8px] bg-[#dee2e6] md:bg-[#e9ecef] rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-[#868e96] md:bg-[#228be6] rounded-full transition-all duration-500"
          style={{
            width: `${data.percent}%`
          }}>
        </div>
      </div>

      <button className="w-full h-[34px] text-[13px] font-medium text-[#495057] bg-white border border-[#dee2e6] rounded-[4px] hover:bg-[#f8f9fa] transition-colors">
        Finish Profile
      </button>
    </div>);

}