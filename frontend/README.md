# Thanh To Do

A household management app for task tracking and expense management with multi-user support and cross-device sync.

## Features

### Task Management
- **Priority-based tasks** - Organize tasks as Urgent or Regular priority
- **Task creation** - Master accounts can create tasks via the Entry page
- **Completion tracking** - Track who completed each task and when
- **Visual organization** - Urgent tasks displayed prominently above regular tasks

### Running Tab (Expense Tracker)
- **Balance management** - Track household balance in VND (Vietnamese Dong)
- **Expense approval workflow** - Submit expenses for approval with pending/approved/rejected states
- **Quick expense shortcuts** - One-tap buttons for common expenses:
  - Groceries, Gas, Parking, Food
  - Drinks (Bubble Tea, Coffee, Many)
  - Cat expenses for Ivory (white cat) and Tom (brown cat) - Vet, Grooming, Other
- **Attachment support** - Upload receipts/photos for expenses
- **Bulk actions** - Approve all or reject all pending expenses at once
- **Balance adjustments** - Master accounts can manually adjust the balance
- **Top-up support** - Quick +5M button for Kia top-ups

### Multi-User System
- **Account-based access** - Multiple user accounts with password protection
- **Master accounts** - Full administrative access including:
  - Task creation via Entry page
  - Balance adjustments
  - Expense clearing
  - Task deletion
- **Regular accounts** - Can complete tasks and submit/approve expenses
- **Permission system** - Configurable permissions per user for:
  - Task completion
  - Expense approval

### Cross-Device Sync
- **Real-time sync** - Data syncs across devices via Supabase
- **Offline support** - Local storage persistence with background sync
- **Conflict resolution** - Handles concurrent updates gracefully

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **UI**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) primitives
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) with persistence
- **Backend**: [Supabase](https://supabase.com/) (PostgreSQL + Auth + Storage)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript (strict mode)

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Login/Account selection
│   ├── entry/             # Task entry (master only)
│   ├── tasks/             # Task list view
│   ├── running-tab/       # Expense tracking
│   └── settings/          # App settings
├── components/
│   ├── auth/              # Account selector
│   ├── layout/            # Header, Navigation, Logo
│   ├── running-tab/       # Expense components
│   ├── settings/          # Settings components
│   ├── tasks/             # Task components
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/
│   ├── supabase/          # Supabase client & queries
│   │   ├── queries/       # Database operations
│   │   └── sync/          # Real-time sync logic
│   └── utils.ts           # Utility functions
├── stores/                # Zustand state stores
│   ├── ownerStore.ts      # User/account management
│   ├── tasksStore.ts      # Task state
│   ├── runningTabStore.ts # Expense/balance state
│   └── permissionsStore.ts # User permissions
└── types/                 # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js >= 20.9.0
- A Supabase project (for backend)

### Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |

## Database Schema

The app uses Supabase with the following main tables:

- **owners** - User accounts with password hashes
- **tasks** - Task items with priority and completion status
- **running_tab** - Balance tracking
- **expenses** - Individual expense records
- **tab_history** - Balance change history
- **permissions** - User permission settings

## Usage

### First Time Setup

1. Open the app and create a master account
2. Set up the running tab with an initial balance
3. Create additional user accounts as needed
4. Configure permissions in Settings

### Daily Use

**Tasks:**
- Master accounts: Use Entry page to add new tasks
- All accounts: View tasks on Tasks page, tap to complete

**Expenses:**
- Use quick shortcuts for common expenses
- Or tap "Simple" for custom expense entry
- Use "Many" for bulk expense entry
- Expenses go to Pending until approved

**Approvals:**
- Users with approval permission can approve/reject expenses
- Double checkmark approves all pending at once
- Double X rejects all pending with a reason

## Mobile Optimization

The app is fully responsive with:
- Bottom navigation for mobile devices
- Full-screen overlays for expense shortcuts
- Touch-optimized tap targets
- Collapsible sections to save screen space

## License

Private project - All rights reserved
