import React from 'react';
import {
  Home,
  MessageCircle,
  CalendarDays,
  GraduationCap,
  Smile,
  Plus,
  ChevronRight } from
'lucide-react';
import { Stage } from './StageSwitcher';
interface SidebarProps {
  currentPage?: 'dashboard' | 'joinOrg';
  onNavigate?: (page: 'dashboard' | 'joinOrg') => void;
  currentStage?: Stage;
}
export function Sidebar({
  currentPage = 'dashboard',
  onNavigate,
  currentStage = '1'
}: SidebarProps) {
  const renderPrograms = () => {
    if (currentStage === '1' || currentStage === '2') {
      return (
        <p className="px-6 py-2 text-[13px] text-[#868e96] italic">
          No programs yet
        </p>);

    }
    if (currentStage === 'edge') {
      return (
        <>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-[14px] text-[#495057] hover:bg-[#f8f9fa] rounded-[4px]">
            
            <div className="w-2 h-2 rounded-full bg-[#228be6]"></div>
            PM Mentorship Program
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-[14px] text-[#495057] hover:bg-[#f8f9fa] rounded-[4px]">
            
            <div className="w-2 h-2 rounded-full bg-[#12b886]"></div>
            Product Management Club
          </a>
        </>);

    }
    return (
      <a
        href="#"
        className="flex items-center gap-3 px-3 py-2 text-[14px] text-[#495057] hover:bg-[#f8f9fa] rounded-[4px]">
        
        <div className="w-2 h-2 rounded-full bg-[#228be6]"></div>
        UX Research Intensive
      </a>);

  };
  return (
    <aside className="w-[250px] bg-white border-r border-[#dee2e6] h-full flex flex-col shrink-0">
      {/* Logo */}
      <div className="h-[60px] flex items-center px-6 border-b border-[#dee2e6] shrink-0">
        <img
          src="/Frame_15495.png"
          alt="Graditude"
          className="h-[28px] w-auto" />
        
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 overflow-y-auto">
        <div className="mb-8">
          <h3 className="px-6 text-[11px] font-bold text-[#868e96] uppercase tracking-[0.5px] mb-2">
            HOME
          </h3>
          <nav className="flex flex-col gap-1 px-3">
            <button
              onClick={() => onNavigate?.('dashboard')}
              className={`flex items-center gap-3 px-3 py-2 text-[14px] rounded-[4px] transition-colors ${currentPage === 'dashboard' ? 'font-medium text-[#228be6] bg-[#e7f5ff]' : 'text-[#495057] hover:bg-[#f8f9fa]'}`}>
              
              <Home className="w-[18px] h-[18px]" strokeWidth={1.5} />
              Dashboard
            </button>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-[14px] text-[#495057] hover:bg-[#f8f9fa] rounded-[4px]">
              
              <MessageCircle className="w-[18px] h-[18px]" strokeWidth={1.5} />
              Chat
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-[14px] text-[#495057] hover:bg-[#f8f9fa] rounded-[4px]">
              
              <CalendarDays className="w-[18px] h-[18px]" strokeWidth={1.5} />
              Calendar
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-[14px] text-[#495057] hover:bg-[#f8f9fa] rounded-[4px]">
              
              <GraduationCap className="w-[18px] h-[18px]" strokeWidth={1.5} />
              Mentorship
            </a>
          </nav>
        </div>

        <div>
          <h3 className="px-6 text-[11px] font-bold text-[#868e96] uppercase tracking-[0.5px] mb-2">
            PROGRAMS
          </h3>
          <nav className="flex flex-col gap-1 px-3">
            {renderPrograms()}
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-[14px] font-medium text-[#228be6] hover:bg-[#e7f5ff] rounded-[4px] mt-1">
              
              <Plus className="w-[18px] h-[18px]" strokeWidth={1.5} />
              Add Program(s)
            </a>
          </nav>
        </div>
      </div>

      {/* Bottom User Profile */}
      <div className="p-4 border-t border-[#dee2e6] shrink-0">
        <button className="w-full flex items-center gap-3 p-2 hover:bg-[#f8f9fa] rounded-[8px] transition-colors text-left">
          <img
            src="https://i.pravatar.cc/150?img=47"
            alt="Maya Edwards avatar"
            className="w-[36px] h-[36px] rounded-full object-cover shrink-0 border border-[#dee2e6]" />
          
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-semibold text-[#212529] truncate">
              Maya Edwards
            </p>
            <p className="text-[11px] text-[#868e96] truncate">View profile</p>
          </div>
          <ChevronRight className="w-4 h-4 text-[#adb5bd] shrink-0" />
        </button>
      </div>
    </aside>);

}