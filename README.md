# MediSync

MediSync is a full-stack health management app . It helps users manage personal health records, reminders, appointments, emergency profile sharing, document storage, and AI-assisted health chat in one dashboard.

## Features

### Authentication & Account

- Email/password authentication with Better Auth
- Email verification, forgot password, and reset password flows
- Protected dashboard and onboarding flow
- Profile management with personal details
- Phone number OTP verification and phone update flow

### Onboarding

- Guided first-time setup flow
- Basic profile capture
- Medical information capture
- Emergency contact setup

### Dashboard

- Health overview home with quick stats
- Medical profile snapshot (blood group, allergies, chronic conditions)
- Quick links to documents, reminders, appointments, and QR

### Health Metrics

- Track and manage health metrics
- Create/list/delete metric entries

### Medical Records

- Create, update, list, and delete medical records

### Reminders

- Create medication/reminder schedules
- Enable/disable reminders
- Delete reminders
- Notification delivery via email/SMS (configurable)

### Appointments

- Create, update, list, and delete appointments
- Appointment notification support via cron endpoints

### Documents

- Folder management (create/update/delete)
- Document upload flow with presigned URLs
- List and organize user documents
- Secure document viewing via presigned URLs
- Storage usage summary

### Emergency Access & QR

- User-specific emergency QR code generation/regeneration
- Public emergency profile route via token

### AI Chat Assistant

- Conversation-based AI chat
- Auto-create conversation on first message
- Redirect to generated conversation route
- Message persistence with metadata (parts, tokens, model)
- Message TTS generation endpoint
- Assistant response retitling endpoint
- Like/dislike feedback persisted per assistant message

### Notifications

- User notification settings (email/SMS)
- Cron routes for reminder and appointment notification processing
- Notification logging and type handling on server

### Localization & UX

- Multi-language support via Paraglide i18n
- Theme switching
- Language switcher
- Responsive dashboard UI with shadcn/ui + Tailwind CSS

## Public Pages

- Landing/home
- About
- Health camps
- Geo assistance
- Help
- Privacy policy
- Terms

## Tech Stack

- TanStack Start + TanStack Router
- React 19 + TypeScript
- TanStack Query
- Drizzle ORM + PostgreSQL
- Better Auth
- Tailwind CSS + shadcn/ui
- Paraglide i18n
- Resend (email), RelayX (SMS), Groq (AI), AWS S3-compatible storage

## Environment Variables

Copy `.env.example` to `.env` and set required values.

Core keys used by the app include:

- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `MEDISYNC_PRIVATE_KEY`
- `GROQ_API_KEY`

## Getting Started

```bash
pnpm install
pnpm dev
```

App runs on `http://localhost:3000` by default.

## Database

```bash
pnpm db:generate
pnpm db:migrate
# or
pnpm db:push
```

Open Drizzle Studio:

```bash
pnpm db:studio
```

## Build & Preview

```bash
pnpm build
pnpm preview
```

## Lint, Format, Test

```bash
pnpm lint
pnpm format
pnpm check
pnpm test
```

## Project Structure (high level)

- `src/routes` - File-based app and API routes
- `src/server` - Server functions (auth, chat, reminders, appointments, etc.)
- `src/components` - UI and feature components
- `src/db` - Drizzle schema/config
- `scripts` - Utility and setup scripts (including cron setup)
