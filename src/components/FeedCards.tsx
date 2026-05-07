import React, { useState } from 'react';
import {
  X,
  Check,
  MessageCircle,
  Heart,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ArrowRight } from
'lucide-react';
import { useCta } from './CtaModals';
// --- Stage 1 Cards ---
export function WelcomeCard() {
  return (
    <div className="bg-[#e7f5ff] rounded-[8px] border border-[#74c0fc] p-5 shadow-sm">
      <h3 className="text-[18px] font-bold text-[#1864ab] mb-1">
        Welcome to Graditude, Maya!
      </h3>
      <p className="text-[14px] text-[#1971c2]">
        This is where your mentorship story will live. Start by joining an
        organization.
      </p>
    </div>);

}
export function ProfilePromptCard({
  percent,
  copy



}: {percent: number;copy: string;}) {
  return (
    <div className="bg-white rounded-[8px] border border-[#dee2e6] p-5 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-[16px] font-bold text-[#212529] mb-1">
            Your profile is {percent}% complete
          </h3>
          <p className="text-[14px] text-[#495057]">{copy}</p>
        </div>
        <button className="px-4 h-[36px] text-[14px] font-medium text-[#495057] border border-[#dee2e6] rounded-[4px] hover:bg-[#f8f9fa] transition-colors shrink-0">
          {percent === 20 ? 'Complete Profile' : 'Finish Profile'}
        </button>
      </div>
      <div className="w-full h-[8px] bg-[#e9ecef] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#228be6] rounded-full transition-all duration-500"
          style={{
            width: `${percent}%`
          }}>
        </div>
      </div>
    </div>);

}
export function DiscoveryMentorCard({ onDismiss }: {onDismiss: () => void;}) {
  const [dismissed, setDismissed] = useState(false);
  const { openMentorDetail, showToast } = useCta();
  if (dismissed) {
    return (
      <div className="bg-white rounded-[8px] border border-[#dee2e6] p-4 text-center text-[13px] text-[#868e96] shadow-sm animate-in fade-in duration-300">
        Got it — we won't show this again.
      </div>);

  }
  return (
    <div className="bg-white rounded-[8px] border border-[#dee2e6] border-dashed p-5 relative shadow-sm">
      <button
        onClick={() => {
          setDismissed(true);
          setTimeout(onDismiss, 1500);
        }}
        className="absolute top-4 right-4 text-[#adb5bd] hover:text-[#495057] transition-colors">
        
        <X className="w-4 h-4" />
      </button>
      <p className="text-[12px] font-bold text-[#868e96] uppercase tracking-wide mb-4">
        You may be interested in
      </p>
      <div className="flex items-start gap-4">
        <div className="w-[56px] h-[56px] rounded-full bg-[#e9ecef] flex items-center justify-center text-[#495057] text-[18px] font-bold shrink-0">
          DP
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-[16px] font-bold text-[#212529]">
                David Park
              </h3>
              <p className="text-[14px] text-[#495057]">
                Senior UX Designer at Figma
              </p>
              <p className="text-[13px] text-[#868e96] mt-1">
                Design Mentors Network
              </p>
            </div>
            <button
              onClick={openMentorDetail}
              className="px-3 h-[32px] text-[13px] font-medium text-[#495057] border border-[#dee2e6] rounded-[4px] hover:bg-[#f8f9fa] transition-colors shrink-0">
              
              View Profile
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3 mb-4">
            <span className="px-2.5 py-1 bg-[#f8f9fa] border border-[#dee2e6] rounded-[4px] text-[12px] text-[#495057]">
              Design Systems
            </span>
            <span className="px-2.5 py-1 bg-[#f8f9fa] border border-[#dee2e6] rounded-[4px] text-[12px] text-[#495057]">
              Accessibility
            </span>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                showToast({
                  icon: 'check',
                  title: 'Match request sent'
                });
                setDismissed(true);
                setTimeout(onDismiss, 1500);
              }}
              className="px-4 h-[32px] text-[13px] font-medium text-white bg-[#228be6] rounded-[4px] hover:bg-[#1c7ed6] transition-colors">
              
              Send Match Request
            </button>
            <button
              onClick={() => {
                setDismissed(true);
                setTimeout(onDismiss, 1500);
              }}
              className="text-[13px] font-medium text-[#868e96] hover:text-[#495057] transition-colors">
              
              No thanks
            </button>
          </div>
        </div>
      </div>
    </div>);

}
export function DiscoveryOrgCard({
  onDismiss,
  onJoinOrg



}: {onDismiss: () => void;onJoinOrg?: () => void;}) {
  const [dismissed, setDismissed] = useState(false);
  const { openOrgDetail } = useCta();
  if (dismissed) {
    return (
      <div className="bg-white rounded-[8px] border border-[#dee2e6] p-4 text-center text-[13px] text-[#868e96] shadow-sm animate-in fade-in duration-300">
        Got it — we won't show this again.
      </div>);

  }
  return (
    <div className="bg-white rounded-[8px] border border-[#dee2e6] border-dashed relative shadow-sm overflow-hidden">
      <button
        onClick={() => {
          setDismissed(true);
          setTimeout(onDismiss, 1500);
        }}
        className="absolute top-3 right-3 z-10 w-[28px] h-[28px] bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[#495057] hover:bg-white transition-colors shadow-sm">
        
        <X className="w-4 h-4" />
      </button>
      <img
        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=240&fit=crop"
        alt="Design Mentors Network banner"
        className="w-full h-32 object-cover" />
      
      <div className="p-5">
        <p className="text-[12px] font-bold text-[#868e96] uppercase tracking-wide mb-3">
          You may be interested in
        </p>
        <h3 className="text-[16px] font-bold text-[#212529] mb-2">
          Design Mentors Network
        </h3>
        <p className="text-[14px] text-[#495057] mb-3 leading-relaxed">
          A global community of senior designers helping the next generation of
          UX talent.
        </p>
        <p className="text-[13px] text-[#868e96] mb-4">142 members</p>
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() =>
            openOrgDetail({
              onDecline: () => {
                setDismissed(true);
                setTimeout(onDismiss, 1500);
              },
              onJoin: () => onJoinOrg?.()
            })
            }
            className="px-4 h-[32px] text-[13px] font-medium text-white bg-[#228be6] rounded-[4px] hover:bg-[#1c7ed6] transition-colors">
            
            Join
          </button>
          <button
            onClick={() => {
              setDismissed(true);
              setTimeout(onDismiss, 1500);
            }}
            className="text-[13px] font-medium text-[#868e96] hover:text-[#495057] transition-colors shrink-0">
            
            No thanks
          </button>
        </div>
      </div>
    </div>);

}
// --- Stage 2 Cards ---
export function OrgJoinedCard() {
  return (
    <div className="bg-white rounded-[8px] border border-[#dee2e6] p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#16a34a]">
          <Check className="w-4 h-4" />
        </div>
        <p className="text-[15px] font-medium text-[#212529]">
          You joined Design Mentors Network
        </p>
      </div>
      <button className="px-4 h-[32px] text-[13px] font-medium text-[#495057] border border-[#dee2e6] rounded-[4px] hover:bg-[#f8f9fa] transition-colors shrink-0">
        View Organization
      </button>
    </div>);

}
export function ProgramEnrollmentCard({
  onDismiss


}: {onDismiss?: () => void;} = {}) {
  const { openProgramDetail, showToast } = useCta();
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) {
    return (
      <div className="bg-white rounded-[8px] border border-[#dee2e6] p-4 text-center text-[13px] text-[#868e96] shadow-sm animate-in fade-in duration-300">
        Got it — we won't show this again.
      </div>);

  }
  const handleLearnMore = () => {
    openProgramDetail({
      onDecline: () => {
        setDismissed(true);
        if (onDismiss) setTimeout(onDismiss, 1500);
      },
      onApply: () => {
        showToast({
          icon: 'check',
          title: 'Application started'
        });
      }
    });
  };
  return (
    <div className="bg-white rounded-[8px] border border-[#dee2e6] shadow-sm overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=240&fit=crop"
        alt="UX Research Intensive"
        className="w-full h-32 object-cover" />
      
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wide text-[#0ca678] bg-[#e6fcf5] px-2 py-0.5 rounded-[4px]">
            Program
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wide text-[#228be6] bg-[#e7f5ff] px-2 py-0.5 rounded-[4px]">
            Enrollment Open
          </span>
        </div>
        <h3 className="text-[18px] font-bold text-[#212529] mb-1">
          UX Research Intensive
        </h3>
        <p className="text-[14px] text-[#868e96] mb-4">
          Design Mentors Network
        </p>
        <div className="flex items-center gap-2 text-[13px] text-[#495057] mb-5">
          <Calendar className="w-4 h-4 text-[#adb5bd]" />
          Enrollment open Apr 1–15
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleLearnMore}
            className="px-4 h-[36px] text-[14px] font-medium text-white bg-[#228be6] rounded-[4px] hover:bg-[#1c7ed6] transition-colors">
            
            Apply Now
          </button>
          <button
            onClick={() => {
              setDismissed(true);
              if (onDismiss) setTimeout(onDismiss, 1500);
            }}
            className="text-[13px] font-medium text-[#868e96] hover:text-[#495057] transition-colors">
            
            No thanks
          </button>
        </div>
      </div>
    </div>);

}
// --- Stage 2.5 Cards ---
export function MentorsNudgeCard() {
  return (
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
        className="px-4 h-[36px] text-[14px] font-medium text-white bg-[#228be6] rounded-[4px] hover:bg-[#1c7ed6] transition-colors">
        
        Get Matched
      </button>
    </div>);

}
// --- Stage 3 Cards ---
export function AdminPairingCard({
  role,
  confirmed: confirmedProp,
  onConfirm




}: {role: 'mentor' | 'mentee';confirmed?: boolean;onConfirm?: () => void;}) {
  const { openConfirmPairing } = useCta();
  const [internalConfirmed, setInternalConfirmed] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const confirmed = confirmedProp ?? internalConfirmed;
  if (dismissed) {
    return null;
  }
  const handleViewDetails = () => {
    openConfirmPairing({
      onConfirm: () => {
        setInternalConfirmed(true);
        onConfirm?.();
      },
      onDecline: () => {
        setDismissed(true);
      }
    });
  };
  const isMentee = role === 'mentee';
  const targetName = isMentee ? 'Jordan Chen' : 'Alex Rivera';
  const targetInitials = isMentee ? 'JC' : 'AR';
  const targetRole = isMentee ? 'Mentor' : 'Mentee';
  return (
    <div className="bg-white rounded-[8px] border border-[#dee2e6] p-5 shadow-sm">
      <div className="flex justify-between items-center mb-3 gap-3">
        <span className="text-[10px] font-bold uppercase tracking-wide text-[#495057] bg-[#f8f9fa] border border-[#dee2e6] px-1.5 py-0.5 rounded-[4px]">
          Admin Pairing
        </span>
        <span className="text-[12px] text-[#adb5bd] shrink-0">Just now</span>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-[32px] h-[32px] rounded-full bg-[#e9ecef] flex items-center justify-center text-[#495057] text-[12px] font-bold shrink-0">
          SW
        </div>
        <p className="text-[14px] text-[#212529]">
          Dr. Sarah Williams has paired you with a{' '}
          {isMentee ? 'mentor' : 'mentee'}
        </p>
      </div>

      <div className="bg-[#f8f9fa] border border-[#dee2e6] rounded-[8px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-[48px] h-[48px] rounded-full bg-[#e7f5ff] flex items-center justify-center text-[#228be6] text-[16px] font-bold shrink-0">
            {targetInitials}
          </div>
          <div>
            <h4 className="text-[15px] font-bold text-[#212529]">
              {targetName}
            </h4>
            <p className="text-[13px] text-[#868e96]">{targetRole}</p>
            <p className="text-[13px] text-[#868e96]">Design Mentors Network</p>
            {/* Mobile-only inline View Details under Design Mentors Network */}
            {!confirmed &&
            <button
              onClick={handleViewDetails}
              className="sm:hidden inline-flex items-center gap-1 mt-1 text-[13px] font-medium text-[#228be6] bg-transparent hover:underline transition-colors whitespace-nowrap">
              
                View Details
                <ArrowRight className="w-4 h-4" />
              </button>
            }
          </div>
        </div>
        {confirmed ?
        <span className="h-[32px] px-3 text-[12px] font-medium text-[#16a34a] bg-[#dcfce7] rounded-[4px] flex items-center justify-center gap-1.5 shrink-0 w-full sm:w-auto whitespace-nowrap">
            <Check className="w-4 h-4" />
            Paired
          </span> /* Tablet/desktop View Details on the right */ :

        <button
          onClick={handleViewDetails}
          className="hidden sm:inline-flex items-center justify-start gap-1 h-[32px] text-[13px] font-medium text-[#228be6] bg-transparent hover:underline transition-colors shrink-0 whitespace-nowrap">
          
            View Details
            <ArrowRight className="w-4 h-4" />
          </button>
        }
      </div>

      {!confirmed &&
      <div className="flex items-center gap-3 sm:justify-between">
          {/* Mobile: No thanks on left, Confirm Pairing fills remaining width */}
          <button
          onClick={() => setDismissed(true)}
          className="text-[13px] font-medium text-[#868e96] hover:text-[#495057] transition-colors order-1 sm:order-2">
          
            No thanks
          </button>
          <button
          onClick={() => {
            setInternalConfirmed(true);
            onConfirm?.();
          }}
          className="flex-1 sm:flex-none px-4 h-[36px] text-[14px] font-medium text-white bg-[#228be6] rounded-[4px] hover:bg-[#1c7ed6] transition-colors order-2 sm:order-1">
          
            Confirm Pairing
          </button>
        </div>
      }
    </div>);

}
function NudgeShell({
  timeAgo,
  initials,
  name,
  body,
  actions,
  borderClass = 'border border-[#dee2e6]',
  pillClass = 'text-[#228be6] bg-[#e7f5ff]'








}: {timeAgo: string;initials: string;name: string;body: string;actions: React.ReactNode;borderClass?: string;pillClass?: string;}) {
  return (
    <div className={`bg-white rounded-[8px] ${borderClass} p-5 shadow-sm`}>
      <div className="flex justify-between items-center mb-4">
        <span
          className={`text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full ${pillClass}`}>
          
          Nudge
        </span>
        <span className="text-[13px] text-[#868e96]">{timeAgo}</span>
      </div>
      <div className="flex items-start gap-3 mb-4">
        <div className="w-[40px] h-[40px] rounded-full bg-[#e7f5ff] flex items-center justify-center text-[#228be6] text-[13px] font-bold shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <h4 className="text-[15px] font-bold text-[#212529] leading-tight">
            {name}
          </h4>
          <p className="text-[14px] text-[#868e96] leading-[1.5] mt-1">
            {body}
          </p>
        </div>
      </div>
      {actions}
    </div>);

}
export function FirstContactNudgeCard() {
  const { openChat } = useCta();
  return (
    <NudgeShell
      timeAgo="1 day ago"
      initials="JC"
      name="Jordan Chen"
      body="Your match is waiting for a first message. Introduce yourself."
      actions={
      <button
        onClick={() => openChat('first')}
        className="px-4 h-[36px] text-[14px] font-medium text-white bg-[#228be6] rounded-[6px] hover:bg-[#1c7ed6] transition-colors">
        
          Send First Message
        </button>
      } />);


}
// 7-day quiet nudge — softer middle variant between FirstContact and StrongNudge
export function QuietWeekNudgeCard() {
  const { openChat } = useCta();
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <NudgeShell
      timeAgo="7 days ago"
      initials="JC"
      name="Jordan Chen"
      body="It has been a week since you and Jordan connected. A quick message goes a long way."
      actions={
      <div className="flex items-center gap-2">
          <button
          onClick={() => openChat('first')}
          className="px-4 h-[36px] text-[14px] font-medium text-white bg-[#228be6] rounded-[6px] hover:bg-[#1c7ed6] transition-colors">
          
            Send Message
          </button>
          <button
          onClick={() => setDismissed(true)}
          className="px-3 h-[36px] text-[14px] font-medium text-[#868e96] hover:text-[#495057] transition-colors">
          
            Dismiss
          </button>
        </div>
      } />);


}
// --- Stage 4 Cards ---
export function MessagePreviewCard() {
  const { openChat } = useCta();
  return (
    <div className="bg-white rounded-[8px] border border-[#dee2e6] p-5 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-[32px] h-[32px] rounded-full bg-[#e9ecef] flex items-center justify-center text-[#495057] text-[12px] font-bold">
              SK
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#16a34a] border-2 border-white rounded-full"></div>
          </div>
          <span className="text-[14px] font-bold text-[#212529]">
            Sarah Kim
          </span>
        </div>
        <span className="text-[12px] text-[#adb5bd]">15 min ago</span>
      </div>
      <div className="bg-[#f8f9fa] rounded-[8px] rounded-tl-none p-3 mb-4 inline-block max-w-[90%]">
        <p className="text-[14px] text-[#495057]">
          Hey! I reviewed your wireframes and had a few thoughts about the
          navigation flow...
        </p>
      </div>
      <div>
        <button
          onClick={() => openChat('reply')}
          className="px-4 h-[32px] text-[13px] font-medium text-[#495057] border border-[#dee2e6] rounded-[4px] hover:bg-[#f8f9fa] transition-colors">
          
          Reply
        </button>
      </div>
    </div>);

}
export function EventCard() {
  const { openRsvp } = useCta();
  return (
    <div className="bg-white rounded-[8px] border border-[#dee2e6] p-5 shadow-sm relative">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wide text-[#228be6] bg-[#e7f5ff] px-1.5 py-0.5 rounded-[4px]">
            New Event
          </span>
          <span className="text-[12px] text-[#868e96]">
            · Design Mentors Network
          </span>
        </div>
        <span className="text-[12px] text-[#adb5bd]">1 day ago</span>
      </div>
      <h3 className="text-[16px] font-bold text-[#212529] mb-1">
        Design Systems Workshop
      </h3>
      <p className="text-[14px] text-[#495057] mb-3">
        A hands-on session exploring component architecture and token systems.
      </p>
      <div className="flex items-center gap-2 text-[13px] text-[#495057] mb-4">
        <Calendar className="w-4 h-4 text-[#adb5bd]" />
        Friday, Apr 11 · 3:00 PM
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={openRsvp}
            className="px-4 h-[32px] text-[13px] font-medium text-white bg-[#228be6] rounded-[4px] hover:bg-[#1c7ed6] transition-colors">
            
            RSVP
          </button>
        </div>
        <button className="text-[13px] text-[#adb5bd] hover:text-[#495057] transition-colors">
          Dismiss
        </button>
      </div>
    </div>);

}
export function SessionConfirmationCard() {
  const { showToast } = useCta();
  return (
    <div className="bg-white rounded-[8px] border border-[#dee2e6] p-5 shadow-sm">
      <div className="flex items-start gap-6">
        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#2f9e44]" />
            <span className="text-[14px] font-medium text-[#2f9e44]">
              Confirmed
            </span>
          </div>
          <h4 className="text-[16px] font-bold text-[#212529]">
            Portfolio Review Session
          </h4>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#228be6] flex items-center justify-center text-white text-[10px] font-semibold">
              JC
            </div>
            <span className="text-[14px] text-[#868e96]">with Jordan Chen</span>
          </div>
          <p className="text-[14px] text-[#868e96]">
            Thursday, Apr 10 · 2:00 PM · UX Foundations Program
          </p>
        </div>
        <div className="w-[68px] border border-[#dee2e6] rounded-[8px] p-2 flex flex-col items-center shrink-0">
          <span className="text-[11px] font-semibold uppercase text-[#c92a2a]">
            Apr
          </span>
          <span className="text-[24px] font-bold text-[#212529] leading-[1.2] mt-0.5">
            10
          </span>
        </div>
      </div>
      <div className="border-t border-[#e9ecef] mt-4 pt-4">
        <button
          onClick={() =>
          showToast({
            icon: 'calendar',
            title: 'Added to your calendar',
            subtitle: 'Portfolio Review Session — Apr 10 at 2:00 PM'
          })
          }
          className="px-4 h-[36px] text-[14px] font-medium text-white bg-[#228be6] rounded-[4px] hover:bg-[#1c7ed6] transition-colors">
          
          Add to Calendar
        </button>
      </div>
    </div>);

}
export function StepApprovedCard() {
  return (
    <div className="bg-white rounded-[8px] border border-[#dee2e6] p-5 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
          <span className="text-[12px] font-bold uppercase tracking-wide text-[#16a34a]">
            Step Approved
          </span>
        </div>
        <span className="text-[12px] text-[#adb5bd]">1 hour ago</span>
      </div>
      <h3 className="text-[16px] font-bold text-[#212529] mb-1">
        Build UX Portfolio
      </h3>
      <p className="text-[14px] text-[#495057] mb-3">Complete case study #3</p>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 rounded-full bg-[#e7f5ff] flex items-center justify-center text-[#228be6] text-[9px] font-bold">
          JC
        </div>
        <span className="text-[13px] text-[#868e96]">
          Jordan Chen signed off
        </span>
      </div>
      <button className="px-4 h-[32px] text-[13px] font-medium text-[#495057] border border-[#dee2e6] rounded-[4px] hover:bg-[#f8f9fa] transition-colors">
        View Goal
      </button>
    </div>);

}
// --- Stage 5 Cards ---
export function MeetingReminderCard() {
  return (
    <div className="bg-white rounded-[8px] border border-[#74c0fc] p-5 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-[16px] font-bold text-[#212529] mb-2">
            Portfolio Review Session
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#e7f5ff] flex items-center justify-center text-[#228be6] text-[9px] font-bold">
              JC
            </div>
            <span className="text-[13px] text-[#495057]">with Jordan Chen</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fff3bf] text-[#e67700] rounded-full text-[12px] font-medium shrink-0">
          <Clock className="w-3.5 h-3.5" />
          Tomorrow at 2:00 PM
        </div>
      </div>
      <div className="flex gap-2">
        <button className="px-4 h-[32px] text-[13px] font-medium text-white bg-[#228be6] rounded-[4px] hover:bg-[#1c7ed6] transition-colors">
          Join Meeting
        </button>
        <button className="inline-flex items-center gap-1 h-[32px] text-[13px] font-medium text-[#228be6] bg-transparent hover:underline transition-colors">
          View Details
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>);

}
export function ApproachingDeadlineCard() {
  const { openUpdateProgress } = useCta();
  return (
    <div className="bg-white rounded-[8px] border border-[#dee2e6] p-5 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <span className="text-[10px] font-bold uppercase tracking-wide text-[#f59f00] bg-[#fff3bf] px-1.5 py-0.5 rounded-[4px]">
          Approaching Deadline
        </span>
        <span className="text-[12px] font-medium text-[#f59f00]">
          6 days remaining
        </span>
      </div>
      <h3 className="text-[16px] font-bold text-[#212529] mb-1">
        Build UX Portfolio
      </h3>
      <p className="text-[14px] text-[#495057] mb-2">
        Submit final presentation
      </p>
      <p className="text-[13px] text-[#868e96] mb-4">Target: Apr 15, 2026</p>
      <button
        onClick={openUpdateProgress}
        className="px-4 h-[32px] text-[13px] font-medium text-[#495057] border border-[#dee2e6] rounded-[4px] hover:bg-[#f8f9fa] transition-colors">
        
        Update Progress
      </button>
    </div>);

}
export function StepCompletedCard() {
  return (
    <div className="bg-white rounded-[8px] border border-[#dee2e6] p-5 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
          <span className="text-[12px] font-bold uppercase tracking-wide text-[#16a34a]">
            Step Completed
          </span>
        </div>
        <span className="text-[12px] text-[#adb5bd]">3 hours ago</span>
      </div>
      <h3 className="text-[16px] font-bold text-[#212529] mb-1">
        Build UX Portfolio
      </h3>
      <p className="text-[14px] text-[#495057] mb-3">Complete case study #3</p>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 rounded-full bg-[#f8f9fa] border border-[#dee2e6] flex items-center justify-center text-[#495057] text-[9px] font-bold">
          AR
        </div>
        <span className="text-[13px] text-[#868e96]">
          Completed by Alex Rivera
        </span>
      </div>
      <button className="px-4 h-[32px] text-[13px] font-medium text-[#495057] border border-[#dee2e6] rounded-[4px] hover:bg-[#f8f9fa] transition-colors">
        View Goal
      </button>
    </div>);

}
export function CommunityPostCard() {
  return (
    <div className="bg-white rounded-[8px] border border-[#dee2e6] p-5 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-[40px] h-[40px] rounded-full bg-[#e9ecef] flex items-center justify-center text-[#495057] text-[14px] font-bold">
            ML
          </div>
          <div>
            <h4 className="text-[15px] font-bold text-[#212529]">Marcus Lee</h4>
            <p className="text-[13px] text-[#868e96]">Design Mentors Network</p>
          </div>
        </div>
        <span className="text-[12px] text-[#adb5bd]">4 hours ago</span>
      </div>
      <p className="text-[14px] text-[#495057] leading-relaxed mb-4">
        Just wrapped up an amazing mentoring session about design systems. Key
        takeaway: start with your spacing scale before anything else. It forces
        you to think about rhythm and consistency from the ground up. Also had a
        great conversation about when to use tokens vs. hardcoded values — the
        answer is almost always tokens.
      </p>
      <div className="rounded-[8px] overflow-hidden border border-[#e9ecef] mb-4">
        <img
          src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&h=500&fit=crop"
          alt="Design systems whiteboard"
          className="w-full h-auto object-cover" />
        
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-[#f1f3f5]">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-[13px] text-[#868e96] hover:text-[#fa5252] transition-colors">
            <Heart className="w-4 h-4" />
            12
          </button>
          <button className="flex items-center gap-1.5 text-[13px] text-[#868e96] hover:text-[#228be6] transition-colors">
            <MessageCircle className="w-4 h-4" />3
          </button>
        </div>
        <button className="text-[13px] text-[#adb5bd] hover:text-[#495057] transition-colors">
          Dismiss
        </button>
      </div>
    </div>);

}
// --- Stage 6 Cards ---
export function StrongNudgeCard({ days = '3 weeks' }: {days?: string;}) {
  const { openChat, openScheduleSession } = useCta();
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) {
    return (
      <div className="bg-white rounded-[8px] border border-[#dee2e6] p-4 text-center text-[13px] text-[#868e96] shadow-sm animate-in fade-in duration-300">
        Dismissed. You can still reach out to Jordan Chen anytime.
      </div>);

  }
  return (
    <NudgeShell
      timeAgo={`${days} ago`}
      initials="JC"
      name="Jordan Chen"
      body={`Your mentorship with Jordan Chen has been quiet for ${days}. Reconnecting now keeps your momentum alive.`}
      borderClass="border-2 border-[#f59f00]"
      pillClass="text-[#f59f00] bg-[#fff3bf]"
      actions={
      <div className="strong-nudge-actions flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="strong-nudge-actions-buttons flex flex-col sm:flex-row gap-2">
            <button
            onClick={() => openChat('first')}
            className="strong-nudge-send px-4 h-[36px] text-[14px] font-medium text-white bg-[#228be6] rounded-[6px] hover:bg-[#1c7ed6] transition-colors w-full sm:w-auto">
            
              Send Message
            </button>
            <button
            onClick={openScheduleSession}
            className="strong-nudge-schedule inline-flex items-center justify-center gap-1 h-[36px] text-[14px] font-medium text-[#228be6] bg-transparent hover:underline transition-colors w-full sm:w-auto">
            
              Schedule Session
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <button
          onClick={() => setDismissed(true)}
          className="strong-nudge-dismiss text-[14px] text-[#868e96] hover:text-[#495057] transition-colors self-end sm:self-auto">
          
            Dismiss
          </button>
        </div>
      } />);


}
export function ProgramEndWarningCard() {
  const { openChat } = useCta();
  return (
    <div className="bg-white rounded-[8px] border border-[#dee2e6] p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <AlertCircle className="w-4 h-4 text-[#fa5252]" />
        <h3 className="text-[16px] font-bold text-[#212529]">
          PM Mentorship Program ends in 3 weeks.
        </h3>
      </div>
      <p className="text-[14px] text-[#495057] mb-4 ml-6">
        Make the most of your remaining time with Jordan Chen.
      </p>
      <div className="ml-6">
        <button
          onClick={() => openChat('first')}
          className="px-4 h-[32px] text-[13px] font-medium text-[#495057] border border-[#dee2e6] rounded-[4px] hover:bg-[#f8f9fa] transition-colors">
          
          Message Jordan
        </button>
      </div>
    </div>);

}
export function GoalStalledCard() {
  const { openUpdateProgress } = useCta();
  return (
    <div className="bg-white rounded-[8px] border border-[#dee2e6] p-5 shadow-sm">
      <div className="mb-3">
        <span className="text-[10px] font-bold uppercase tracking-wide text-[#fa5252] bg-[#ffe3e3] px-1.5 py-0.5 rounded-[4px]">
          Goal Stalled
        </span>
      </div>
      <h3 className="text-[16px] font-bold text-[#212529] mb-1">
        Build UX Portfolio
      </h3>
      <p className="text-[14px] text-[#495057] mb-4">
        Submit final presentation has had no update in 3 weeks.
      </p>
      <button
        onClick={openUpdateProgress}
        className="px-4 h-[32px] text-[13px] font-medium text-[#495057] border border-[#dee2e6] rounded-[4px] hover:bg-[#f8f9fa] transition-colors">
        
        Update Progress
      </button>
    </div>);

}
// --- Edge Case Cards ---
export function MatchConfirmationCard({
  confirmed: confirmedProp,
  onConfirm



}: {confirmed?: boolean;onConfirm?: () => void;} = {}) {
  const [internalConfirmed, setInternalConfirmed] = useState(false);
  const confirmed = confirmedProp ?? internalConfirmed;
  const handleConfirm = () => {
    setInternalConfirmed(true);
    onConfirm?.();
  };
  return (
    <div className="bg-gradient-to-r from-[#e7f5ff] to-white rounded-[8px] border border-[#74c0fc] p-5 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-[32px] h-[32px] rounded-full bg-[#e9ecef] flex items-center justify-center text-[#495057] text-[12px] font-bold">
            SW
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wide text-white bg-[#228be6] px-1.5 py-0.5 rounded-[4px]">
                New Match
              </span>
            </div>
            <p className="text-[14px] text-[#212529] mt-1">
              Dr. Sarah Williams has paired you with a mentor
            </p>
          </div>
        </div>
        <span className="text-[12px] text-[#adb5bd]">Just now</span>
      </div>

      <div className="bg-white border border-[#74c0fc] rounded-[8px] p-4 mb-4 flex items-center gap-4 shadow-sm">
        <div className="w-[48px] h-[48px] rounded-full bg-[#e7f5ff] flex items-center justify-center text-[#228be6] text-[16px] font-bold shrink-0">
          PS
        </div>
        <div>
          <h4 className="text-[15px] font-bold text-[#212529]">Priya Sharma</h4>
          <p className="text-[13px] text-[#868e96]">
            Mentor · Product Management Club
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleConfirm}
          disabled={confirmed}
          className={`px-3 h-[28px] text-[13px] font-medium rounded-[4px] transition-colors inline-flex items-center gap-1.5 ${confirmed ? 'bg-[#dcfce7] text-[#16a34a] cursor-default' : 'bg-[#228be6] text-white hover:bg-[#1c7ed6]'}`}>
          
          {confirmed && <Check className="w-4 h-4" />}
          {confirmed ? 'Paired' : 'Confirm Pairing'}
        </button>
      </div>
    </div>);

}