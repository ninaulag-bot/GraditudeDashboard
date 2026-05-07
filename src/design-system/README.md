

# Graditude Design System

A Mantine-derived design system for mentorship/relationship product cards. All cards in this project are composed from the same primitives.

## Files
- `tokens.ts` — colors, spacing, radii, typography, shadows
- `primitives.tsx` — `Card`, `CardInset`, `CardHeader`, `Button`, `Badge`, `Avatar`, `Tooltip`, `IconButton`, `Divider`

## Foundations

### Color
- **Primary**: `#228be6` (hover `#1c7ed6`)
- **Tinted blue surface**: `#e7f5ff`
- **Borders**: `#dee2e6` (default), `#e9ecef` (subtle internal)
- **Text**: `#212529` (heading), `#495057` (body), `#868e96` (secondary), `#adb5bd` (timestamp)
- **Surfaces**: `#ffffff` (card), `#f8f9fa` (inset), `#f1f3f5` (page bg)

### Typography
System font stack. Heading 16/700, body 14/400, meta 13/regular, micro 12/regular, eyebrow 10/700 uppercase tracked.

### Spatial
- Card padding: `20px` (p-5)
- Inset padding: `16px` (p-4)
- Radii: `4px` (button/badge), `8px` (card/inset/avatar wrapper), `9999px` (avatar)
- Card shadow: `shadow-sm`

## Card Anatomy (5 standard cards)

Every feed card follows this template:

```
┌─────────────────────────────────────────────┐
│ [eyebrow]                       [timestamp] │  ← CardHeader
│ Avatar  Title / subtitle                    │
│                                             │
│ [optional inset surface or content]         │  ← CardInset
│                                             │
│ [actions]                       [No thanks] │  ← action row
└─────────────────────────────────────────────┘
```

### Recipes

**Suggestion card** (DiscoveryOrgCard, MentorMatchCard, ProgramEnrollmentCard)
- Card → CardHeader → image/inset → tags → action row (primary Button + subtle "No thanks")

**Pairing card** (AdminPairingCard)
- Card → CardHeader → CardInset (avatar + name + outline "View Details") → primary "Confirm Pairing" + "No thanks"

**Nudge card** (FirstContact, QuietWeek, StrongNudge)
- Card → CardHeader (avatar, blue Nudge eyebrow, name) → message → action row

**Detail/event card** (EventCard, SessionConfirmationCard)
- Card → eyebrow row → title → metadata rows w/ icons → divider → primary action

**Status card** (StepApprovedCard, StepCompletedCard)
- Card with green tone → checkmark icon + headline → optional context row

## Modal Anatomy
- Centered: `max-w-[520px]`, `radius-[12px]`, full backdrop `bg-black/40`
- Floating (chat): bottom-right, `max-w-[400px]`, no backdrop
- Footer pattern: `justify-end` with subtle "No thanks" + primary Button

## Composing a new card

```tsx
import { Card, CardHeader, Avatar, Badge, Button } from './primitives'

export function MyNewCard() {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar initials="JC" tone="blue" />}
        eyebrow={<Badge tone="blue">Nudge</Badge>}
        title={<span className="font-bold">Jordan Chen</span>}
        timestamp="2 days ago"
      />
      <p className="text-[14px] text-[#495057] mb-4">Body copy...</p>
      <div className="flex items-center justify-between">
        <Button variant="primary">Send Message</Button>
        <Button variant="subtle" size="sm">No thanks</Button>
      </div>
    </Card>
  )
}
```

## Migration path

To roll this out across `components/FeedCards.tsx`:
1. Replace `<div className="bg-white rounded-[8px] border ...">` with `<Card>`
2. Replace inline header markup with `<CardHeader />`
3. Replace inline buttons with `<Button variant="..." />`
4. Replace inline eyebrows with `<Badge tone="..." />`
5. Replace `<div className="w-[32px] h-[32px] rounded-full ...">` with `<Avatar />`

