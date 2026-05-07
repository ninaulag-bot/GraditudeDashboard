import React from 'react';
import { ArrowRight } from 'lucide-react';
interface MentorMatchCardProps {
  name: string;
  title: string;
  company: string;
  network: string;
  skills: string[];
  avatarInitials: string;
  onSendMatch: () => void;
  onViewProfile: () => void;
  onDismiss: () => void;
}
export function MentorMatchCard({
  name,
  title,
  company,
  network,
  skills,
  avatarInitials,
  onSendMatch,
  onViewProfile,
  onDismiss
}: MentorMatchCardProps) {
  return (
    <div className="mentor-match-card bg-white rounded-[8px] border border-[#dee2e6] p-6 shadow-sm">
      <p className="text-[12px] font-bold text-[#868e96] uppercase tracking-wide mb-4">
        You may be interested in
      </p>
      <div className="flex items-start gap-4">
        <div className="w-[56px] h-[56px] rounded-full bg-[#e9ecef] flex items-center justify-center text-[#495057] text-[18px] font-semibold shrink-0">
          {avatarInitials}
        </div>
        <div className="mentor-match-text flex-1 min-w-0">
          <h3 className="text-[16px] font-semibold text-[#212529] truncate">
            {name}
          </h3>
          <p className="text-[14px] text-[#868e96] truncate">
            {title} at {company}
          </p>
          <p className="text-[13px] text-[#868e96] truncate">{network}</p>
          <button
            onClick={onViewProfile}
            className="inline-flex items-center gap-1 mt-1 text-[13px] font-medium text-[#228be6] bg-transparent hover:underline transition-colors">
            
            View Profile
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-3 ml-[72px] pb-4">
        {skills.map((skill) =>
        <span
          key={skill}
          className="px-2 py-0.5 bg-white border border-[#ced4da] rounded-[12px] text-[12px] text-[#495057]">
          
            {skill}
          </span>
        )}
      </div>
      <div className="border-t border-[#e9ecef] pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={onSendMatch}
          className="px-4 h-[36px] text-[14px] font-medium text-white bg-[#228be6] rounded-[4px] hover:bg-[#1c7ed6] transition-colors w-full sm:w-auto">
          
          Send Match Request
        </button>
        <button
          onClick={onDismiss}
          className="text-[14px] text-[#868e96] hover:text-[#495057] transition-colors cursor-pointer self-center sm:self-auto">
          
          No thanks
        </button>
      </div>
    </div>);

}