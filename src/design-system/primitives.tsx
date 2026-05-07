import React from 'react';
// Graditude Design System — Reusable primitives
// Compose these into any card or page.

// ---- Card shell ----
export function Card({
  children,
  className = ''



}: {children: React.ReactNode;className?: string;}) {
  return (
    <div
      className={`bg-white rounded-[8px] border border-[#dee2e6] p-5 shadow-sm ${className}`}>
      
      {children}
    </div>);

}
// Inset surface used inside cards (Jordan/Alex box, mentor strip)
export function CardInset({
  children,
  className = ''



}: {children: React.ReactNode;className?: string;}) {
  return (
    <div
      className={`bg-[#f8f9fa] border border-[#dee2e6] rounded-[8px] p-4 ${className}`}>
      
      {children}
    </div>);

}
// ---- Button ----
type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'subtle';
type ButtonSize = 'sm' | 'md';
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled,
  type = 'button'







}: {variant?: ButtonVariant;size?: ButtonSize;children: React.ReactNode;onClick?: () => void;disabled?: boolean;type?: 'button' | 'submit';}) {
  const sizeClasses =
  size === 'sm' ? 'h-[32px] px-3 text-[13px]' : 'h-[36px] px-4 text-[14px]';
  const variantClasses = {
    primary:
    'bg-[#228be6] text-white hover:bg-[#1c7ed6] disabled:opacity-50 disabled:cursor-not-allowed',
    outline:
    'bg-white text-[#228be6] border border-[#228be6] hover:bg-[#e7f5ff]',
    ghost: 'bg-white text-[#495057] border border-[#dee2e6] hover:bg-[#f8f9fa]',
    subtle: 'bg-transparent text-[#868e96] hover:text-[#495057]'
  }[variant];
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`font-medium rounded-[4px] transition-colors ${sizeClasses} ${variantClasses}`}>
      
      {children}
    </button>);

}
// ---- Badge / Eyebrow label ----
type BadgeTone = 'blue' | 'gray' | 'green' | 'yellow' | 'red';
export function Badge({
  tone = 'blue',
  children



}: {tone?: BadgeTone;children: React.ReactNode;}) {
  const tones = {
    blue: 'text-[#228be6] bg-[#e7f5ff]',
    gray: 'text-[#495057] bg-[#f8f9fa] border border-[#dee2e6]',
    green: 'text-[#16a34a] bg-[#dcfce7]',
    yellow: 'text-[#92400e] bg-[#fff3bf]',
    red: 'text-[#fa5252] bg-[#ffe3e3]'
  }[tone];
  return (
    <span
      className={`text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-[4px] ${tones}`}>
      
      {children}
    </span>);

}
// ---- Avatar ----
type AvatarSize = 'sm' | 'md' | 'lg';
type AvatarTone = 'blue' | 'gray';
export function Avatar({
  initials,
  size = 'md',
  tone = 'gray'




}: {initials: string;size?: AvatarSize;tone?: AvatarTone;}) {
  const sizes = {
    sm: 'w-6 h-6 text-[10px]',
    md: 'w-8 h-8 text-[12px]',
    lg: 'w-12 h-12 text-[16px]'
  }[size];
  const tones = {
    blue: 'bg-[#e7f5ff] text-[#228be6]',
    gray: 'bg-[#e9ecef] text-[#495057]'
  }[tone];
  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold shrink-0 ${sizes} ${tones}`}>
      
      {initials}
    </div>);

}
// ---- Tooltip wrapper ----
export function Tooltip({
  label,
  children



}: {label: string;children: React.ReactNode;}) {
  return (
    <div className="relative group/tt inline-flex">
      {children}
      <div
        role="tooltip"
        className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-[8px] bg-[#212529] text-white text-[11px] font-medium px-2 py-1 opacity-0 group-hover/tt:opacity-100 group-focus-within/tt:opacity-100 transition-opacity duration-150 shadow-md z-50">
        
        {label}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#212529]" />
      </div>
    </div>);

}
// ---- Icon button (square, 36x36) ----
export function IconButton({
  ariaLabel,
  tooltip,
  onClick,
  children





}: {ariaLabel: string;tooltip?: string;onClick?: () => void;children: React.ReactNode;}) {
  const btn =
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    className="w-9 h-9 flex items-center justify-center text-[#495057] border border-[#dee2e6] rounded-[8px] hover:bg-[#f8f9fa] transition-colors">
    
      {children}
    </button>;

  return tooltip ? <Tooltip label={tooltip}>{btn}</Tooltip> : btn;
}
// ---- Divider ----
export function Divider({ className = '' }: {className?: string;}) {
  return <div className={`border-t border-[#e9ecef] ${className}`} />;
}
// ---- Card header pattern ----
export function CardHeader({
  avatar,
  eyebrow,
  title,
  timestamp,
  rightSlot






}: {avatar?: React.ReactNode;eyebrow?: React.ReactNode;title?: React.ReactNode;timestamp?: string;rightSlot?: React.ReactNode;}) {
  return (
    <div className="flex justify-between items-start gap-3 mb-4">
      <div className="flex items-center gap-3 min-w-0">
        {avatar}
        <div className="min-w-0">
          {eyebrow && <div className="mb-1">{eyebrow}</div>}
          {title && <div className="text-[14px] text-[#212529]">{title}</div>}
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {timestamp &&
        <span className="text-[12px] text-[#adb5bd]">{timestamp}</span>
        }
        {rightSlot}
      </div>
    </div>);

}