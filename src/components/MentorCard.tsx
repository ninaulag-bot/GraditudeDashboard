import React, { useState, Component } from 'react';
import {
  MessageCircle,
  Target,
  Calendar,
  ChevronDown,
  Mail,
  Goal,
  CalendarClock,
  AlertCircle,
  ArrowRight } from
'lucide-react';
export type MentorCardStatus = 'Awaiting First Contact' | 'Active' | 'Quiet';
export interface MessageActivity {
  sender: string;
  timestamp: string;
  preview: string;
}
export interface GoalActivity {
  title: string;
  stepCurrent: number;
  stepTotal: number;
  percent: number;
}
export interface NextSession {
  label: string;
  dateLabel: string;
  detail?: string;
}
export interface QuietNudge {
  days: number;
  onSendMessage?: () => void;
  onSchedule?: () => void;
}
interface MentorCardProps {
  name: string;
  initials: string;
  networkName: string;
  status: MentorCardStatus;
  message?: MessageActivity;
  goal?: GoalActivity;
  nextSession?: NextSession;
  quietNudge?: QuietNudge;
  onMessage?: () => void;
  onViewGoals?: () => void;
  onSchedule?: () => void;
  onReply?: () => void;
}
const STATUS_STYLES: Record<MentorCardStatus, string> = {
  'Awaiting First Contact': 'bg-[#e7f5ff] text-[#1971c2]',
  Active: 'bg-[#dcfce7] text-[#15803d]',
  Quiet: 'bg-[#fff3bf] text-[#92400e]'
};
type PillKey = 'message' | 'goal' | 'session';
type PillTone = 'info' | 'success' | 'warning';
const PILL_TONE: Record<
  PillTone,
  {
    dot: string;
    activeBg: string;
    activeBorder: string;
    text: string;
  }> =
{
  info: {
    dot: 'bg-[#228be6]',
    activeBg: 'bg-[#e7f5ff]',
    activeBorder: 'border-[#74c0fc]',
    text: 'text-[#1971c2]'
  },
  success: {
    dot: 'bg-[#228be6]',
    activeBg: 'bg-[#e7f5ff]',
    activeBorder: 'border-[#74c0fc]',
    text: 'text-[#1971c2]'
  },
  warning: {
    dot: 'bg-[#f59f00]',
    activeBg: 'bg-[#fff3bf]',
    activeBorder: 'border-[#ffd43b]',
    text: 'text-[#92400e]'
  }
};
function TooltipWrap({
  tooltip,
  children



}: {tooltip: string;children: React.ReactNode;}) {
  return (
    <div className="relative group/tt inline-flex">
      {children}
      <div
        role="tooltip"
        className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-[8px] bg-[#212529] text-white text-[11px] font-medium px-2 py-1 opacity-0 group-hover/tt:opacity-100 group-focus-within/tt:opacity-100 transition-opacity duration-150 shadow-md z-50">
        
        {tooltip}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#212529]" />
      </div>
    </div>);

}
function IconButton({
  onClick,
  tooltip,
  ariaLabel,
  children





}: {onClick?: () => void;tooltip: string;ariaLabel: string;children: React.ReactNode;}) {
  return (
    <TooltipWrap tooltip={tooltip}>
      <button
        onClick={onClick}
        className="w-9 h-9 flex items-center justify-center text-[#495057] border border-[#dee2e6] rounded-[8px] hover:bg-[#f8f9fa] transition-colors"
        aria-label={ariaLabel}>
        
        {children}
      </button>
    </TooltipWrap>);

}
function Pill({
  tone,
  label,
  meta,
  preview,
  active,
  onClick







}: {tone: PillTone;label: string;meta?: string;preview?: string;active: boolean;onClick: () => void;}) {
  const styles = PILL_TONE[tone];
  return (
    <button
      onClick={onClick}
      className={`flex-1 min-w-0 flex items-center gap-3 px-3 py-2.5 rounded-[8px] border transition-colors text-left ${active ? `${styles.activeBg} ${styles.activeBorder}` : 'bg-[#f8f9fa] border-transparent hover:bg-[#f1f3f5]'}`}
      aria-expanded={active}>
      
      <span
        className={`w-2.5 h-2.5 rounded-full shrink-0 ${styles.dot}`}
        aria-hidden="true" />
      
      <span className="flex-1 min-w-0">
        <span className="flex items-baseline gap-1.5 min-w-0">
          <span className="text-[13px] font-semibold text-[#212529] truncate">
            {label}
          </span>
          {meta &&
          <span className="text-[11px] text-[#868e96] shrink-0">
              · {meta}
            </span>
          }
        </span>
        {preview &&
        <span className="block text-[11px] text-[#868e96] truncate mt-0.5">
            {preview}
          </span>
        }
      </span>
      <ChevronDown
        className={`w-4 h-4 text-[#adb5bd] shrink-0 transition-transform duration-200 ${active ? 'rotate-180' : ''}`} />
      
    </button>);

}
function DetailPanel({
  tone,
  Icon,
  heading,
  subtitle,
  body,
  progressPercent,
  actionLabel,
  onAction











}: {tone: PillTone;Icon: ComponentType<{className?: string;}>;heading: string;subtitle?: string;body?: React.ReactNode;progressPercent?: number;actionLabel?: string;onAction?: () => void;}) {
  const styles = PILL_TONE[tone];
  return (
    <div className="flex items-start gap-4">
      <div
        className={`w-12 h-12 rounded-full ${styles.activeBg} flex items-center justify-center shrink-0`}>
        
        <Icon className={`w-5 h-5 ${styles.text}`} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[15px] font-semibold text-[#212529]">{heading}</h4>
        {subtitle &&
        <p className="text-[12px] text-[#868e96] mt-0.5">{subtitle}</p>
        }
        {body &&
        <div className="text-[13px] text-[#495057] leading-relaxed mt-2">
            {body}
          </div>
        }
        {progressPercent !== undefined &&
        <div className="mt-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-medium text-[#868e96] uppercase tracking-wide">
                Progress
              </span>
              <span className={`text-[12px] font-semibold ${styles.text}`}>
                {progressPercent}%
              </span>
            </div>
            <div className="w-full h-[6px] bg-[#e9ecef] rounded-full overflow-hidden">
              <div
              className={`h-full ${styles.dot} rounded-full transition-all`}
              style={{
                width: `${progressPercent}%`
              }} />
            
            </div>
          </div>
        }
        {actionLabel &&
        <button
          onClick={onAction}
          className="mt-3 h-8 px-3 inline-flex items-center text-[12px] font-medium text-white rounded-[8px] bg-[#228be6] hover:bg-[#1c7ed6] transition-colors">
          
            {actionLabel}
          </button>
        }
      </div>
    </div>);

}
export function MentorCard({
  name,
  initials,
  networkName,
  status,
  message,
  goal,
  nextSession,
  quietNudge,
  onMessage,
  onViewGoals,
  onSchedule,
  onReply
}: MentorCardProps) {
  const [activePill, setActivePill] = useState<PillKey | null>(null);
  const togglePill = (key: PillKey) => {
    setActivePill((prev) => prev === key ? null : key);
  };
  const hasPills = Boolean(message || goal || nextSession);
  const showDetail = activePill !== null;
  const actionButtons =
  <>
      <IconButton
      onClick={onMessage}
      tooltip="Send a message"
      ariaLabel="Send a message">
      
        <MessageCircle className="w-4 h-4" />
      </IconButton>
      <IconButton
      onClick={onViewGoals}
      tooltip="View shared goals"
      ariaLabel="View shared goals">
      
        <Target className="w-4 h-4" />
      </IconButton>
      <TooltipWrap tooltip="Schedule a session">
        <button
        onClick={onSchedule}
        className="h-9 px-3 flex items-center gap-1.5 text-[13px] font-medium text-[#228be6] border border-[#228be6] rounded-[8px] hover:bg-[#e7f5ff] transition-colors">
        
          <Calendar className="w-4 h-4" />
          Schedule
        </button>
      </TooltipWrap>
    </>;

  return (
    <div className="bg-white border border-[#dee2e6] rounded-[8px] shadow-sm">
      {/* Section 1 — Header */}
      <div className="px-5 py-5">
        <div className="flex items-center lg:items-start gap-4">
          <div className="w-[52px] h-[52px] rounded-full bg-[#e7f5ff] flex items-center justify-center text-[#228be6] text-[16px] font-bold shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap">
              <span className="text-[17px] font-bold text-[#212529] truncate">
                {name}
              </span>
              <span
                className={`text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0 ${STATUS_STYLES[status]}`}>
                
                {status}
              </span>
            </div>
            <p className="text-[13px] text-[#868e96] mt-1 lg:whitespace-normal truncate lg:overflow-visible lg:text-clip">
              Mentor · {networkName}
            </p>
            <div className="hidden lg:flex items-center gap-1.5 mt-3">
              {actionButtons}
            </div>
          </div>
        </div>
        <div className="flex lg:hidden items-center gap-1.5 mt-4">
          {actionButtons}
        </div>
      </div>

      {/* Section 2 — Update pills (default: horizontal at desktop, vertical at mobile) */}
      {hasPills &&
      <div className="mentor-pills-default">
          <div className="h-px bg-[#dee2e6]" aria-hidden="true" />
          <div className="px-5 py-3 flex flex-col sm:flex-row items-stretch gap-2">
            {message &&
          <Pill
            tone="info"
            label="Message"
            meta={message.timestamp}
            preview={message.preview}
            active={activePill === 'message'}
            onClick={() => togglePill('message')} />

          }
            {goal &&
          <Pill
            tone="success"
            label="Goal update"
            meta={`${goal.percent}%`}
            preview={goal.title}
            active={activePill === 'goal'}
            onClick={() => togglePill('goal')} />

          }
            {nextSession &&
          <Pill
            tone="warning"
            label="Next session"
            meta={nextSession.dateLabel}
            preview={nextSession.label}
            active={activePill === 'session'}
            onClick={() => togglePill('session')} />

          }
          </div>
          {showDetail &&
        <>
              <div className="h-px bg-[#dee2e6]" aria-hidden="true" />
              <div className="px-5 py-5">
                {activePill === 'message' && message &&
            <DetailPanel
              tone="info"
              Icon={Mail}
              heading={`${message.sender} sent you a message`}
              subtitle={message.timestamp}
              body={message.preview}
              actionLabel="Reply"
              onAction={onReply} />

            }
                {activePill === 'goal' && goal &&
            <DetailPanel
              tone="success"
              Icon={Goal}
              heading={goal.title}
              subtitle={`Step ${goal.stepCurrent} of ${goal.stepTotal} complete`}
              progressPercent={goal.percent}
              actionLabel="View goal"
              onAction={onViewGoals} />

            }
                {activePill === 'session' && nextSession &&
            <DetailPanel
              tone="warning"
              Icon={CalendarClock}
              heading={nextSession.label}
              subtitle={nextSession.dateLabel}
              body={nextSession.detail}
              actionLabel="View session"
              onAction={onSchedule} />

            }
              </div>
            </>
        }
        </div>
      }

      {/* Section 2.iPad — Stacked accordion (only visible at iPad widths via CSS) */}
      {hasPills &&
      <div className="mentor-pills-ipad">
          <div className="h-px bg-[#dee2e6]" aria-hidden="true" />
          {message &&
        <div className="border-b border-[#dee2e6] last:border-b-0">
              <div className="px-5 py-3 flex">
                <Pill
              tone="info"
              label="Message"
              meta={message.timestamp}
              preview={message.preview}
              active={activePill === 'message'}
              onClick={() => togglePill('message')} />
            
              </div>
              {activePill === 'message' &&
          <div className="px-5 pb-5">
                  <DetailPanel
              tone="info"
              Icon={Mail}
              heading={`${message.sender} sent you a message`}
              subtitle={message.timestamp}
              body={message.preview}
              actionLabel="Reply"
              onAction={onReply} />
            
                </div>
          }
            </div>
        }
          {goal &&
        <div className="border-b border-[#dee2e6] last:border-b-0">
              <div className="px-5 py-3 flex">
                <Pill
              tone="success"
              label="Goal update"
              meta={`${goal.percent}%`}
              preview={goal.title}
              active={activePill === 'goal'}
              onClick={() => togglePill('goal')} />
            
              </div>
              {activePill === 'goal' &&
          <div className="px-5 pb-5">
                  <DetailPanel
              tone="success"
              Icon={Goal}
              heading={goal.title}
              subtitle={`Step ${goal.stepCurrent} of ${goal.stepTotal} complete`}
              progressPercent={goal.percent}
              actionLabel="View goal"
              onAction={onViewGoals} />
            
                </div>
          }
            </div>
        }
          {nextSession &&
        <div className="border-b border-[#dee2e6] last:border-b-0">
              <div className="px-5 py-3 flex">
                <Pill
              tone="warning"
              label="Next session"
              meta={nextSession.dateLabel}
              preview={nextSession.label}
              active={activePill === 'session'}
              onClick={() => togglePill('session')} />
            
              </div>
              {activePill === 'session' &&
          <div className="px-5 pb-5">
                  <DetailPanel
              tone="warning"
              Icon={CalendarClock}
              heading={nextSession.label}
              subtitle={nextSession.dateLabel}
              body={nextSession.detail}
              actionLabel="View session"
              onAction={onSchedule} />
            
                </div>
          }
            </div>
        }
        </div>
      }

      {/* Section 4 — Quiet relationship nudge */}
      {quietNudge &&
      <>
          <div className="h-px bg-[#dee2e6]" aria-hidden="true" />
          <div className="px-5 py-4 bg-[#fff9db] flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-[#f59f00] mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-[13px] text-[#5c3d00] leading-relaxed">
                Your mentorship with {name.split(' ')[0]} has been quiet for{' '}
                <span className="font-semibold">{quietNudge.days} days</span>.
                Reconnecting now keeps your momentum alive.
              </p>
              <div className="flex gap-2 mt-3">
                <button
                onClick={quietNudge.onSendMessage}
                className="px-3 h-[30px] text-[12px] font-medium text-white bg-[#228be6] rounded-[8px] hover:bg-[#1c7ed6] transition-colors">
                
                  Send Message
                </button>
                <button
                onClick={quietNudge.onSchedule}
                className="inline-flex items-center gap-1 h-[30px] text-[12px] font-medium text-[#228be6] bg-transparent hover:underline transition-colors">
                
                  Schedule Session
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </>
      }
    </div>);

}