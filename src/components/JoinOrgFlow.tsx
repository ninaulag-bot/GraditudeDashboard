import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  X,
  Users,
  BookOpen,
  Briefcase,
  Wrench,
  Stethoscope,
  ArrowLeft } from
'lucide-react';
interface JoinOrgFlowProps {
  joinedOrgs: string[];
  onJoinOrg: (orgId: string) => void;
  onNavigateToDashboard: () => void;
}
type Step = 'university' | 'organizations';
type Category =
'Computer Science' |
'Business' |
'Engineering' |
'Arts & Humanities' |
'Medicine & Health' |
null;
type EducationLevel = 'Undergraduate' | 'Graduate' | 'PhD' | null;
const CATEGORIES = [
'Computer Science',
'Business',
'Engineering',
'Arts & Humanities',
'Medicine & Health'] as
const;
const EDUCATION_LEVELS = ['Undergraduate', 'Graduate', 'PhD'] as const;
const ORGANIZATIONS = [
{
  id: 'cs-women',
  name: 'Computer Science Student Association for Women',
  members: 142,
  description:
  'A community for CS students to collaborate, learn, and network with industry professionals.',
  category: 'Computer Science',
  image:
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=400&fit=crop',
  icon: BookOpen
},
{
  id: 'business-leaders',
  name: 'Business Leaders of Tomorrow',
  members: 98,
  description:
  'Preparing future business leaders through mentorship, case competitions, and networking events.',
  category: 'Business',
  image:
  'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?w=400&h=400&fit=crop',
  icon: Briefcase
},
{
  id: 'engineering-lab',
  name: 'Engineering Innovation Lab',
  members: 75,
  description:
  'A collaborative space for engineering students to work on innovative projects and research.',
  category: 'Engineering',
  image:
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop',
  icon: Wrench
},
{
  id: 'medical-students',
  name: 'Medical Students Association',
  members: 120,
  description:
  'Supporting medical students through their academic journey with resources and community.',
  category: 'Medicine & Health',
  image:
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=400&fit=crop',
  icon: Stethoscope
}];

function PaperPlaneIllustration() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      
      <path
        d="M85 35L50 65L55 85L65 72L85 35Z"
        fill="#a5d8ff"
        stroke="#74c0fc"
        strokeWidth="2" />
      
      <path
        d="M85 35L30 55L50 65L85 35Z"
        fill="#d0ebff"
        stroke="#74c0fc"
        strokeWidth="2" />
      
      <path
        d="M15 90C25 80 35 78 45 82C55 86 60 75 70 70"
        stroke="#74c0fc"
        strokeWidth="3"
        strokeDasharray="8 6"
        strokeLinecap="round"
        fill="none" />
      
    </svg>);

}
function PeopleGrid() {
  return (
    <div className="grid grid-cols-4 gap-2 opacity-30">
      {Array.from({
        length: 16
      }).map((_, i) =>
      <Users key={i} className="w-6 h-6 text-[#74c0fc]" />
      )}
    </div>);

}
function SuccessOverlay({
  title,
  message,
  buttonLabel,
  onClose





}: {title: string;message: string;buttonLabel: string;onClose: () => void;}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative bg-white rounded-t-[24px] sm:rounded-[16px] shadow-2xl w-full max-w-[700px] overflow-hidden">
        <div className="relative px-8 pt-12 pb-4">
          <div className="absolute top-6 right-8">
            <PeopleGrid />
          </div>
          <div className="flex justify-center mb-2">
            <PaperPlaneIllustration />
          </div>
        </div>
        <div className="text-center px-8 pb-10">
          <h2 className="text-[28px] font-bold text-[#212529] mb-3">{title}</h2>
          <p className="text-[15px] text-[#495057] mb-8 max-w-md mx-auto leading-relaxed">
            {message}
          </p>
          <button
            onClick={onClose}
            className="w-full max-w-[360px] h-[48px] bg-[#228be6] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#1c7ed6] transition-colors">
            
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>);

}
export function JoinOrgFlow({
  joinedOrgs,
  onJoinOrg,
  onNavigateToDashboard
}: JoinOrgFlowProps) {
  const [step, setStep] = useState<Step>('university');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);
  const [selectedEducation, setSelectedEducation] =
  useState<EducationLevel>(null);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isEducationDropdownOpen, setIsEducationDropdownOpen] = useState(false);
  // Waitlist state
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [showWaitlistSuccess, setShowWaitlistSuccess] = useState(false);
  // Join Modal State
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [selectedOrgToJoin, setSelectedOrgToJoin] = useState<string | null>(
    null
  );
  const [joinName, setJoinName] = useState('');
  const [joinUniversity, setJoinUniversity] = useState('');
  const [joinMajor, setJoinMajor] = useState('');
  const [showJoinSuccess, setShowJoinSuccess] = useState(false);
  const [joinedOrgName, setJoinedOrgName] = useState('');
  const filteredOrgs = ORGANIZATIONS.filter((org) => {
    const matchesSearch = org.name.
    toLowerCase().
    includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ?
    org.category === selectedCategory :
    true;
    return matchesSearch && matchesCategory;
  });
  const handleJoinClick = (orgId: string) => {
    setSelectedOrgToJoin(orgId);
    setJoinName('');
    setJoinUniversity('');
    setJoinMajor('');
    setIsJoinModalOpen(true);
  };
  const handleConfirmJoin = () => {
    if (selectedOrgToJoin) {
      const org = ORGANIZATIONS.find((o) => o.id === selectedOrgToJoin);
      setJoinedOrgName(org?.name || '');
      onJoinOrg(selectedOrgToJoin);
      setIsJoinModalOpen(false);
      setShowJoinSuccess(true);
    }
  };
  const handleWaitlistSubmit = () => {
    if (waitlistEmail.trim()) {
      setIsWaitlistModalOpen(false);
      setShowWaitlistSuccess(true);
      setWaitlistEmail('');
    }
  };
  const isJoinFormValid =
  joinName.trim() && joinUniversity.trim() && joinMajor.trim();
  const waitlistCategoryLabel = selectedCategory || 'your field';
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#f8f9fa] h-full overflow-y-auto">
      {/* Back to Dashboard */}
      <div className="sticky top-0 z-10">
        <div className="w-full px-4 md:px-8 pt-4">
          <button
            onClick={onNavigateToDashboard}
            className="flex items-center gap-2 text-[14px] font-medium text-[#495057] hover:text-[#228be6] transition-colors">
            
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>
      </div>
      <div className="max-w-5xl mx-auto w-full px-4 py-8 pb-24 md:px-12 md:py-12 md:pb-12">
        {step === 'university' &&
        <div className="max-w-2xl">
            <h1 className="text-[32px] font-bold text-[#212529] mb-2">
              Join an organization
            </h1>
            <p className="text-[16px] text-[#495057] mb-12">
              Connect with your university community and access exclusive
              programs
            </p>

            <div className="mb-8">
              <label className="block text-[15px] font-semibold text-[#212529] mb-3">
                Search for your university
              </label>
              <div className="relative">
                <select className="w-full h-[48px] px-4 text-[15px] text-[#495057] bg-white border border-[#dee2e6] rounded-[8px] appearance-none outline-none focus:border-[#228be6] focus:ring-1 focus:ring-[#228be6] transition-colors cursor-pointer">
                  <option value="" disabled selected>
                    Cornell University
                  </option>
                  <option value="cornell">Cornell University</option>
                  <option value="stanford">Stanford University</option>
                  <option value="mit">MIT</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#adb5bd] pointer-events-none" />
              </div>
            </div>

            <button
            onClick={() => setStep('organizations')}
            className="w-full md:w-[280px] h-[48px] bg-[#228be6] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#1c7ed6] transition-colors">
            
              View organizations
            </button>
          </div>
        }

        {step === 'organizations' &&
        <div>
            <h1 className="text-[28px] font-bold text-[#212529] mb-8">
              Organizations at your university
            </h1>

            <div className="mb-8 relative">
              <input
              type="text"
              placeholder="Search organizations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[52px] pl-12 pr-4 text-[15px] text-[#212529] bg-white border border-[#dee2e6] rounded-[8px] outline-none focus:border-[#228be6] focus:ring-1 focus:ring-[#228be6] placeholder:text-[#adb5bd] transition-colors shadow-sm" />
            
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#adb5bd]" />
            </div>

            <div className="mb-10">
              <label className="block text-[14px] font-medium text-[#495057] mb-3">
                Targeted search
              </label>

              <div className="flex flex-wrap gap-3">
                {/* Category Filter */}
                {selectedCategory ?
              <div className="inline-flex items-center gap-2 h-[44px] px-4 bg-white border border-[#dee2e6] rounded-[8px] shadow-sm">
                    <span className="text-[14px] text-[#212529]">
                      {selectedCategory}
                    </span>
                    <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-[#adb5bd] hover:text-[#495057] transition-colors">
                  
                      <X className="w-4 h-4" />
                    </button>
                  </div> :

              <div className="relative">
                    <button
                  onClick={() => {
                    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                    setIsEducationDropdownOpen(false);
                  }}
                  className="h-[44px] w-[280px] px-4 flex items-center justify-between bg-white border border-[#dee2e6] rounded-[8px] shadow-sm text-[15px] text-[#adb5bd] hover:border-[#ced4da] transition-colors">
                  
                      Target Field
                      <ChevronDown className="w-5 h-5" />
                    </button>

                    {isCategoryDropdownOpen &&
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#dee2e6] rounded-[8px] shadow-lg overflow-hidden z-10 py-2">
                        {CATEGORIES.map((cat) =>
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat as Category);
                      setIsCategoryDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-[14px] text-[#212529] hover:bg-[#f8f9fa] transition-colors">
                    
                            {cat}
                          </button>
                  )}
                      </div>
                }
                  </div>
              }

                {/* Education Level Filter */}
                {selectedEducation ?
              <div className="inline-flex items-center gap-2 h-[44px] px-4 bg-white border border-[#dee2e6] rounded-[8px] shadow-sm">
                    <span className="text-[14px] text-[#212529]">
                      {selectedEducation}
                    </span>
                    <button
                  onClick={() => setSelectedEducation(null)}
                  className="text-[#adb5bd] hover:text-[#495057] transition-colors">
                  
                      <X className="w-4 h-4" />
                    </button>
                  </div> :

              <div className="relative">
                    <button
                  onClick={() => {
                    setIsEducationDropdownOpen(!isEducationDropdownOpen);
                    setIsCategoryDropdownOpen(false);
                  }}
                  className="h-[44px] w-[280px] px-4 flex items-center justify-between bg-white border border-[#dee2e6] rounded-[8px] shadow-sm text-[15px] text-[#adb5bd] hover:border-[#ced4da] transition-colors">
                  
                      Education Level
                      <ChevronDown className="w-5 h-5" />
                    </button>

                    {isEducationDropdownOpen &&
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#dee2e6] rounded-[8px] shadow-lg overflow-hidden z-10 py-2">
                        {EDUCATION_LEVELS.map((level) =>
                  <button
                    key={level}
                    onClick={() => {
                      setSelectedEducation(level as EducationLevel);
                      setIsEducationDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-[14px] text-[#212529] hover:bg-[#f8f9fa] transition-colors">
                    
                            {level}
                          </button>
                  )}
                      </div>
                }
                  </div>
              }
              </div>

              <div className="mt-6 text-[14px] text-[#495057]">
                Can't find an organization that fits your interest?{' '}
                <button
                onClick={() => setIsWaitlistModalOpen(true)}
                className="text-[#228be6] hover:underline">
                
                  Join our waitlist
                </button>
              </div>
            </div>

            {filteredOrgs.length > 0 ?
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredOrgs.map((org) => {
              const isJoined = joinedOrgs.includes(org.id);
              const Icon = org.icon;
              return (
                <div
                  key={org.id}
                  className="bg-white rounded-[12px] border border-[#dee2e6] p-6 shadow-sm flex flex-col">
                  
                      <div className="flex gap-4 mb-4">
                        <img
                      src={org.image}
                      alt={org.name}
                      className="w-[72px] h-[72px] rounded-[8px] object-cover shrink-0 border border-[#dee2e6]" />
                    
                        <div>
                          <h3 className="text-[16px] font-bold text-[#212529] leading-tight mb-1">
                            {org.name}
                          </h3>
                          <div className="flex items-center gap-1.5 text-[13px] text-[#868e96]">
                            <Users className="w-4 h-4" />
                            {org.members} members
                          </div>
                        </div>
                      </div>

                      <p className="text-[14px] text-[#495057] leading-relaxed mb-6 flex-1">
                        {org.description}
                      </p>

                      <div className="flex items-center gap-3 mb-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e7f5ff] text-[#228be6] text-[12px] font-medium rounded-[4px]">
                          <Icon className="w-3.5 h-3.5" />
                          {org.category}
                        </span>
                      </div>

                      {isJoined ?
                  <button
                    disabled
                    className="w-[160px] h-[40px] bg-[#f8f9fa] text-[#868e96] text-[14px] font-medium rounded-[6px] border border-[#dee2e6] cursor-not-allowed">
                    
                          Joined
                        </button> :

                  <button
                    onClick={() => handleJoinClick(org.id)}
                    className="w-[160px] h-[40px] bg-[#228be6] text-white text-[14px] font-medium rounded-[6px] hover:bg-[#1c7ed6] transition-colors">
                    
                          Join Organization
                        </button>
                  }
                    </div>);

            })}
              </div> :

          <div className="py-20 flex flex-col items-center justify-center text-center">
                <p className="text-[15px] text-[#495057] mb-2">
                  No organizations match your search criteria.
                </p>
                <p className="text-[14px] text-[#868e96]">
                  Try adjusting your filters or{' '}
                  <button
                onClick={() => setIsWaitlistModalOpen(true)}
                className="text-[#228be6] hover:underline">
                
                    join the waitlist
                  </button>
                </p>
              </div>
          }
          </div>
        }
      </div>

      {/* Waitlist Modal */}
      {isWaitlistModalOpen &&
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setIsWaitlistModalOpen(false)} />
        
          <div className="relative bg-white rounded-t-[16px] sm:rounded-[12px] shadow-xl w-full max-w-[520px] overflow-hidden">
            <div className="p-6 flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-[#212529]">
                Join Waitlist
              </h2>
              <button
              onClick={() => setIsWaitlistModalOpen(false)}
              className="text-[#adb5bd] hover:text-[#495057] transition-colors">
              
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 pb-6">
              <div className="bg-[#e7f5ff] rounded-[8px] px-4 py-3 mb-5">
                <p className="text-[14px] text-[#228be6] font-medium">
                  You're joining the waitlist for {waitlistCategoryLabel}
                </p>
              </div>

              <p className="text-[14px] text-[#495057] mb-1 leading-relaxed">
                Please enter your email address to join the waitlist.
              </p>
              <p className="text-[14px] text-[#495057] mb-5 leading-relaxed">
                We'll notify you when a spot becomes available.
              </p>

              <input
              type="email"
              value={waitlistEmail}
              onChange={(e) => setWaitlistEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full h-[44px] px-4 text-[14px] text-[#212529] bg-white border border-[#dee2e6] rounded-[8px] outline-none focus:border-[#228be6] focus:ring-1 focus:ring-[#228be6] placeholder:text-[#adb5bd] transition-colors mb-6" />
            

              <div className="flex items-center gap-3">
                <button
                onClick={() => setIsWaitlistModalOpen(false)}
                className="flex-1 h-[44px] text-[14px] font-medium text-[#495057] border border-[#dee2e6] rounded-[8px] hover:bg-[#f8f9fa] transition-colors">
                
                  Cancel
                </button>
                <button
                onClick={handleWaitlistSubmit}
                disabled={!waitlistEmail.trim()}
                className={`flex-1 h-[44px] text-[14px] font-medium rounded-[8px] transition-colors ${waitlistEmail.trim() ? 'bg-[#228be6] text-white hover:bg-[#1c7ed6]' : 'bg-[#e9ecef] text-[#adb5bd] cursor-not-allowed'}`}>
                
                  Join Waitlist
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      {/* Waitlist Success Overlay */}
      {showWaitlistSuccess &&
      <SuccessOverlay
        title="Welcome to the waitlist!"
        message={`You've joined 98 other students waiting for ${selectedCategory || 'Business'} Club. We'll notify you as soon as it launches.`}
        buttonLabel="Done"
        onClose={() => setShowWaitlistSuccess(false)} />

      }

      {/* Join Organization Modal */}
      {isJoinModalOpen &&
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setIsJoinModalOpen(false)} />
        
          <div className="relative bg-white rounded-t-[16px] sm:rounded-[8px] border border-[#dee2e6] shadow-xl w-full max-w-lg p-6 sm:p-8">
            <button
            onClick={() => setIsJoinModalOpen(false)}
            className="absolute top-4 right-4 text-[#adb5bd] hover:text-[#495057] transition-colors">
            
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-[18px] font-semibold text-[#212529] mb-1">
              Join Organization
            </h2>
            <p className="text-[14px] text-[#868e96] mb-5">
              Tell us a bit about yourself to complete your membership.
            </p>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-[13px] font-medium text-[#495057] mb-1.5">
                  Full Name
                </label>
                <input
                type="text"
                value={joinName}
                onChange={(e) => setJoinName(e.target.value)}
                placeholder="e.g. Jane Doe"
                className="w-full h-[38px] px-3 text-[14px] text-[#212529] bg-white border border-[#ced4da] rounded-[4px] outline-none focus:border-[#228be6] focus:ring-1 focus:ring-[#228be6] placeholder:text-[#adb5bd] transition-colors" />
              
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#495057] mb-1.5">
                  University
                </label>
                <input
                type="text"
                value={joinUniversity}
                onChange={(e) => setJoinUniversity(e.target.value)}
                placeholder="e.g. Stanford University"
                className="w-full h-[38px] px-3 text-[14px] text-[#212529] bg-white border border-[#ced4da] rounded-[4px] outline-none focus:border-[#228be6] focus:ring-1 focus:ring-[#228be6] placeholder:text-[#adb5bd] transition-colors" />
              
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#495057] mb-1.5">
                  Major
                </label>
                <input
                type="text"
                value={joinMajor}
                onChange={(e) => setJoinMajor(e.target.value)}
                placeholder="e.g. Human-Computer Interaction"
                className="w-full h-[38px] px-3 text-[14px] text-[#212529] bg-white border border-[#ced4da] rounded-[4px] outline-none focus:border-[#228be6] focus:ring-1 focus:ring-[#228be6] placeholder:text-[#adb5bd] transition-colors" />
              
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
              onClick={handleConfirmJoin}
              disabled={!isJoinFormValid}
              className={`flex-1 h-[38px] text-[14px] font-medium rounded-[4px] transition-colors ${isJoinFormValid ? 'bg-[#228be6] text-white hover:bg-[#1c7ed6]' : 'bg-[#e9ecef] text-[#adb5bd] cursor-not-allowed'}`}>
              
                Join Organization
              </button>
              <button
              onClick={() => setIsJoinModalOpen(false)}
              className="h-[38px] px-4 text-[14px] font-medium text-[#868e96] rounded-[4px] hover:bg-[#f8f9fa] hover:text-[#495057] transition-colors">
              
                Cancel
              </button>
            </div>
          </div>
        </div>
      }

      {/* Join Success Overlay */}
      {showJoinSuccess &&
      <SuccessOverlay
        title="Request Sent!"
        message={`Your request to join ${joinedOrgName} has been sent to their leadership team. Stay tuned for their response.`}
        buttonLabel="Continue Exploring"
        onClose={() => setShowJoinSuccess(false)} />

      }
    </div>);

}