import React from 'react';
import { Home, MessageCircle, Calendar, Bell } from 'lucide-react';
export function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#dee2e6] px-4 py-2 z-50">
      <div className="flex items-center justify-around">
        <button className="flex flex-col items-center gap-1 py-2 px-4">
          <Home
            className="w-6 h-6 text-[#228be6]"
            fill="#228be6"
            fillOpacity={0.1} />
          
          <span className="text-[11px] font-medium text-[#228be6]">Org</span>
        </button>
        <button className="flex flex-col items-center gap-1 py-2 px-4">
          <MessageCircle className="w-6 h-6 text-[#868e96]" />
          <span className="text-[11px] text-[#868e96]">Chat</span>
        </button>
        <button className="flex flex-col items-center gap-1 py-2 px-4">
          <Calendar className="w-6 h-6 text-[#868e96]" />
          <span className="text-[11px] text-[#868e96]">Calendar</span>
        </button>
        <button className="flex flex-col items-center gap-1 py-2 px-4">
          <Bell className="w-6 h-6 text-[#868e96]" />
          <span className="text-[11px] text-[#868e96]">Activity</span>
        </button>
      </div>
    </nav>);

}