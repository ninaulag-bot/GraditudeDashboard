import React, {
  useEffect,
  useState,
  useRef,
  createContext,
  useContext } from
'react';
import {
  X,
  Check,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Search } from
'lucide-react';
type ToastProps = {
  icon?: 'check' | 'calendar';
  title: string;
  subtitle?: string;
};
type ChatMode = 'first' | 'reply';
type ConfirmPairingPayload = {
  onConfirm: () => void;
  onDecline: () => void;
};
type OrgDetailPayload = {
  onDecline: () => void;
  onJoin: () => void;
};
type ProgramDetailPayload = {
  onDecline: () => void;
  onApply: () => void;
};
type CtaContextType = {
  openConfirmPairing: (payload: ConfirmPairingPayload) => void;
  openChat: (mode: ChatMode) => void;
  openRsvp: () => void;
  showToast: (props: ToastProps) => void;
  openOrgDetail: (payload: OrgDetailPayload) => void;
  openProgramDetail: (payload: ProgramDetailPayload) => void;
  openMentorDetail: () => void;
  openUpdateProgress: () => void;
  openScheduleSession: () => void;
  submitPost: (content: string) => void;
  newPostContent: string | null;
  clearNewPost: () => void;
};
const CtaContext = createContext<CtaContextType | null>(null);
export function useCta() {
  const ctx = useContext(CtaContext);
  if (!ctx) throw new Error('useCta must be used within CtaProvider');
  return ctx;
}
export function CtaProvider({ children }: {children: ReactNode;}) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [chatMode, setChatMode] = useState<ChatMode>('first');
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [newPostContent, setNewPostContent] = useState<string | null>(null);
  const [confirmPairingPayload, setConfirmPairingPayload] =
  useState<ConfirmPairingPayload | null>(null);
  const [orgDetailPayload, setOrgDetailPayload] =
  useState<OrgDetailPayload | null>(null);
  const [programDetailPayload, setProgramDetailPayload] =
  useState<ProgramDetailPayload | null>(null);
  const openConfirmPairing = (payload: ConfirmPairingPayload) => {
    setConfirmPairingPayload(payload);
    setActiveModal('confirmPairing');
  };
  const openChat = (mode: ChatMode) => {
    setChatMode(mode);
    setActiveModal('chat');
  };
  const openRsvp = () => setActiveModal('rsvp');
  const openOrgDetail = (payload: OrgDetailPayload) => {
    setOrgDetailPayload(payload);
    setActiveModal('orgDetail');
  };
  const openProgramDetail = (payload: ProgramDetailPayload) => {
    setProgramDetailPayload(payload);
    setActiveModal('programDetail');
  };
  const openMentorDetail = () => setActiveModal('mentorDetail');
  const openUpdateProgress = () => setActiveModal('updateProgress');
  const openScheduleSession = () => setActiveModal('scheduleSession');
  const showToast = (props: ToastProps) => {
    setToast(props);
    setTimeout(() => setToast(null), 3000);
  };
  const submitPost = (content: string) => {
    setNewPostContent(content);
    showToast({
      icon: 'check',
      title: 'Posted to Product Management Club'
    });
  };
  const clearNewPost = () => setNewPostContent(null);
  const closeModal = () => setActiveModal(null);
  return (
    <CtaContext.Provider
      value={{
        openConfirmPairing,
        openChat,
        openRsvp,
        showToast,
        openOrgDetail,
        openProgramDetail,
        openMentorDetail,
        openUpdateProgress,
        openScheduleSession,
        submitPost,
        newPostContent,
        clearNewPost
      }}>
      
      {children}
      <CtaRoot
        activeModal={activeModal}
        chatMode={chatMode}
        toast={toast}
        onClose={closeModal}
        confirmPairingPayload={confirmPairingPayload}
        orgDetailPayload={orgDetailPayload}
        programDetailPayload={programDetailPayload} />
      
    </CtaContext.Provider>);

}
function ModalWrapper({
  children,
  onClose



}: {children: ReactNode;onClose: () => void;}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div
        className="fixed inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true" />
      
      <div className="relative z-10 w-full max-w-[520px] bg-white rounded-t-[16px] sm:rounded-[12px] shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {children}
      </div>
    </div>);

}
// --- Modals ---
function ConfirmPairingModal({
  onClose,
  payload



}: {onClose: () => void;payload: ConfirmPairingPayload | null;}) {
  const [step, setStep] = useState<'summary' | 'confirmed' | 'declined'>(
    'summary'
  );
  const { openChat } = useCta();
  if (step === 'confirmed') {
    return (
      <div className="p-8 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-[#dcfce7] rounded-full flex items-center justify-center mb-4">
          <Check className="w-8 h-8 text-[#16a34a]" />
        </div>
        <h2 className="text-[24px] font-bold text-[#212529] mb-2">
          You're matched with Jordan Chen!
        </h2>
        <p className="text-[15px] text-[#495057] mb-8">
          Send them a message to get the conversation started.
        </p>
        <button
          onClick={() => {
            payload?.onConfirm();
            onClose();
            openChat('first');
          }}
          className="w-full h-[44px] bg-[#228be6] text-white rounded-[8px] font-medium hover:bg-[#1c7ed6] transition-colors mb-3">
          
          Send First Message
        </button>
        <button className="text-[14px] font-medium text-[#228be6] hover:underline">
          View Profile
        </button>
      </div>);

  }
  if (step === 'declined') {
    return (
      <div className="p-8 text-center flex flex-col items-center">
        <h2 className="text-[24px] font-bold text-[#212529] mb-2">
          Match declined
        </h2>
        <p className="text-[15px] text-[#495057] mb-8">
          We've let Dr. Sarah Williams know. You may be suggested a new mentor
          soon.
        </p>
        <button
          onClick={() => {
            payload?.onDecline();
            onClose();
          }}
          className="w-full h-[44px] bg-[#f8f9fa] border border-[#dee2e6] text-[#495057] rounded-[8px] font-medium hover:bg-[#e9ecef] transition-colors">
          
          Close
        </button>
      </div>);

  }
  return (
    <>
      <div className="px-6 pt-6 pb-4 border-b border-[#e9ecef]">
        <h2 className="text-[20px] font-bold text-[#212529]">
          Your Mentor Match
        </h2>
        <p className="text-[14px] text-[#495057] mt-1">
          Dr. Sarah Williams has suggested this mentor for you. Review their
          profile before confirming.
        </p>
      </div>
      <div className="p-6 overflow-y-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-[64px] h-[64px] rounded-full bg-[#e7f5ff] flex items-center justify-center text-[#228be6] text-[20px] font-bold shrink-0">
            JC
          </div>
          <div>
            <h3 className="text-[18px] font-bold text-[#212529]">
              Jordan Chen
            </h3>
            <p className="text-[14px] text-[#495057]">
              Senior Product Designer at Google
            </p>
            <p className="text-[13px] text-[#868e96] mt-0.5">
              Mentor · Design Mentors Network
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-2.5 py-1 bg-[#f8f9fa] border border-[#dee2e6] rounded-[4px] text-[12px] text-[#495057]">
            Design Systems
          </span>
          <span className="px-2.5 py-1 bg-[#f8f9fa] border border-[#dee2e6] rounded-[4px] text-[12px] text-[#495057]">
            UX Research
          </span>
          <span className="px-2.5 py-1 bg-[#f8f9fa] border border-[#dee2e6] rounded-[4px] text-[12px] text-[#495057]">
            Prototyping
          </span>
        </div>
        <p className="text-[14px] text-[#495057] leading-relaxed">
          Jordan has 8 years of experience in product design and loves helping
          early-career designers find their footing.
        </p>
      </div>
      <div className="px-6 py-4 border-t border-[#e9ecef] flex justify-end gap-3">
        <button
          onClick={() => setStep('declined')}
          className="h-[40px] px-4 text-[13px] font-medium text-[#495057] bg-white border border-[#dee2e6] rounded-[8px] hover:bg-[#f8f9fa] transition-colors">
          
          No thanks
        </button>
        <button
          onClick={() => {
            payload?.onConfirm();
            onClose();
          }}
          className="h-[40px] px-4 text-[13px] font-medium text-white bg-[#228be6] rounded-[8px] hover:bg-[#1c7ed6] transition-colors">
          
          Confirm Match
        </button>
      </div>
    </>);

}
function ChatModal({ mode, onClose }: {mode: ChatMode;onClose: () => void;}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [view, setView] = useState<'thread' | 'list'>('thread');
  useEffect(() => {
    if (mode === 'reply' && inputRef.current && view === 'thread') {
      inputRef.current.focus();
    }
  }, [mode, view]);
  if (view === 'list') {
    return (
      <div className="flex flex-col h-[600px] max-h-[80vh]">
        <div className="px-4 py-3 border-b border-[#e9ecef] flex items-center justify-between shrink-0">
          <h2 className="text-[16px] font-bold text-[#212529]">Messages</h2>
          <button
            onClick={onClose}
            className="text-[#868e96] hover:text-[#212529] p-1 rounded-full hover:bg-[#f8f9fa] transition-colors">
            
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <button
            onClick={() => setView('thread')}
            className="w-full p-4 flex items-start gap-3 hover:bg-[#f8f9fa] transition-colors border-b border-[#e9ecef] text-left">
            
            <div className="relative shrink-0">
              <div className="w-[48px] h-[48px] rounded-full bg-[#e7f5ff] flex items-center justify-center text-[#228be6] text-[16px] font-bold">
                JC
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#16a34a] border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-[15px] font-bold text-[#212529]">
                  Jordan Chen
                </h3>
                <span className="text-[12px] text-[#868e96]">2:08 PM</span>
              </div>
              <p className="text-[14px] text-[#495057] truncate">
                That's a great focus. Let's set up a time to review...
              </p>
            </div>
          </button>
        </div>
      </div>);

  }
  return (
    <div className="flex flex-col h-[600px] max-h-[80vh]">
      <div className="px-4 py-3 border-b border-[#e9ecef] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView('list')}
            className="flex items-center gap-1 text-[13px] font-medium text-[#868e96] hover:text-[#212529] transition-colors mr-2">
            
            <ChevronLeft className="w-4 h-4" />
            View all chats
          </button>
          <div className="relative">
            <div className="w-[40px] h-[40px] rounded-full bg-[#e7f5ff] flex items-center justify-center text-[#228be6] text-[14px] font-bold">
              JC
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#16a34a] border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-[#212529]">
              Jordan Chen
            </h3>
            <p className="text-[12px] text-[#868e96]">
              Mentor · Design Mentors Network
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-[#868e96] hover:text-[#212529] p-1 rounded-full hover:bg-[#f8f9fa] transition-colors">
          
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-[#f8f9fa]">
        {mode === 'first' ?
        <>
            <div className="flex flex-col items-start max-w-[85%]">
              <div className="bg-[#e9ecef] text-[#212529] px-4 py-2.5 rounded-[16px] rounded-tl-sm text-[14px]">
                Hey Maya! Really excited to be your mentor. I took a look at
                your profile and love that you're focused on product design.
                What are your main goals for this semester?
              </div>
              <span className="text-[11px] text-[#868e96] mt-1 ml-1">
                2:04 PM
              </span>
            </div>
            <div className="flex flex-col items-end self-end max-w-[85%]">
              <div className="bg-[#228be6] text-white px-4 py-2.5 rounded-[16px] rounded-tr-sm text-[14px]">
                Hi Jordan! Thanks so much. My main goal is to build a strong
                portfolio with 3 case studies by May. I also want to get better
                at presenting my work.
              </div>
              <span className="text-[11px] text-[#868e96] mt-1 mr-1">
                2:06 PM
              </span>
            </div>
            <div className="flex flex-col items-start max-w-[85%]">
              <div className="bg-[#e9ecef] text-[#212529] px-4 py-2.5 rounded-[16px] rounded-tl-sm text-[14px]">
                That's a great focus. Let's set up a time to review what you
                have so far. I have some Friday afternoons open — does that
                work?
              </div>
              <span className="text-[11px] text-[#868e96] mt-1 ml-1">
                2:08 PM
              </span>
            </div>
          </> :

        <>
            <div className="flex flex-col items-start max-w-[85%]">
              <div className="bg-[#e9ecef] text-[#212529] px-4 py-2.5 rounded-[16px] rounded-tl-sm text-[14px]">
                Hey! I reviewed your wireframes and had a few thoughts about the
                navigation flow. Could be worth a quick chat to walk through
                alternatives.
              </div>
              <span className="text-[11px] text-[#868e96] mt-1 ml-1">
                Yesterday 3:12 PM
              </span>
            </div>
          </>
        }
      </div>

      <div className="p-4 bg-white border-t border-[#e9ecef] shrink-0">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder={
            mode === 'first' ? 'Write a message...' : 'Write a reply...'
            }
            className="flex-1 h-[40px] bg-[#f1f3f5] border border-transparent focus:border-[#228be6] focus:bg-white rounded-full px-4 text-[14px] outline-none transition-colors" />
          
          <button className="w-[40px] h-[40px] bg-[#228be6] text-white rounded-full flex items-center justify-center hover:bg-[#1c7ed6] transition-colors shrink-0">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>);

}
function RsvpModal({ onClose }: {onClose: () => void;}) {
  const [status, setStatus] = useState<'none' | 'going' | 'maybe' | 'cant'>(
    'none'
  );
  const { showToast } = useCta();
  const handleGoing = () => {
    setStatus('going');
    showToast({
      icon: 'calendar',
      title: 'Added to your calendar',
      subtitle: 'Design Systems Workshop — Apr 11 at 3:00 PM'
    });
    setTimeout(onClose, 1500);
  };
  return (
    <>
      <div className="h-32 bg-[#e9ecef] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-[#495057] hover:bg-white transition-colors">
          
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="p-6">
        <h2 className="text-[24px] font-bold text-[#212529] mb-1">
          Design Systems Workshop
        </h2>
        <p className="text-[14px] text-[#868e96] mb-6">
          Design Mentors Network
        </p>

        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center gap-3 text-[14px] text-[#495057]">
            <Calendar className="w-5 h-5 text-[#adb5bd]" />
            Friday, April 11, 2026
          </div>
          <div className="flex items-center gap-3 text-[14px] text-[#495057]">
            <Clock className="w-5 h-5 text-[#adb5bd]" />
            3:00 PM – 5:00 PM
          </div>
          <div className="flex items-center gap-3 text-[14px] text-[#495057]">
            <MapPin className="w-5 h-5 text-[#adb5bd]" />
            Room 204, Design Building / Virtual link available
          </div>
          <div className="flex items-center gap-3 text-[14px] text-[#495057]">
            <Users className="w-5 h-5 text-[#adb5bd]" />
            42 attending
          </div>
        </div>

        <p className="text-[14px] text-[#495057] leading-relaxed mb-8">
          A hands-on session exploring component architecture and token systems.
          Bring your current design work — we'll be doing live critiques and
          building out a shared token library together.
        </p>

        <div className="flex gap-3">
          {status === 'going' ?
          <div className="flex-1 flex flex-col items-center">
              <button className="w-full h-[44px] bg-[#16a34a] text-white rounded-[8px] font-medium flex items-center justify-center gap-2 cursor-default">
                Going <Check className="w-4 h-4" />
              </button>
              <button className="mt-2 text-[13px] font-medium text-[#228be6] hover:underline">
                Add to Calendar
              </button>
            </div> :

          <>
              <button
              onClick={handleGoing}
              className="flex-1 h-[44px] bg-[#228be6] text-white rounded-[8px] font-medium hover:bg-[#1c7ed6] transition-colors">
              
                Going
              </button>
              <button
              onClick={() => setStatus('maybe')}
              className={`flex-1 h-[44px] border rounded-[8px] font-medium transition-colors ${status === 'maybe' ? 'bg-[#f8f9fa] border-[#212529] text-[#212529]' : 'bg-white border-[#dee2e6] text-[#495057] hover:bg-[#f8f9fa]'}`}>
              
                Maybe
              </button>
              <button
              onClick={() => setStatus('cant')}
              className={`flex-1 h-[44px] border rounded-[8px] font-medium transition-colors ${status === 'cant' ? 'bg-[#f8f9fa] border-[#212529] text-[#212529]' : 'bg-white border-[#dee2e6] text-[#495057] hover:bg-[#f8f9fa]'}`}>
              
                Can't Go
              </button>
            </>
          }
        </div>
      </div>
    </>);

}
function OrgDetailModal({
  onClose,
  payload



}: {onClose: () => void;payload: OrgDetailPayload | null;}) {
  const handleNoThanks = () => {
    payload?.onDecline();
    onClose();
  };
  return (
    <>
      <div className="h-40 bg-[#e9ecef] relative">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=240&fit=crop"
          alt="Design Mentors Network banner"
          className="w-full h-full object-cover" />
        
      </div>
      <div className="p-6 overflow-y-auto">
        <h2 className="text-[20px] font-bold text-[#212529] mb-1">
          Design Mentors Network
        </h2>
        <div className="flex items-center gap-1.5 text-[13px] text-[#868e96] mb-4">
          <Users className="w-4 h-4" />
          142 members · Founded 2019
        </div>
        <p className="text-[14px] text-[#495057] leading-relaxed mb-6">
          A global community of senior designers helping the next generation of
          UX talent. Members get access to weekly portfolio reviews, structured
          mentorship pairings, monthly community events, and a curated job
          board. Mentees are paired with industry mentors based on goals and
          learning style.
        </p>

        <h3 className="text-[12px] font-bold uppercase text-[#868e96] tracking-wide mb-3">
          What you get
        </h3>
        <ul className="flex flex-col gap-2 mb-6">
          <li className="flex items-start gap-2 text-[14px] text-[#495057]">
            <Check className="w-4 h-4 text-[#16a34a] mt-0.5 shrink-0" />
            Weekly portfolio reviews
          </li>
          <li className="flex items-start gap-2 text-[14px] text-[#495057]">
            <Check className="w-4 h-4 text-[#16a34a] mt-0.5 shrink-0" />
            Mentor pairing within 7 days
          </li>
          <li className="flex items-start gap-2 text-[14px] text-[#495057]">
            <Check className="w-4 h-4 text-[#16a34a] mt-0.5 shrink-0" />
            Access to community events and job board
          </li>
        </ul>

        <h3 className="text-[12px] font-bold uppercase text-[#868e96] tracking-wide mb-3">
          Admins
        </h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-[32px] h-[32px] rounded-full bg-[#d0ebff] flex items-center justify-center text-[#228be6] text-[12px] font-bold shrink-0">
              SW
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#212529]">
                Dr. Sarah Williams
              </div>
              <div className="text-[11px] text-[#868e96]">Founder</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-[32px] h-[32px] rounded-full bg-[#e9ecef] flex items-center justify-center text-[#495057] text-[12px] font-bold shrink-0">
              MR
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#212529]">
                Marcus Reyes
              </div>
              <div className="text-[11px] text-[#868e96]">Community Lead</div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 py-4 border-t border-[#e9ecef] flex justify-end gap-3">
        <button
          onClick={() => {
            payload?.onDecline();
            onClose();
          }}
          className="h-[40px] px-4 text-[13px] font-medium text-[#495057] bg-white border border-[#dee2e6] rounded-[8px] hover:bg-[#f8f9fa] transition-colors">
          
          No thanks
        </button>
        <button
          onClick={() => {
            payload?.onJoin();
            onClose();
          }}
          className="h-[40px] px-4 text-[13px] font-medium text-white bg-[#228be6] rounded-[8px] hover:bg-[#1c7ed6] transition-colors">
          
          Join Organization
        </button>
      </div>
    </>);

}
function ProgramDetailModal({
  onClose,
  payload



}: {onClose: () => void;payload: ProgramDetailPayload | null;}) {
  const handleNoThanks = () => {
    payload?.onDecline();
    onClose();
  };
  return (
    <>
      <div className="h-40 bg-[#e9ecef] relative">
        <img
          src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=240&fit=crop"
          alt="UX Research Intensive banner"
          className="w-full h-full object-cover" />
        
      </div>
      <div className="p-6 overflow-y-auto">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wide text-[#0ca678] bg-[#e6fcf5] px-2 py-0.5 rounded-[4px]">
            Program
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wide text-[#228be6] bg-[#e7f5ff] px-2 py-0.5 rounded-[4px]">
            Enrollment Open
          </span>
        </div>
        <h2 className="text-[20px] font-bold text-[#212529] mb-1">
          UX Research Intensive
        </h2>
        <p className="text-[13px] text-[#868e96] mb-4">
          Design Mentors Network · 8 weeks · 24 spots
        </p>
        <p className="text-[14px] text-[#495057] leading-relaxed mb-6">
          A focused 8-week program for mentees who want to deepen their research
          craft. Each week pairs a structured workshop with applied practice on
          a real project. Members leave with a portfolio-ready research case
          study and a network of peers.
        </p>

        <h3 className="text-[12px] font-bold uppercase text-[#868e96] tracking-wide mb-3">
          What the program offers
        </h3>
        <ul className="flex flex-col gap-2 mb-6">
          <li className="flex items-start gap-2 text-[14px] text-[#495057]">
            <Check className="w-4 h-4 text-[#16a34a] mt-0.5 shrink-0" />8 weekly
            research workshops with senior practitioners
          </li>
          <li className="flex items-start gap-2 text-[14px] text-[#495057]">
            <Check className="w-4 h-4 text-[#16a34a] mt-0.5 shrink-0" />
            1:1 mentor pairing with weekly check-ins
          </li>
          <li className="flex items-start gap-2 text-[14px] text-[#495057]">
            <Check className="w-4 h-4 text-[#16a34a] mt-0.5 shrink-0" />A
            real-world research project with shipping deliverables
          </li>
          <li className="flex items-start gap-2 text-[14px] text-[#495057]">
            <Check className="w-4 h-4 text-[#16a34a] mt-0.5 shrink-0" />
            Final portfolio review with the program leads
          </li>
        </ul>

        <h3 className="text-[12px] font-bold uppercase text-[#868e96] tracking-wide mb-3">
          Program leads
        </h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-[32px] h-[32px] rounded-full bg-[#d0ebff] flex items-center justify-center text-[#228be6] text-[12px] font-bold shrink-0">
              SW
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#212529]">
                Dr. Sarah Williams
              </div>
              <div className="text-[11px] text-[#868e96]">Program Director</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-[32px] h-[32px] rounded-full bg-[#e9ecef] flex items-center justify-center text-[#495057] text-[12px] font-bold shrink-0">
              EL
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#212529]">
                Elena Liu
              </div>
              <div className="text-[11px] text-[#868e96]">Research Lead</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-[32px] h-[32px] rounded-full bg-[#e9ecef] flex items-center justify-center text-[#495057] text-[12px] font-bold shrink-0">
              MR
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#212529]">
                Marcus Reyes
              </div>
              <div className="text-[11px] text-[#868e96]">Workshop Lead</div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 py-4 border-t border-[#e9ecef] flex justify-end gap-3">
        <button
          onClick={() => {
            payload?.onDecline();
            onClose();
          }}
          className="h-[40px] px-4 text-[13px] font-medium text-[#495057] bg-white border border-[#dee2e6] rounded-[8px] hover:bg-[#f8f9fa] transition-colors">
          
          No thanks
        </button>
        <button
          onClick={() => {
            payload?.onApply();
            onClose();
          }}
          className="h-[40px] px-4 text-[13px] font-medium text-white bg-[#228be6] rounded-[8px] hover:bg-[#1c7ed6] transition-colors">
          
          Apply Now
        </button>
      </div>
    </>);

}
function MentorDetailModal({ onClose }: {onClose: () => void;}) {
  const { showToast } = useCta();
  return (
    <>
      <div className="px-6 pt-6 pb-4 border-b border-[#e9ecef] flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-[64px] h-[64px] rounded-full bg-[#e9ecef] flex items-center justify-center text-[#495057] text-[20px] font-bold shrink-0">
            DP
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-[#212529]">David Park</h2>
            <p className="text-[14px] text-[#495057] mt-0.5">
              Senior UX Designer at Figma
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-[#868e96] hover:text-[#212529] p-1 rounded-full hover:bg-[#f8f9fa] transition-colors">
          
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-6 overflow-y-auto flex flex-col gap-6">
        <div>
          <h3 className="text-[12px] font-bold uppercase text-[#868e96] tracking-wide mb-2">
            About me
          </h3>
          <p className="text-[14px] text-[#495057] leading-relaxed">
            I am a product designer with a passion for design systems and
            accessibility. I love mentoring junior designers and helping them
            navigate their early careers.
          </p>
        </div>
        <div>
          <h3 className="text-[12px] font-bold uppercase text-[#868e96] tracking-wide mb-2">
            Degree
          </h3>
          <p className="text-[14px] text-[#495057]">
            B.S. Human-Computer Interaction, Carnegie Mellon University
          </p>
        </div>
        <div>
          <h3 className="text-[12px] font-bold uppercase text-[#868e96] tracking-wide mb-2">
            Role
          </h3>
          <p className="text-[14px] text-[#495057]">Senior UX Designer</p>
        </div>
        <div>
          <h3 className="text-[12px] font-bold uppercase text-[#868e96] tracking-wide mb-2">
            Organization
          </h3>
          <p className="text-[14px] text-[#495057]">Design Mentors Network</p>
        </div>
      </div>
      <div className="px-6 py-4 border-t border-[#e9ecef] flex justify-end gap-3">
        <button
          onClick={onClose}
          className="h-[40px] px-4 text-[13px] font-medium text-[#495057] bg-white border border-[#dee2e6] rounded-[8px] hover:bg-[#f8f9fa] transition-colors">
          
          Close
        </button>
        <button
          onClick={() => {
            showToast({
              icon: 'check',
              title: 'Match request sent'
            });
            onClose();
          }}
          className="h-[40px] px-4 text-[13px] font-medium text-white bg-[#228be6] rounded-[8px] hover:bg-[#1c7ed6] transition-colors">
          
          Send Match Request
        </button>
      </div>
    </>);

}
function FindMentorModal({ onClose }: {onClose: () => void;}) {
  return (
    <>
      <div className="px-6 pt-6 pb-4 border-b border-[#e9ecef] flex justify-between items-start">
        <div>
          <h2 className="text-[20px] font-bold text-[#212529]">
            Find a Mentor
          </h2>
          <p className="text-[14px] text-[#495057] mt-1">
            Browse available mentors in your organization and send a match
            request.
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-[#868e96] hover:text-[#212529] p-1 rounded-full hover:bg-[#f8f9fa] transition-colors">
          
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-6 overflow-y-auto flex flex-col gap-4">
        {/* Mentor 1 */}
        <div className="border border-[#dee2e6] rounded-[8px] p-4 flex items-start gap-4">
          <div className="w-[48px] h-[48px] rounded-full bg-[#e9ecef] flex items-center justify-center text-[#495057] text-[16px] font-bold shrink-0">
            DP
          </div>
          <div className="flex-1">
            <h3 className="text-[16px] font-bold text-[#212529]">David Park</h3>
            <p className="text-[14px] text-[#495057]">
              Senior UX Designer at Figma
            </p>
            <div className="flex flex-wrap gap-2 mt-2 mb-3">
              <span className="px-2 py-0.5 bg-[#f8f9fa] border border-[#dee2e6] rounded-[4px] text-[11px] text-[#495057]">
                Design Systems
              </span>
              <span className="px-2 py-0.5 bg-[#f8f9fa] border border-[#dee2e6] rounded-[4px] text-[11px] text-[#495057]">
                Accessibility
              </span>
            </div>
            <button className="h-[32px] px-4 text-[13px] font-medium text-[#228be6] border border-[#228be6] rounded-[4px] hover:bg-[#e7f5ff] transition-colors">
              View Profile
            </button>
          </div>
        </div>
        {/* Mentor 2 */}
        <div className="border border-[#dee2e6] rounded-[8px] p-4 flex items-start gap-4">
          <div className="w-[48px] h-[48px] rounded-full bg-[#e9ecef] flex items-center justify-center text-[#495057] text-[16px] font-bold shrink-0">
            ML
          </div>
          <div className="flex-1">
            <h3 className="text-[16px] font-bold text-[#212529]">Marcus Lee</h3>
            <p className="text-[14px] text-[#495057]">
              Senior Product Designer at Meta
            </p>
            <div className="flex flex-wrap gap-2 mt-2 mb-3">
              <span className="px-2 py-0.5 bg-[#f8f9fa] border border-[#dee2e6] rounded-[4px] text-[11px] text-[#495057]">
                Product Strategy
              </span>
              <span className="px-2 py-0.5 bg-[#f8f9fa] border border-[#dee2e6] rounded-[4px] text-[11px] text-[#495057]">
                Interaction Design
              </span>
            </div>
            <button className="h-[32px] px-4 text-[13px] font-medium text-[#228be6] border border-[#228be6] rounded-[4px] hover:bg-[#e7f5ff] transition-colors">
              View Profile
            </button>
          </div>
        </div>
      </div>
      <div className="px-6 py-4 border-t border-[#e9ecef] flex items-center justify-between">
        <button
          onClick={onClose}
          className="text-[14px] font-medium text-[#868e96] hover:text-[#495057]">
          
          Cancel
        </button>
        <button className="h-[40px] px-6 bg-[#228be6] text-white rounded-[8px] font-medium hover:bg-[#1c7ed6] transition-colors">
          Browse All Mentors
        </button>
      </div>
    </>);

}
function JoinOrgModal({ onClose }: {onClose: () => void;}) {
  return (
    <>
      <div className="px-6 pt-6 pb-4 border-b border-[#e9ecef] flex justify-between items-start">
        <div>
          <h2 className="text-[20px] font-bold text-[#212529]">
            Find Your Community
          </h2>
          <p className="text-[14px] text-[#495057] mt-1">
            Browse organizations at your university that match your interests.
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-[#868e96] hover:text-[#212529] p-1 rounded-full hover:bg-[#f8f9fa] transition-colors">
          
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-6 overflow-y-auto">
        <div className="relative mb-6">
          <Search className="w-5 h-5 text-[#adb5bd] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search organizations..."
            className="w-full h-[40px] pl-10 pr-4 bg-[#f8f9fa] border border-[#dee2e6] rounded-[8px] text-[14px] focus:outline-none focus:border-[#228be6] focus:bg-white transition-colors" />
          
        </div>
        <div className="flex flex-col gap-4">
          {/* Org 1 */}
          <div className="border border-[#dee2e6] rounded-[8px] p-4 flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-bold text-[#212529]">
                Design Mentors Network
              </h3>
              <p className="text-[14px] text-[#495057] mt-0.5">
                A global community of senior designers
              </p>
              <p className="text-[12px] text-[#868e96] mt-1">142 members</p>
            </div>
            <button className="h-[32px] px-4 text-[13px] font-medium text-white bg-[#228be6] rounded-[4px] hover:bg-[#1c7ed6] transition-colors">
              Join
            </button>
          </div>
          {/* Org 2 */}
          <div className="border border-[#dee2e6] rounded-[8px] p-4 flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-bold text-[#212529]">
                Product Management Club
              </h3>
              <p className="text-[14px] text-[#495057] mt-0.5">
                Connect with PMs across industries
              </p>
              <p className="text-[12px] text-[#868e96] mt-1">98 members</p>
            </div>
            <button className="h-[32px] px-4 text-[13px] font-medium text-white bg-[#228be6] rounded-[4px] hover:bg-[#1c7ed6] transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="px-6 py-4 border-t border-[#e9ecef] flex items-center justify-between">
        <button
          onClick={onClose}
          className="text-[14px] font-medium text-[#868e96] hover:text-[#495057]">
          
          Cancel
        </button>
        <button className="h-[40px] px-6 bg-[#228be6] text-white rounded-[8px] font-medium hover:bg-[#1c7ed6] transition-colors">
          Browse All Organizations
        </button>
      </div>
    </>);

}
function UpdateProgressModal({ onClose }: {onClose: () => void;}) {
  const [step3Complete, setStep3Complete] = useState(false);
  const [note, setNote] = useState('');
  return (
    <>
      <div className="px-6 pt-6 pb-4 border-b border-[#e9ecef] flex justify-between items-start">
        <div>
          <h2 className="text-[20px] font-bold text-[#212529]">
            Update Your Goal
          </h2>
          <div className="mt-2 inline-block bg-[#f1f3f5] px-3 py-1 rounded-full text-[13px] font-medium text-[#495057]">
            Build UX Portfolio
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-[#868e96] hover:text-[#212529] p-1 rounded-full hover:bg-[#f8f9fa] transition-colors">
          
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-6 overflow-y-auto">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#16a34a]" />
            <span className="text-[14px] text-[#495057] line-through">
              Step 1: Complete case study #1
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#16a34a]" />
            <span className="text-[14px] text-[#495057] line-through">
              Step 2: Complete case study #2
            </span>
          </div>
          <div className="flex items-center justify-between p-3 border border-[#dee2e6] rounded-[8px] bg-[#f8f9fa]">
            <div className="flex items-center gap-3">
              {step3Complete ?
              <CheckCircle2 className="w-5 h-5 text-[#16a34a]" /> :

              <div className="w-5 h-5 rounded-full border-2 border-[#adb5bd]" />
              }
              <span
                className={`text-[14px] font-medium ${step3Complete ? 'text-[#495057] line-through' : 'text-[#212529]'}`}>
                
                Step 3: Submit final presentation
              </span>
            </div>
            {!step3Complete &&
            <button
              onClick={() => setStep3Complete(true)}
              className="text-[13px] font-medium text-[#228be6] hover:underline">
              
                Mark Complete
              </button>
            }
          </div>
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note about your progress..."
          className="w-full h-[100px] p-3 border border-[#dee2e6] rounded-[8px] text-[14px] resize-none focus:outline-none focus:border-[#228be6]" />
        
      </div>
      <div className="px-6 py-4 border-t border-[#e9ecef] flex items-center justify-between">
        <button
          onClick={onClose}
          className="text-[14px] font-medium text-[#868e96] hover:text-[#495057]">
          
          Cancel
        </button>
        <button
          onClick={onClose}
          className="h-[40px] px-6 bg-[#228be6] text-white rounded-[8px] font-medium hover:bg-[#1c7ed6] transition-colors">
          
          Add Update
        </button>
      </div>
    </>);

}
function ScheduleSessionModal({ onClose }: {onClose: () => void;}) {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [duration, setDuration] = useState(30);
  const { showToast } = useCta();
  const handleConfirm = () => {
    showToast({
      icon: 'calendar',
      title: 'Session scheduled',
      subtitle: 'Invitation sent to Jordan Chen'
    });
    onClose();
  };
  return (
    <>
      <div className="px-6 pt-6 pb-4 border-b border-[#e9ecef] flex justify-between items-start">
        <div>
          <h2 className="text-[20px] font-bold text-[#212529]">
            Schedule a Session
          </h2>
          <p className="text-[14px] text-[#495057] mt-1">with Jordan Chen</p>
        </div>
        <button
          onClick={onClose}
          className="text-[#868e96] hover:text-[#212529] p-1 rounded-full hover:bg-[#f8f9fa] transition-colors">
          
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-6 overflow-y-auto">
        <div className="flex flex-col gap-3 mb-6">
          {/* Slot 1 */}
          <label
            className={`flex items-center justify-between p-4 border rounded-[8px] cursor-pointer transition-colors ${selectedSlot === 1 ? 'border-[#228be6] bg-[#e7f5ff]' : 'border-[#dee2e6] hover:bg-[#f8f9fa]'}`}>
            
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedSlot === 1 ? 'border-[#228be6]' : 'border-[#adb5bd]'}`}>
                
                {selectedSlot === 1 &&
                <div className="w-2.5 h-2.5 rounded-full bg-[#228be6]" />
                }
              </div>
              <div>
                <div className="text-[15px] font-bold text-[#212529]">
                  Thursday, Apr 17
                </div>
                <div className="text-[13px] text-[#868e96]">
                  2:00 PM – 3:00 PM
                </div>
              </div>
            </div>
            <span className="text-[12px] font-medium text-[#16a34a] bg-[#dcfce7] px-2 py-1 rounded-[4px]">
              Works for both of you
            </span>
          </label>
          {/* Slot 2 */}
          <label
            className={`flex items-center justify-between p-4 border rounded-[8px] cursor-pointer transition-colors ${selectedSlot === 2 ? 'border-[#228be6] bg-[#e7f5ff]' : 'border-[#dee2e6] hover:bg-[#f8f9fa]'}`}>
            
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedSlot === 2 ? 'border-[#228be6]' : 'border-[#adb5bd]'}`}>
                
                {selectedSlot === 2 &&
                <div className="w-2.5 h-2.5 rounded-full bg-[#228be6]" />
                }
              </div>
              <div>
                <div className="text-[15px] font-bold text-[#212529]">
                  Friday, Apr 18
                </div>
                <div className="text-[13px] text-[#868e96]">
                  10:00 AM – 11:00 AM
                </div>
              </div>
            </div>
            <span className="text-[12px] font-medium text-[#495057] bg-[#f8f9fa] border border-[#dee2e6] px-2 py-1 rounded-[4px]">
              Jordan available
            </span>
          </label>
          {/* Slot 3 */}
          <label
            className={`flex items-center justify-between p-4 border rounded-[8px] cursor-pointer transition-colors ${selectedSlot === 3 ? 'border-[#228be6] bg-[#e7f5ff]' : 'border-[#dee2e6] hover:bg-[#f8f9fa]'}`}>
            
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedSlot === 3 ? 'border-[#228be6]' : 'border-[#adb5bd]'}`}>
                
                {selectedSlot === 3 &&
                <div className="w-2.5 h-2.5 rounded-full bg-[#228be6]" />
                }
              </div>
              <div>
                <div className="text-[15px] font-bold text-[#212529]">
                  Monday, Apr 21
                </div>
                <div className="text-[13px] text-[#868e96]">
                  3:00 PM – 4:00 PM
                </div>
              </div>
            </div>
            <span className="text-[12px] font-medium text-[#495057] bg-[#f8f9fa] border border-[#dee2e6] px-2 py-1 rounded-[4px]">
              Jordan available
            </span>
          </label>
        </div>

        <div>
          <p className="text-[14px] font-medium text-[#212529] mb-3">
            Session duration
          </p>
          <div className="flex gap-2">
            {[30, 45, 60].map((mins) =>
            <button
              key={mins}
              onClick={() => setDuration(mins)}
              className={`flex-1 h-[36px] text-[13px] font-medium rounded-[4px] border transition-colors ${duration === mins ? 'bg-[#228be6] text-white border-[#228be6]' : 'bg-white text-[#495057] border-[#dee2e6] hover:bg-[#f8f9fa]'}`}>
              
                {mins} min
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="px-6 py-4 border-t border-[#e9ecef] flex items-center justify-between">
        <button
          onClick={onClose}
          className="text-[14px] font-medium text-[#868e96] hover:text-[#495057]">
          
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          disabled={!selectedSlot}
          className={`h-[40px] px-6 text-white rounded-[8px] font-medium transition-colors ${selectedSlot ? 'bg-[#228be6] hover:bg-[#1c7ed6]' : 'bg-[#228be6] opacity-50 cursor-not-allowed'}`}>
          
          Confirm Session
        </button>
      </div>
    </>);

}
function Toast({ toast }: {toast: ToastProps;}) {
  return (
    <div className="fixed top-6 right-6 z-[200] bg-white border border-[#dee2e6] rounded-[8px] shadow-lg p-4 flex items-start gap-3 animate-in slide-in-from-top-4 fade-in duration-300">
      {toast.icon === 'check' &&
      <CheckCircle2 className="w-5 h-5 text-[#16a34a] shrink-0" />
      }
      {toast.icon === 'calendar' &&
      <Calendar className="w-5 h-5 text-[#228be6] shrink-0" />
      }
      <div>
        <h4 className="text-[14px] font-bold text-[#212529]">{toast.title}</h4>
        {toast.subtitle &&
        <p className="text-[13px] text-[#495057] mt-0.5">{toast.subtitle}</p>
        }
      </div>
    </div>);

}
function CtaRoot({
  activeModal,
  chatMode,
  toast,
  onClose,
  confirmPairingPayload,
  orgDetailPayload,
  programDetailPayload








}: {activeModal: string | null;chatMode: ChatMode;toast: ToastProps | null;onClose: () => void;confirmPairingPayload: ConfirmPairingPayload | null;orgDetailPayload: OrgDetailPayload | null;programDetailPayload: ProgramDetailPayload | null;}) {
  return (
    <>
      {toast && <Toast toast={toast} />}
      {activeModal === 'chat' &&
      <div className="fixed bottom-4 right-4 z-[100] w-[calc(100%-2rem)] max-w-[400px] bg-white rounded-[12px] shadow-2xl border border-[#dee2e6] overflow-hidden flex flex-col">
          <ChatModal mode={chatMode} onClose={onClose} />
        </div>
      }
      {activeModal && activeModal !== 'chat' &&
      <ModalWrapper onClose={onClose}>
          {activeModal === 'confirmPairing' &&
        <ConfirmPairingModal
          onClose={onClose}
          payload={confirmPairingPayload} />

        }
          {activeModal === 'rsvp' && <RsvpModal onClose={onClose} />}
          {activeModal === 'orgDetail' &&
        <OrgDetailModal onClose={onClose} payload={orgDetailPayload} />
        }
          {activeModal === 'programDetail' &&
        <ProgramDetailModal
          onClose={onClose}
          payload={programDetailPayload} />

        }
          {activeModal === 'mentorDetail' &&
        <MentorDetailModal onClose={onClose} />
        }
          {activeModal === 'updateProgress' &&
        <UpdateProgressModal onClose={onClose} />
        }
          {activeModal === 'scheduleSession' &&
        <ScheduleSessionModal onClose={onClose} />
        }
        </ModalWrapper>
      }
    </>);

}