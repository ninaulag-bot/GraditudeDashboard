import React, { useState } from 'react';
import { Stage } from './StageSwitcher';
import { AlertCircle } from 'lucide-react';
import { MentorCard } from './MentorCard';
import { useCta } from './CtaModals';
interface RelationshipsTabProps {
  joinedOrgs?: string[];
  onFindOrg?: () => void;
  currentStage?: Stage;
  menteePairingConfirmed?: boolean;
  priyaPairingConfirmed?: boolean;
}
export function RelationshipsTab({
  joinedOrgs = [],
  onFindOrg,
  currentStage = '1',
  menteePairingConfirmed = false,
  priyaPairingConfirmed = false
}: RelationshipsTabProps) {
  const { openChat, openScheduleSession } = useCta();
  if (currentStage === '1') {
    return (
      <div className="max-w-3xl">
        <div className="bg-white rounded-[8px] border border-[#dee2e6] p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-[16px] font-bold text-[#212529] mb-1">
              No matches yet
            </h3>
            <p className="text-[14px] text-[#495057]">
              Get matched within your organization or program.
            </p>
          </div>
          <button
            onClick={onFindOrg}
            className="px-4 h-[36px] text-[14px] font-medium text-white bg-[#228be6] rounded-[8px] hover:bg-[#1c7ed6] transition-colors shrink-0">
            
            Find an Organization
          </button>
        </div>
      </div>);

  }
  if (currentStage === '2') {
    return (
      <div className="max-w-3xl">
        <div className="bg-white rounded-[8px] border border-[#dee2e6] p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-[16px] font-bold text-[#212529] mb-1">
              No matches yet
            </h3>
            <p className="text-[14px] text-[#495057]">
              Use Get Matched inside your program or org to connect with a
              mentor.
            </p>
          </div>
          <button
            onClick={() => {}}
            className="px-4 h-[36px] text-[14px] font-medium text-white bg-[#228be6] rounded-[8px] hover:bg-[#1c7ed6] transition-colors shrink-0">
            
            Get Matched
          </button>
        </div>
      </div>);

  }
  if (
    currentStage === '2.5' ||
    currentStage === '3' ||
    currentStage === '4' ||
    currentStage === '5' ||
    currentStage === '6'
  ) {
    return (
      <div className="max-w-3xl">
        <div className="bg-white rounded-[8px] border border-[#dee2e6] p-5 shadow-sm">
          <h3 className="text-[16px] font-bold text-[#212529] mb-2">
            There are available mentors in your network
          </h3>
          <p className="text-[14px] text-[#495057] mb-5">
            You're one step away from getting matched. Find a mentor in Design
            Mentors Network.
          </p>
          <button
            onClick={() => {}}
            className="px-4 h-[36px] text-[14px] font-medium text-white bg-[#228be6] rounded-[8px] hover:bg-[#1c7ed6] transition-colors">
            
            Get Matched
          </button>
        </div>
      </div>);

  }
  return (
    <div className="max-w-3xl flex flex-col gap-4">
      {/* Edge case: Priya Sharma — only after pairing confirmed */}
      {currentStage === 'edge' && priyaPairingConfirmed &&
      <MentorCard
        name="Priya Sharma"
        initials="PS"
        networkName="Product Management Club"
        status="Awaiting First Contact"
        onMessage={() => openChat('first')} />

      }

      {/* Jordan Chen — edge case only (stages 2.5–6 use the mentors-available prompt above) */}
      {(currentStage !== '3' || menteePairingConfirmed) &&
      <MentorCard
        name="Jordan Chen"
        initials="JC"
        networkName="Design Mentors Network"
        status={
        currentStage === '3' ?
        'Awaiting First Contact' :
        currentStage === '6' || currentStage === 'edge' ?
        'Quiet' :
        'Active'
        }
        message={
        currentStage === '4' || currentStage === '5' ?
        {
          sender: 'Jordan Chen',
          timestamp: currentStage === '4' ? '15 min ago' : 'Yesterday',
          preview:
          'Hey! I reviewed your wireframes and had a few thoughts about the navigation flow. Could be worth a quick chat to walk through alternatives.'
        } :
        undefined
        }
        goal={
        currentStage === '5' ||
        currentStage === '6' ||
        currentStage === 'edge' ?
        {
          title: 'Build UX Portfolio',
          stepCurrent: 3,
          stepTotal: 4,
          percent: 75
        } :
        undefined
        }
        nextSession={
        currentStage === '4' ?
        {
          label: 'Portfolio Review Session',
          dateLabel: 'Thu Apr 10',
          detail:
          'A 45-minute walkthrough of your latest case study draft.'
        } :
        currentStage === '5' ?
        {
          label: 'Portfolio Review Session',
          dateLabel: 'Fri May 9',
          detail:
          'Tomorrow at 2:00 PM · UX Foundations Program. Bring your latest case study.'
        } :
        undefined
        }
        quietNudge={
        currentStage === '6' || currentStage === 'edge' ?
        {
          days: currentStage === 'edge' ? 18 : 21,
          onSendMessage: () => openChat('first'),
          onSchedule: openScheduleSession
        } :
        undefined
        }
        onMessage={() => openChat('first')}
        onReply={() => openChat('reply')}
        onSchedule={openScheduleSession}
        onViewGoals={() => {}} />

      }
    </div>);

}