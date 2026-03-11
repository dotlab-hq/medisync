# Agents.md — Development Log

## Feedback

- User wants onboarding to collect all data (personal, address, medical, emergency contact) with SMS OTP phone verification as a mandatory step.
- UI should use React Hook Form + shadcn Form components consistently across all steps.
- Each file should stay under 200 lines — split step forms into separate component files.
- Use vibrant color scheme: Mint Leaf (#3ab795), Celadon (#a0e8af), Muted Teal (#86baa1), Beige (#edead0), Golden Pollen (#ffcf56)
- Header should show "Go to Dashboard" for logged-in users, not avatar/sign-out button
- Locale switcher should use Select dropdown, not buttons. Hindi language support required.
- All pages need loading skeletons and fadeInUp animations
- Documents page needs multi-file XHR upload, tooltip for long filenames, storage at sidebar bottom

## Mistakes & Learnings

### zod `optional().default()` + `@hookform/resolvers` type mismatch

**Problem:** Using `z.string().optional().default("")` or even `z.string().default("")` in a zod schema causes the zod **input type** to become `string | undefined` while the output type is `string`. `zodResolver` is typed based on the input, but `useForm<OutputType>` expects the output — causing a resolver type mismatch compile error.

**Fix:** Remove `.default()` from zod fields entirely. Instead, provide empty string defaults inside `useForm`'s `defaultValues`. The schema fields stay as `z.string()` (non-optional), so both input and output types are `string`, keeping resolver and form types consistent.

### `session.user` type from better-auth

**Problem:** Tried to access `session.user.onboardingCompleted` in `beforeLoad`, but `better-auth` session type only exposes standard fields (`id`, `email`, `name`, `emailVerified`, `image`, `createdAt`, `updatedAt`). Custom columns added to the DB schema are not automatically reflected in the session type without configuring `additionalFields` in `auth.ts`.

**Fix:** Removed the `onboardingCompleted` redirect from `beforeLoad`. The dashboard itself guards against incomplete onboarding.

### `radix-ui` umbrella package includes AlertDialog

**Context:** Tried `pnpm dlx shadcn add alert-dialog` to add a missing component, but the underlying `@radix-ui/react-alert-dialog` was not a direct dep.
**Fix:** The project uses the `radix-ui` umbrella package (`^1.4.3`) which re-exports all radix primitives. Import via `import { AlertDialog as AlertDialogPrimitive } from "radix-ui"` — no new dep needed.

### QR regeneration returned same code always

**Problem:** Both `getOrCreateQrCode` and `regenerateQrCode` hardcoded the QR URL as `/emergency/${userId}` which never changes, so the QR SVG was always identical.
**Fix:** Pre-generate a UUID before inserting the QR record and embed it in the URL: `/emergency/${newId}`. Each regeneration produces a new UUID → different QR code. Updated `getEmergencyProfile` to look up the qrCode record by id (token), then find the user via `qrCode.userId`. Added backward-compat fallback to try direct userId lookup.

### replace_string_in_file on existing files causes duplication

**Problem:** When replacing only the import block of a file, the rest of the original function body remains. The result is two `export const Route` declarations.
**Fix:** After replacing the imports/header, do a second replace that removes the duplicated old function body explicitly.

### TypeScript language server caches module resolution

**Problem:** After creating a new `.tsx` file, existing files that import it show "Cannot find module" errors.
**Fix:** Run `typescript.restartTsServer` VS Code command to flush the cache.

### Drizzle column type narrowing in helper functions

**Problem:** Helper functions typed with `typeof reminder.date` as parameter can't accept `appointment.date` even though both are `PgText` columns — drizzle brands each column with its table name, so `PgColumn<{ tableName: "reminder"; ... }>` is not assignable to `PgColumn<{ tableName: "appointment"; ... }>`.

**Fix:** Inline the `sql` template fragments directly in each caller instead of extracting into a shared helper function. For correlated subqueries use `sql`\`${notificationLog.entityId} = ${outerTable.id}\``rather than`eq(notificationLog.entityId, outerTable.id)` to avoid the same branding issue.

### replace_string_in_file on file header leaves old body

**Problem:** When replacing the first few lines of a file (e.g. imports), the rest of the original body remains, creating a second `export const Route` / duplicate function declaration.

**Fix:** Always include enough of the trailing content in `oldString` to uniquely capture the full original block, or do a second replace to remove the leftover duplicate block explicitly.

**Problem:** When replacing only the imports/header section of a file that has a long body, the rest of the original body remains unchanged. If the new content also contains declarations (schema, type, function), the file ends up with duplicates causing TypeScript errors.

**Fix:** After replacing the header, do a second replace that explicitly removes the duplicate trailing block. Better yet: when rewriting a component that changes its exported type signature, overwrite the entire file at once rather than doing partial replacements.

**Problem:** `mv $userId.tsx $token.tsx` in Windows git bash has shell interpolation issues with `$` in filenames.

**Fix:** Escape the `$` in bash: `mv '\$userId.tsx' '\$token.tsx'` or use Node.js `fs.renameSync`.

### Notification system redesign — views + 5-min window + status tracking

**Context:** Original `notify.ts` did complex multi-table JOINs inline with a 1-minute exact window. No error handling; no retry; no body stored.

**Redesign:**

- Created two PostgreSQL views (`due_reminder_notifications`, `due_appointment_notifications`) that pre-join user, reminder/appointment, and notification settings — single `SELECT *` from the view per cron tick.
- 5-minute backward window (`NOW - 5 min → NOW`) gives each item up to 5 cron invocations for delivery.
- Added `status` (`sent`/`failed`) and `body` columns to `notification_log`.
- Views exclude items where all enabled channels already have `status = 'sent'`; failed entries don't block retry.
- Processing code wraps each send in try/catch, logs `sent` on success and `failed` on error, including the body text.

### `db.execute` typing with interfaces vs type aliases

**Problem:** `db.execute<T>` requires `T extends Record<string, unknown>`. TypeScript interfaces don't carry an index signature, so `DueReminderRow` as an interface fails the constraint.

**Fix:** Use `type` aliases instead of `interface` for view-row shapes. Also `db.execute` returns `QueryResult<T>` whose rows are in `.rows`, not directly iterable.

### deleteEmergencyContact missing ownership verification

**Problem:** `deleteEmergencyContact` in `src/server/user.ts` verified the user was authenticated but did NOT verify the emergency contact belonged to the authenticated user. Any authenticated user could delete any other user's emergency contacts by guessing/knowing the contact ID.

**Fix:** Added `and(eq(emergencyContact.id, data.id), eq(emergencyContact.userId, sessionData.user.id))` to the WHERE clause, ensuring only the owner can delete their own contacts. Also imported `and` from `drizzle-orm`.

### useEffect activeConversationId wipes chat messages mid-stream

**Problem:** `ChatContainer` had a `useEffect([activeConversationId])` that called `setMessages([])` whenever the active conversation changed. When `handleSend` auto-created a new conversation and called `setActiveConversation(convId)`, this effect fired AFTER the render and wiped the user's message from the useChat state. Since the user message was already gone, the save effect couldn't find it. Result: messages never persisted and the user message appeared blank in the UI.

**Fix:** Added `skipNextResetRef = useRef(false)`. In `handleSend`, set it to `true` just before calling `setActiveConversation` when auto-creating a conversation. The reset effect checks the flag and skips clearing messages for that one activation.

### Initial listConversations fetch overwrites optimistic sidebar additions

**Problem:** The initial `listConversations()` call on page mount used `.then(data => setConversations(data))` — a plain overwrite. If a user sent a message before the fetch resolved (auto-creating a new conversation via `handleConversationCreated`), the fetch resolving would wipe the optimistically-added item, making the new chat appear to "jump" positions.

**Fix:** Changed to a functional update: `setConversations(prev => { const serverIds = new Set(...); const optimistic = prev.filter(c => !serverIds.has(c.id)); return [...optimistic, ...data]; })`. This preserves any optimistic additions that aren't yet reflected in the server response.

### Dynamic imports for heavy libraries

**Problem:** `qrcode.react` and `NearbyMapEmbed` were eagerly imported in route files, adding to initial bundle.

**Fix:** Used `React.lazy()` with `Suspense` + `Skeleton` fallbacks. The QR code library loads only when visiting the QR page, and maps load only on camps/geo pages.

### Documents page over 600 lines

**Problem:** `documents.tsx` was 637 lines — far over the 250-line limit and hard to maintain.

**Fix:** Split into 8 files: route (208), skeleton (43), upload dialog (165), upload hook (142), folder sidebar (127), document grid (151), folder dialogs (157), tagify input (42). All under 250 lines.
