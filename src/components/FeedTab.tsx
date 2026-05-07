import React, { useState } from 'react';
import { X, Heart, MessageCircle } from 'lucide-react';
import { PostComposerModal } from './PostComposer';
import { Stage } from './StageSwitcher';
import { useCta } from './CtaModals';
import { MentorMatchCard } from './MentorMatchCard';
import {
  WelcomeCard,
  ProfilePromptCard,
  DiscoveryMentorCard,
  DiscoveryOrgCard,
  OrgJoinedCard,
  ProgramEnrollmentCard,
  MentorsNudgeCard,
  AdminPairingCard,
  EventCard,
  SessionConfirmationCard,
  StepApprovedCard,
  StepCompletedCard,
  MeetingReminderCard,
  ApproachingDeadlineCard,
  CommunityPostCard,
  ProgramEndWarningCard,
  GoalStalledCard,
  MatchConfirmationCard,
  FirstContactNudgeCard,
  QuietWeekNudgeCard,
  StrongNudgeCard } from
'./FeedCards';
interface FeedTabProps {
  isMember?: boolean;
  joinedOrgs?: string[];
  onJoinOrg?: (orgId: string) => void;
  currentStage?: Stage;
  onNavigateToJoinOrg?: () => void;
  menteePairingConfirmed?: boolean;
  onConfirmMenteePairing?: () => void;
  mentorPairingConfirmed?: boolean;
  onConfirmMentorPairing?: () => void;
  priyaPairingConfirmed?: boolean;
  onConfirmPriyaPairing?: () => void;
}
function Dismissible({
  id,
  dismissed,
  onDismiss,
  children





}: {id: string;dismissed: string[];onDismiss: (id: string) => void;children: ReactNode;}) {
  if (dismissed.includes(id)) return null;
  return (
    <div className="relative group">
      <button
        onClick={() => onDismiss(id)}
        className="absolute top-3 right-3 z-10 w-[24px] h-[24px] bg-white border border-[#dee2e6] rounded-full flex items-center justify-center text-[#868e96] hover:text-[#212529] hover:bg-[#f8f9fa] shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
        aria-label="Dismiss"
        title="Dismiss">
        
        <X className="w-3.5 h-3.5" />
      </button>
      {children}
    </div>);

}
export function FeedTab({
  isMember = false,
  joinedOrgs = [],
  onJoinOrg,
  currentStage = '1',
  onNavigateToJoinOrg,
  menteePairingConfirmed = false,
  onConfirmMenteePairing,
  mentorPairingConfirmed = false,
  onConfirmMentorPairing,
  priyaPairingConfirmed = false,
  onConfirmPriyaPairing
}: FeedTabProps) {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [dismissedCards, setDismissedCards] = useState<string[]>([]);
  const { newPostContent, showToast, openMentorDetail } = useCta();
  const handleDismiss = (id: string) => {
    setDismissedCards((prev) => [...prev, id]);
  };
  const D = ({ id, children }: {id: string;children: ReactNode;}) =>
  <Dismissible id={id} dismissed={dismissedCards} onDismiss={handleDismiss}>
      {children}
    </Dismissible>;

  const hasJoinedOrgForComposer = currentStage !== '1';
  const renderComposer = () => {
    if (!hasJoinedOrgForComposer) return null;
    return (
      <>
        <PostComposerModal
          isOpen={isComposerOpen}
          onClose={() => setIsComposerOpen(false)}
          userRole="mentee" />
        
        <div
          onClick={() => setIsComposerOpen(true)}
          className="bg-white rounded-[8px] border border-[#dee2e6] p-4 md:px-5 md:py-4 flex items-center gap-3 md:gap-4 shadow-sm transition-colors cursor-text hover:border-[#ced4da] mb-6">
          
          <div className="w-[40px] h-[40px] rounded-full bg-[#e9ecef] flex items-center justify-center text-[#495057] text-[14px] font-medium shrink-0">
            ME
          </div>
          <div className="flex-1 flex flex-col min-w-0">
            <div className="bg-[#f8f9fa] border border-[#ced4da] rounded-full px-4 h-[40px] md:h-[44px] flex items-center text-[13px] md:text-[13px] text-[#868e96] min-w-0">
              <span className="truncate">
                Share something with your community...
              </span>
            </div>
          </div>
        </div>
      </>);

  };
  const hasJoinedOrg = currentStage !== '1';
  const renderStage1Cards = () =>
  <>
      {currentStage === '1' &&
    <D id="welcome">
          <WelcomeCard />
        </D>
    }
      {!hasJoinedOrg && !dismissedCards.includes('org-dmn') &&
    <DiscoveryOrgCard
      onDismiss={() => handleDismiss('org-dmn')}
      onJoinOrg={onNavigateToJoinOrg} />

    }
    </>;

  const hasJoinedProgram =
  currentStage === '2.5' ||
  currentStage === '3' ||
  currentStage === '4' ||
  currentStage === '5' ||
  currentStage === '6' ||
  currentStage === 'edge';
  const hasMatchedMentor =
  currentStage === '3' ||
  currentStage === '4' ||
  currentStage === '5' ||
  currentStage === '6' ||
  currentStage === 'edge';
  /** Feed shows the same program + mentor cards as stage 2 (not cumulative “later stage” hiding). */
  const useExactStage2FeedItems =
    currentStage === '2' ||
    currentStage === '2.5' ||
    currentStage === '3';
  const renderStage2Cards = () =>
  <>
      {(!hasJoinedProgram || useExactStage2FeedItems) &&
    <D id="program-enroll">
          <ProgramEnrollmentCard
        onDismiss={() => handleDismiss('program-enroll')} />
      
        </D>
    }
      {(!hasMatchedMentor || useExactStage2FeedItems) && !dismissedCards.includes('mentor-dp') &&
    <MentorMatchCard
      name="David Park"
      title="Senior UX Designer"
      company="Figma"
      network="Design Mentors Network"
      skills={['Design Systems', 'Accessibility']}
      avatarInitials="DP"
      onSendMatch={() => {
        showToast({
          icon: 'check',
          title: 'Match request sent'
        });
        handleDismiss('mentor-dp');
      }}
      onViewProfile={openMentorDetail}
      onDismiss={() => handleDismiss('mentor-dp')} />

    }
    </>;

  const renderStage25Cards = () => <></>;
  const renderStage3Cards = () =>
  <>
      {currentStage === '3' && !menteePairingConfirmed &&
    <D id="admin-pairing-mentee">
          <AdminPairingCard
        role="mentee"
        confirmed={menteePairingConfirmed}
        onConfirm={() => onConfirmMenteePairing?.()} />
      
        </D>
    }
      {!mentorPairingConfirmed &&
    <D id="admin-pairing-mentor">
          <AdminPairingCard
        role="mentor"
        confirmed={mentorPairingConfirmed}
        onConfirm={() => onConfirmMentorPairing?.()} />
      
        </D>
    }
    </>;

  const renderStage4Cards = () =>
  <>
      <D id="first-contact-nudge">
        <FirstContactNudgeCard />
      </D>
      <D id="event">
        <EventCard />
      </D>
      <D id="session-confirm">
        <SessionConfirmationCard />
      </D>
      <D id="step-approved">
        <StepApprovedCard />
      </D>
    </>;

  const renderStage5Cards = () =>
  <>
      <D id="meeting-reminder">
        <MeetingReminderCard />
      </D>
      <D id="approaching-deadline">
        <ApproachingDeadlineCard />
      </D>
      <D id="step-completed">
        <StepCompletedCard />
      </D>
      <D id="community-post">
        <CommunityPostCard />
      </D>
    </>;

  const renderStage6Cards = () =>
  <>
      <D id="strong-nudge">
        <StrongNudgeCard />
      </D>
      <D id="program-end-warning">
        <ProgramEndWarningCard />
      </D>
      <D id="goal-stalled">
        <GoalStalledCard />
      </D>
    </>;

  const renderEdgeCaseCards = () =>
  <>
      {!priyaPairingConfirmed &&
    <D id="match-confirmation-priya">
          <MatchConfirmationCard
        confirmed={priyaPairingConfirmed}
        onConfirm={() => onConfirmPriyaPairing?.()} />
      
        </D>
    }
      <D id="goal-stalled-edge">
        <GoalStalledCard />
      </D>
    </>;

  // Cumulative feed logic
  const renderFeed = () => {
    const baseFeed = (() => {
      switch (currentStage) {
        case '1':
          return renderStage1Cards();
        case '2':
          return (
            <>
              {renderStage2Cards()}
              {renderStage1Cards()}
            </>);

        case '2.5':
          return (
            <>
              {renderStage2Cards()}
              {renderStage1Cards()}
            </>);

        case '3':
          return (
            <>
              {renderStage2Cards()}
              {renderStage1Cards()}
            </>);

        case '4':
          return (
            <>
              {renderStage4Cards()}
              {renderStage3Cards()}
              {renderStage25Cards()}
              {renderStage2Cards()}
              {renderStage1Cards()}
            </>);

        case '5':
          return (
            <>
              {renderStage5Cards()}
              {renderStage4Cards()}
              {renderStage3Cards()}
              {renderStage25Cards()}
              {renderStage2Cards()}
              {renderStage1Cards()}
            </>);

        case '6':
          return <>{renderStage6Cards()}</>;
        case 'edge':
          return <>{renderEdgeCaseCards()}</>;
        default:
          return renderStage1Cards();
      }
    })();
    return (
      <>
        {newPostContent && !dismissedCards.includes('new-post') &&
        <D id="new-post">
            <div className="bg-white rounded-[8px] border border-[#dee2e6] p-5 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-[40px] h-[40px] rounded-full bg-[#e9ecef] flex items-center justify-center text-[#495057] text-[14px] font-bold">
                    ME
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-[#212529]">
                      Maya Kim
                    </h4>
                    <p className="text-[13px] text-[#868e96]">
                      Product Management Club
                    </p>
                  </div>
                </div>
                <span className="text-[12px] text-[#adb5bd]">Just now</span>
              </div>
              <p className="text-[14px] text-[#495057] leading-relaxed mb-4 whitespace-pre-wrap">
                {newPostContent}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-[#f1f3f5]">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 text-[13px] text-[#868e96] hover:text-[#fa5252] transition-colors">
                    <Heart className="w-4 h-4" />0
                  </button>
                  <button className="flex items-center gap-1.5 text-[13px] text-[#868e96] hover:text-[#228be6] transition-colors">
                    <MessageCircle className="w-4 h-4" />0
                  </button>
                </div>
              </div>
            </div>
          </D>
        }
        {baseFeed}
      </>);

  };
  return (
    <div className="flex flex-col gap-4 md:gap-6 max-w-3xl pb-12">
      {renderComposer()}
      <div className="flex flex-col gap-4 md:gap-6">{renderFeed()}</div>
    </div>);

}