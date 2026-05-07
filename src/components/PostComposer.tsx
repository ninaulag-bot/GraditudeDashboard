import React, { useState } from 'react';
import { Check, X, ImageIcon, Upload } from 'lucide-react';
import { useCta } from './CtaModals';
export type UserRole = 'admin' | 'mentor' | 'mentee';
interface PostComposerProps {
  userRole: UserRole;
  onClose?: () => void;
}
const DESTINATIONS = {
  university: [
  {
    id: 'stanford',
    label: 'Stanford University',
    subtitle: '(University-wide)'
  }],

  organizations: [
  {
    id: 'pm_club',
    label: 'Product Management Club'
  },
  {
    id: 'wit_fellowship',
    label: 'Women in Tech Fellowship'
  }],

  programs: [
  {
    id: 'pm_mentorship',
    label: 'PM Mentorship Program'
  },
  {
    id: 'biz_analytics',
    label: 'Business Analytics Program'
  }]

};
function CustomCheckbox({
  checked,
  disabled



}: {checked: boolean;disabled?: boolean;}) {
  return (
    <div
      className={`w-6 h-6 rounded-[4px] flex items-center justify-center shrink-0 transition-colors ${checked ? 'bg-[#1A202C] border border-[#1A202C]' : 'bg-white border border-[#ced4da]'} ${disabled ? 'opacity-50' : ''}`}>
      
      {checked && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
    </div>);

}
function Step2Content({
  userRole,
  selected,
  postText,
  setPostText,
  onRemoveDestination,
  onBack,
  onClose,
  getDestinationLabel









}: {userRole: UserRole;selected: string[];postText: string;setPostText: (text: string) => void;onRemoveDestination: (id: string) => void;onBack: () => void;onClose?: () => void;getDestinationLabel: (id: string) => string;}) {
  const [showUpload, setShowUpload] = useState(true);
  const { submitPost } = useCta();
  const isPostDisabled = postText.trim().length === 0 || selected.length === 0;
  const handlePost = () => {
    submitPost(postText);
    onClose?.();
  };
  return (
    <div className="flex flex-col px-6 pb-6">
      {/* Role annotation */}
      {(userRole === 'mentor' || userRole === 'mentee') &&
      <div className="mb-4">
          <span className="text-[11px] font-medium text-[#868e96] uppercase tracking-wide bg-[#f8f9fa] px-2 py-1 rounded">
            Mentor / Mentee view only
          </span>
        </div>
      }

      {/* Selected Destinations Chips */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selected.map((id) =>
        <div
          key={id}
          className="flex items-center gap-2 px-4 py-2 border border-[#dee2e6] rounded-full text-[14px] text-[#495057] bg-white">
          
            <span>{getDestinationLabel(id)}</span>
            <button
            onClick={() => onRemoveDestination(id)}
            className="text-[#868e96] hover:text-[#212529] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6CB0] rounded-full"
            aria-label={`Remove ${getDestinationLabel(id)}`}>
            
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Warning if no destinations */}
      {selected.length === 0 &&
      <p className="text-[13px] text-[#e53e3e] mb-2" role="alert">
          Please select at least one destination to post
        </p>
      }

      {/* Text Area Card */}
      <div className="mt-4 mb-4 border border-[#e2e8f0] rounded-[8px] bg-[#f8f9fa] overflow-hidden">
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="Write something..."
          className="w-full h-[160px] p-4 bg-transparent resize-none text-[15px] text-[#212529] placeholder-[#A0AEC0] focus:outline-none border-none"
          maxLength={2000} />
        
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#e2e8f0]">
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="flex items-center gap-2 text-[13px] text-[#868e96] hover:text-[#495057] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6CB0] rounded-[4px]">
            
            <ImageIcon className="w-4 h-4" />
            Add media
          </button>
          <div className="text-[13px] text-[#A0AEC0]">
            {postText.length} / 2000
          </div>
        </div>
      </div>

      {/* Upload Area */}
      {showUpload &&
      <div className="mb-6 border border-dashed border-[#dee2e6] rounded-[12px] bg-white p-5 flex items-center gap-4 cursor-pointer hover:border-[#ced4da] transition-colors">
          <div className="w-[48px] h-[48px] rounded-full bg-[#f1f3f5] flex items-center justify-center shrink-0">
            <Upload className="w-5 h-5 text-[#868e96]" />
          </div>
          <div>
            <p className="text-[15px] font-semibold text-[#212529]">
              Upload photo or file
            </p>
            <p className="text-[13px] text-[#868e96] mt-0.5">
              JPG, PNG, PDF up to 10MB
            </p>
          </div>
        </div>
      }

      {/* Footer */}
      <div className="flex items-center gap-4">
        <button
          disabled={isPostDisabled}
          onClick={handlePost}
          className={`bg-[#228be6] text-white h-[40px] px-5 rounded-[6px] text-[14px] font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#228be6] ${isPostDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#1c7ed6]'}`}>
          
          Post
        </button>
        <button
          onClick={onClose}
          className="text-[14px] font-medium text-[#868e96] hover:text-[#495057] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6CB0] rounded-[4px] px-2 py-1">
          
          Cancel
        </button>
      </div>
    </div>);

}
export function PostComposerCard({ userRole, onClose }: PostComposerProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selected, setSelected] = useState<string[]>(
    userRole === 'admin' ? ['stanford'] : []
  );
  const [postText, setPostText] = useState('');
  const handleToggle = (id: string) => {
    setSelected((prev) =>
    prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const handleRemoveDestination = (id: string) => {
    setSelected((prev) => prev.filter((item) => item !== id));
    if (selected.length === 1) {
      setStep(1);
    }
  };
  const getDestinationLabel = (id: string) => {
    for (const category of Object.values(DESTINATIONS)) {
      const found = category.find((item) => item.id === id);
      if (found) return found.label;
    }
    return '';
  };
  const isContinueDisabled = selected.length === 0;
  const isPostDisabled = postText.trim().length === 0;
  return (
    <div className="bg-white rounded-[12px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-full max-w-[520px] flex flex-col border border-[#e2e8f0]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <div className="text-[13px] font-medium text-[#718096]">
          Step {step} of 2
        </div>
        {onClose &&
        <button
          onClick={onClose}
          className="text-[#A0AEC0] hover:text-[#4A5568] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6CB0] rounded-full p-1"
          aria-label="Close modal">
          
            <X className="w-5 h-5" />
          </button>
        }
      </div>

      {step === 1 ?
      <div className="flex flex-col px-6 pb-6">
          {/* Top Input Mock */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-[40px] h-[40px] rounded-full bg-[#e9ecef] flex items-center justify-center text-[#495057] text-[14px] font-medium shrink-0">
              ME
            </div>
            <div className="text-[16px] text-[#718096]">Share something...</div>
          </div>

          {/* Sections */}
          <div className="flex flex-col gap-6">
            {/* University */}
            <div className="border-t border-[#E2E8F0] pt-5">
              <h3 className="text-[13px] font-bold uppercase text-[#4A5568] mb-4 tracking-wide">
                University
              </h3>
              {DESTINATIONS.university.map((item) => {
              const isDisabled =
              userRole !== 'admin' && item.id === 'stanford';
              const isChecked = selected.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="relative group inline-block w-full">
                  
                    <button
                    type="button"
                    role="checkbox"
                    aria-checked={isChecked}
                    disabled={isDisabled}
                    onClick={() => handleToggle(item.id)}
                    className={`flex items-start gap-4 text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6CB0] rounded-[4px] p-1 -ml-1 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                    
                      <CustomCheckbox
                      checked={isChecked}
                      disabled={isDisabled} />
                    
                      <div>
                        <div className="text-[16px] font-medium text-[#212529]">
                          {item.label}
                        </div>
                        {item.subtitle &&
                      <div className="text-[14px] text-[#718096] mt-0.5">
                            {item.subtitle}
                          </div>
                      }
                      </div>
                    </button>

                    {/* Tooltip */}
                    {isDisabled &&
                  <div className="absolute bottom-full left-8 mb-2 hidden group-hover:block z-10 pointer-events-none">
                        <div className="bg-[#1A202C] text-white text-[12px] px-3 py-1.5 rounded-[6px] whitespace-nowrap shadow-lg">
                          Only admins can post university-wide
                          <div className="absolute top-full left-4 border-4 border-transparent border-t-[#1A202C]"></div>
                        </div>
                      </div>
                  }
                  </div>);

            })}
            </div>

            {/* Organizations */}
            <div>
              <h3 className="text-[13px] font-bold uppercase text-[#4A5568] mb-4 tracking-wide">
                Organizations
              </h3>
              <div className="flex flex-col gap-4">
                {DESTINATIONS.organizations.map((item) =>
              <button
                key={item.id}
                type="button"
                role="checkbox"
                aria-checked={selected.includes(item.id)}
                onClick={() => handleToggle(item.id)}
                className="flex items-center gap-4 text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6CB0] rounded-[4px] p-1 -ml-1 cursor-pointer">
                
                    <CustomCheckbox checked={selected.includes(item.id)} />
                    <div className="text-[16px] font-medium text-[#212529]">
                      {item.label}
                    </div>
                  </button>
              )}
              </div>
            </div>

            {/* Programs */}
            <div>
              <h3 className="text-[13px] font-bold uppercase text-[#4A5568] mb-4 tracking-wide">
                Programs
              </h3>
              <div className="flex flex-col gap-4">
                {DESTINATIONS.programs.map((item) =>
              <button
                key={item.id}
                type="button"
                role="checkbox"
                aria-checked={selected.includes(item.id)}
                onClick={() => handleToggle(item.id)}
                className="flex items-center gap-4 text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6CB0] rounded-[4px] p-1 -ml-1 cursor-pointer">
                
                    <CustomCheckbox checked={selected.includes(item.id)} />
                    <div className="text-[16px] font-medium text-[#212529]">
                      {item.label}
                    </div>
                  </button>
              )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-[#E2E8F0] mt-8 pt-6 flex justify-end">
            <button
            onClick={() => setStep(2)}
            disabled={isContinueDisabled}
            className={`bg-[#228be6] text-white h-[44px] px-6 rounded-[8px] font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#228be6] ${isContinueDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1c7ed6]'}`}>
            
              Continue
            </button>
          </div>
        </div> :

      <Step2Content
        userRole={userRole}
        selected={selected}
        postText={postText}
        setPostText={setPostText}
        onRemoveDestination={handleRemoveDestination}
        onBack={() => setStep(1)}
        onClose={onClose}
        getDestinationLabel={getDestinationLabel} />

      }
    </div>);

}
export function PostComposerModal({
  isOpen,
  onClose,
  userRole




}: {isOpen: boolean;onClose: () => void;userRole: UserRole;}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div
        className="fixed inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true" />
      
      <div className="relative z-10 w-full max-w-[520px] bg-white rounded-t-[16px] sm:rounded-none overflow-hidden sm:overflow-visible">
        <PostComposerCard userRole={userRole} onClose={onClose} />
      </div>
    </div>);

}