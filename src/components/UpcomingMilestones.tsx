import React from 'react';
import { Stage } from './StageSwitcher';
import { Calendar, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
interface UpcomingMilestonesProps {
  currentStage: Stage;
  bare?: boolean;
}
export function UpcomingMilestones({
  currentStage,
  bare = false
}: UpcomingMilestonesProps) {
  const renderMilestones = () => {
    switch (currentStage) {
      case '1':
        return (
          <p className="text-[13px] text-[#868e96] italic">
            No upcoming milestones yet.
          </p>);

      case '2':
        return (
          <div className="flex gap-3 items-start">
            <div className="mt-0.5 text-[#f59f00]">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[13px] font-medium text-[#212529]">
                UX Research Intensive enrollment closes
              </p>
              <p className="text-[12px] text-[#868e96] mt-0.5">Apr 15</p>
            </div>
          </div>);

      case '2.5':
        return (
          <div className="flex gap-3 items-start">
            <div className="mt-0.5 text-[#228be6]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[13px] font-medium text-[#212529]">
                UX Research Intensive starts
              </p>
              <p className="text-[12px] text-[#868e96] mt-0.5">May 1</p>
            </div>
          </div>);

      case '3':
        return (
          <div className="flex gap-3 items-start">
            <div className="mt-0.5 text-[#228be6]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[13px] font-medium text-[#212529]">
                Send a first message to Jordan Chen
              </p>
              <p className="text-[12px] text-[#868e96] mt-0.5">
                Action required
              </p>
            </div>
          </div>);

      case '4':
        return (
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-start">
              <div className="mt-0.5 text-[#228be6]">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[13px] font-medium text-[#212529]">
                  Portfolio Review Session
                </p>
                <p className="text-[12px] text-[#868e96] mt-0.5">Apr 10</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="mt-0.5 text-[#228be6]">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[13px] font-medium text-[#212529]">
                  Design Systems Workshop
                </p>
                <p className="text-[12px] text-[#868e96] mt-0.5">Apr 11</p>
              </div>
            </div>
          </div>);

      case '5':
        return (
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-start">
              <div className="mt-0.5 text-[#228be6]">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[13px] font-medium text-[#212529]">
                  Portfolio Review Session
                </p>
                <p className="text-[12px] text-[#868e96] mt-0.5">
                  Tomorrow at 2:00 PM
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="mt-0.5 text-[#f59f00]">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[13px] font-medium text-[#212529]">
                  Check-in survey deadline
                </p>
                <p className="text-[12px] text-[#868e96] mt-0.5">Apr 12</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="mt-0.5 text-[#f59f00]">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[13px] font-medium text-[#212529]">
                  Goal step target: Submit final presentation
                </p>
                <p className="text-[12px] text-[#868e96] mt-0.5">
                  Apr 15, 6 days remaining
                </p>
              </div>
            </div>
          </div>);

      case '6':
        return (
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-start">
              <div className="mt-0.5 text-[#fa5252]">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[13px] font-medium text-[#fa5252]">
                  PM Mentorship Program ends
                </p>
                <p className="text-[12px] text-[#fa5252] mt-0.5">3 weeks</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="mt-0.5 text-[#fa5252]">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[13px] font-medium text-[#fa5252]">
                  Goal step overdue: Submit final presentation
                </p>
                <p className="text-[12px] text-[#fa5252] mt-0.5">Past due</p>
              </div>
            </div>
          </div>);

      case 'edge':
        return (
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-start">
              <div className="mt-0.5 text-[#228be6]">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[13px] font-medium text-[#212529]">
                  Send first message to Priya Sharma
                </p>
                <p className="text-[12px] text-[#868e96] mt-0.5">
                  Action required
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="mt-0.5 text-[#fa5252]">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[13px] font-medium text-[#fa5252]">
                  Goal step overdue: Submit final presentation
                </p>
                <p className="text-[12px] text-[#fa5252] mt-0.5">Past due</p>
              </div>
            </div>
          </div>);

      default:
        return null;
    }
  };
  const wrapperClass = bare ?
  '' :
  'bg-transparent md:bg-white md:rounded-[8px] md:border md:border-[#dee2e6] md:p-5 md:shadow-sm mt-4';
  return (
    <div className={wrapperClass}>
      <h3 className="text-[14px] font-bold text-[#212529] uppercase tracking-wide mb-4">
        Upcoming Milestones
      </h3>
      {renderMilestones()}
    </div>);

}