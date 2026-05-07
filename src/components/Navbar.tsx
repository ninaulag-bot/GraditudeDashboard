import React from 'react';
import { Bell, PanelRightClose, PanelRightOpen } from 'lucide-react';
interface NavbarProps {
  rightPanelOpen: boolean;
  onToggleRightPanel: () => void;
}
export function Navbar({ rightPanelOpen, onToggleRightPanel }: NavbarProps) {
  return (
    <nav className="h-[60px] bg-white border-b border-[#dee2e6] flex items-center justify-end px-6 shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleRightPanel}
          className="text-[#868e96] hover:text-[#495057] cursor-pointer transition-colors"
          title={rightPanelOpen ? 'Close profile panel' : 'Open profile panel'}>
          
          {rightPanelOpen ?
          <PanelRightClose className="w-[20px] h-[20px]" /> :

          <PanelRightOpen className="w-[20px] h-[20px]" />
          }
        </button>
        <button className="text-[#212529] hover:text-[#343a40] cursor-pointer">
          <Bell
            className="w-[22px] h-[22px]"
            fill="currentColor"
            strokeWidth={0} />
          
        </button>
        <img
          src="https://i.pravatar.cc/150?img=47"
          alt="User avatar"
          className="w-[40px] h-[40px] rounded-full border-2 border-[#dee2e6] object-cover cursor-pointer" />
        
      </div>
    </nav>);

}