import React from 'react';
import { X, Calendar, MapPin, Users, Clock } from 'lucide-react';
interface EventDetailsModalProps {
  opened: boolean;
  onClose: () => void;
  orgName: string;
  eventName: string;
  description: string;
  date: string;
  timeRange: string;
  location: string;
  attendeeCount: number;
  spotsLeft: number;
  postedBy: string;
  postedAgo: string;
  onRSVP: () => void;
  onDismiss: () => void;
  onAddToCalendar: () => void;
}
export function EventDetailsModal({
  opened,
  onClose,
  orgName,
  eventName,
  description,
  date,
  timeRange,
  location,
  attendeeCount,
  spotsLeft,
  postedBy,
  postedAgo,
  onRSVP,
  onDismiss,
  onAddToCalendar
}: EventDetailsModalProps) {
  if (!opened) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div
        className="fixed inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true" />
      
      <div className="relative z-10 w-full max-w-[520px] bg-white rounded-t-[16px] sm:rounded-[8px] shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-4 py-4 flex items-center justify-between gap-3 border-b border-[#e9ecef]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="px-2 py-0.5 bg-[#e7f5ff] text-[#1c7ed6] text-[11px] font-semibold uppercase tracking-wide rounded-[4px]">
              New Event
            </span>
            <span className="text-[14px] text-[#868e96] truncate">
              {orgName}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-[#868e96] hover:text-[#212529] p-1 rounded-full hover:bg-[#f8f9fa] transition-colors shrink-0">
            
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pb-6 overflow-y-auto">
          <div className="pt-4">
            <h2 className="text-[20px] font-bold text-[#212529] leading-tight">
              {eventName}
            </h2>
            <p className="text-[14px] text-[#868e96] leading-[1.6] mt-2">
              {description}
            </p>
          </div>

          <div className="my-4 border-t border-[#e9ecef]" />

          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-[#868e96] mt-0.5 shrink-0" />
              <span className="text-[14px] text-[#868e96]">{date}</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#868e96] mt-0.5 shrink-0" />
              <span className="text-[14px] text-[#868e96]">{timeRange}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#868e96] mt-0.5 shrink-0" />
              <span className="text-[14px] text-[#868e96]">{location}</span>
            </div>
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-[#868e96] mt-0.5 shrink-0" />
              <span className="text-[14px] text-[#868e96]">
                {attendeeCount} attending ·{' '}
                <span className="text-[#228be6]">{spotsLeft} spots left</span>
              </span>
            </div>
          </div>

          <div className="mt-4 text-[13px] text-[#868e96]">
            Posted by{' '}
            <span className="font-medium text-[#212529]">{postedBy}</span> ·{' '}
            {postedAgo}
          </div>

          <div className="mt-4 border-t border-[#e9ecef]" />

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  onRSVP();
                  onClose();
                }}
                className="px-4 h-[36px] text-[14px] font-semibold text-white bg-[#228be6] rounded-[4px] hover:bg-[#1c7ed6] transition-colors w-full sm:w-auto">
                
                RSVP
              </button>
              <button
                onClick={onAddToCalendar}
                className="px-4 h-[36px] text-[14px] font-medium text-[#495057] bg-white border border-[#dee2e6] rounded-[4px] hover:bg-[#f8f9fa] transition-colors w-full sm:w-auto">
                
                Add to Calendar
              </button>
            </div>
            <button
              onClick={() => {
                onDismiss();
                onClose();
              }}
              className="text-[14px] text-[#868e96] hover:text-[#495057] transition-colors cursor-pointer self-end sm:self-auto">
              
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>);

}