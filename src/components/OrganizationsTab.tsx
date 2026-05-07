import React from 'react';
import { Stage } from './StageSwitcher';
import { Settings, Users, ArrowRight } from 'lucide-react';
import { useCta } from './CtaModals';
interface OrganizationsTabProps {
  joinedOrgs?: string[];
  onFindOrg?: () => void;
  currentStage?: Stage;
}
export function OrganizationsTab({
  joinedOrgs = [],
  onFindOrg,
  currentStage = '1'
}: OrganizationsTabProps) {
  if (currentStage === '1') {
    return (
      <div className="max-w-3xl flex flex-col gap-4">
        <div className="bg-white rounded-[8px] border border-[#dee2e6] p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-[16px] font-bold text-[#212529] mb-1">
              Ready to get started?
            </h3>
            <p className="text-[14px] text-[#495057]">
              Join an organization to unlock mentorship and community features.
            </p>
          </div>
          <button
            onClick={onFindOrg}
            className="px-4 h-[36px] text-[14px] font-medium text-white bg-[#228be6] rounded-[4px] hover:bg-[#1c7ed6] transition-colors shrink-0">
            
            Join an Organization
          </button>
        </div>
      </div>);

  }
  if (currentStage === '2') {
    return (
      <div className="max-w-3xl">
        <div className="bg-white rounded-[8px] border border-[#dee2e6] shadow-sm overflow-hidden">
          <div className="h-44 bg-[#e9ecef] flex items-center justify-center text-[#adb5bd] text-[14px] font-medium">
            Org Cover
          </div>
          <div className="p-5 flex flex-col gap-3">
            <h3 className="text-[18px] font-bold text-[#212529]">
              Design Mentors Network
            </h3>
            <p className="text-[14px] text-[#495057] leading-relaxed">
              A global community of senior designers helping the next generation
              of UX talent through structured mentorship.
            </p>
            <div className="text-[13px] text-[#868e96] flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              142 members
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <div className="w-6 h-6 rounded-full bg-[#d0ebff] flex items-center justify-center text-[#228be6] text-[10px] font-bold shrink-0">
                SW
              </div>
              <span className="text-[12px] font-medium text-[#228be6] bg-[#e7f5ff] px-1.5 py-0.5 rounded-[4px] shrink-0">
                Admin
              </span>
              <span className="text-[13px] text-[#495057] shrink-0">
                Dr. Sarah Williams
              </span>
            </div>
            <button className="w-full mt-2 h-[36px] text-[14px] font-medium text-[#228be6] border border-[#228be6] rounded-[4px] hover:bg-[#e7f5ff] transition-colors">
              View Organization
            </button>
          </div>
        </div>
      </div>);

  }
  // Stage 2.5 and beyond
  return (
    <div className="max-w-3xl">
      <div className="bg-white rounded-[8px] border border-[#dee2e6] shadow-sm overflow-hidden">
        <div className="h-24 bg-[#e9ecef] relative" />
        <div className="p-5">
          <div className="org-card-header mb-6 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-[18px] font-bold text-[#212529] mb-2">
                Product Management Organization — Drexel
              </h3>
              <div className="text-[13px] text-[#868e96] flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                142 members · 3 programs
              </div>
            </div>
            <button className="org-card-view-org-btn px-3 h-[32px] text-[13px] font-medium text-[#228be6] bg-white border border-[#228be6] rounded-[4px] hover:bg-[#e7f5ff] transition-colors shrink-0">
              View Organization
            </button>
          </div>

          <div className="org-programs-section">
            <div className="h-px bg-[#dee2e6] mb-4" aria-hidden="true" />
            <h4 className="text-[13px] font-bold text-[#868e96] uppercase tracking-wide mb-3">
              Your Programs
            </h4>
            <div className="program-subcard bg-[#f8f9fa] border border-[#dee2e6] rounded-[8px] p-4 flex items-center justify-between">
              <div>
                <div className="program-subcard-title-row flex items-center gap-2 mb-1">
                  <h5 className="program-subcard-title text-[15px] font-semibold text-[#212529] truncate">
                    UX Research Intensive
                  </h5>
                  <span className="program-subcard-pill text-[11px] font-medium text-[#0ca678] bg-[#e6fcf5] px-1.5 py-0.5 rounded-[4px]">
                    Program
                  </span>
                </div>
                <p className="text-[13px] text-[#868e96]">
                  24 members · Active
                </p>
              </div>
              <button className="program-subcard-button inline-flex items-center gap-1 h-[32px] text-[13px] font-medium text-[#228be6] bg-transparent hover:underline transition-colors">
                View Program
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>);

}