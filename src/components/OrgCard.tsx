import React from 'react';
import { Users } from 'lucide-react';
interface OrgCardProps {
  coverImage?: string;
  orgName: string;
  description: string;
  memberCount: number;
  adminName: string;
  adminInitials: string;
  onViewOrg: () => void;
}
export function OrgCard({
  coverImage,
  orgName,
  description,
  memberCount,
  adminName,
  adminInitials,
  onViewOrg
}: OrgCardProps) {
  return (
    <div className="bg-white rounded-[8px] border border-[#dee2e6] overflow-hidden shadow-sm">
      <div className="h-[140px] bg-[#f1f3f5] flex items-center justify-center">
        {coverImage ?
        <img
          src={coverImage}
          alt={`${orgName} cover`}
          className="w-full h-full object-cover" /> :


        <span className="text-[13px] text-[#868e96]">Org Cover</span>
        }
      </div>
      <div className="p-6 flex flex-col md:flex-row md:items-start gap-6">
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          <div>
            <h3 className="text-[18px] font-bold text-[#212529] leading-tight">
              {orgName}
            </h3>
            <p className="text-[14px] text-[#868e96] leading-[1.6] mt-1">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-auto">
            <div className="w-[24px] h-[24px] rounded-full bg-[#d0ebff] flex items-center justify-center text-[#228be6] text-[10px] font-bold shrink-0">
              {adminInitials}
            </div>
            <span className="px-2 py-0.5 bg-[#e7f5ff] text-[#1c7ed6] text-[12px] font-medium rounded-[4px] shrink-0">
              Admin
            </span>
            <span className="text-[14px] text-[#495057] truncate">
              {adminName}
            </span>
          </div>
        </div>
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:self-stretch shrink-0 gap-4 mt-2 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-[#e9ecef]">
          <div className="flex items-center gap-1.5 text-[#868e96]">
            <Users className="w-4 h-4" />
            <span className="text-[14px]">{memberCount} members</span>
          </div>
          <button
            onClick={onViewOrg}
            className="px-4 h-[36px] text-[14px] font-medium text-white bg-[#228be6] rounded-[4px] hover:bg-[#1c7ed6] transition-colors w-full md:w-auto">
            
            View Organization
          </button>
        </div>
      </div>
    </div>);

}