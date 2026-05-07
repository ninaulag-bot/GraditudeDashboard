import React from 'react';
import { Menu } from 'lucide-react';
export function MobileNavbar() {
  return (
    <nav className="lg:hidden h-[60px] bg-white border-b border-[#dee2e6] flex items-center justify-between px-4 shrink-0">
      <img
        src="/Frame_15495.png"
        alt="Graditude"
        className="h-[24px] w-auto" />
      
      <button className="p-2">
        <Menu className="w-6 h-6 text-[#212529]" />
      </button>
    </nav>);

}