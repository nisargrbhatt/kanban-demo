Welcome to Kanban Demo
URL: https://kanban-demo.nisargrbhatt.workers.dev

# Getting Started

Prerequisite:
Node >= 22.x.x
npm >= 11.x.x

To run this application:

```bash
npm install
npm run dev
```

# Building For Production

To build this application for production:

```bash
npm run build
```

# Architecture

- Router: [Tanstack Router](https://tanstack.com/router/latest)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- UI Library: [Shadcn UI](https://ui.shadcn.com/)
- Type Checking: [TypeScript](https://www.typescriptlang.org/)
- State Management: [Zustand](https://zustand.docs.pmnd.rs/learn/getting-started/introduction)
- DnD: [dnd-kit](https://dndkit.com/react/quickstart/)
- Form: [React Hook Form](https://react-hook-form.com/)
- Schema: [Zod](https://zod.dev/)
- Testing: [Vitest](https://vitest.dev/)
- Linting: [ESLint](https://eslint.org/)
- Formatting: [Prettier](https://prettier.io/)

# Tradeoffs

- Kanban works off zustand store [tasks](./src/store/tasks.ts) for client side operation. The strategy is similar to how Atlassian jira handles the kanban (Got idea from Atlassian Dev Conference, Youtube), where they use client side store to update and manage the tickets and for backend sync they use a websocket which sends update after a certain interval of time using a job queue. For certain operations like comment and timespent are updated without any queue as a sync operation where others are async which also allows them of a cooloff period and undo functionality.
- Because of this mechanism, in backend they have kafka queue which handles before and after state for proper granular history.
- One tradeoff this implementation has is that as everything is handled via client store, the sync to database is required to be fast (hence websocket), as it is possible that client side and server side state will be different and needs to be re-synced in a pooling mechanism.

# What to improve with more time

- Make UI more responsive and more friendly to user.
- Have a inline edit functionality in Task Detail Dialog like Jira.
- Proper Unit test cases (Currently, only store unit test case is added)
- Adding Server layer for long pooling of database sync.
- Accessibility compliance

# AI Tools used

- Used Antigravity for Tab completion
- No Agents/Prompts used for Development part

# Time Taken

- 4h 20m (including research time)
