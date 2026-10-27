<p align="center">
<a href=https://github.com/rcnsh/virtue-gymnastics-website target="_blank">
<img src='/public/virtue-icon.png' width="100%" alt="Banner" />
</a>
</p>

<p align="center">
<img src="https://img.shields.io/github/contributors/rcnsh/virtue-gymnastics-website" alt="GitHub contributors" />
<img src="https://img.shields.io/github/discussions/rcnsh/virtue-gymnastics-website" alt="GitHub discussions" />
<img src="https://img.shields.io/github/issues/rcnsh/virtue-gymnastics-website" alt="GitHub issues" />
<img src="https://img.shields.io/github/issues-pr/rcnsh/virtue-gymnastics-website" alt="GitHub pull request" />
</p>

<p></p>
<h1 align="center" style="font-size: 1.875rem; line-height: 2.25rem;">Virtue Movement Website Project</h1>
<p></p>

## 🔍 Table of Contents

- [💻 Stack](#-stack)

- [📝 Project Summary](#-project-summary)

- [🔐 Accounts and Sign-in](#-accounts-and-sign-in)

- [🗄️ Database](#️-database)

- [⚙️ Environment Variables](#️-environment-variables)

- [🚀 Run Locally](#-run-locally)

- [🙌 Contributors](#-contributors)

- [📄 License](#-license)

## 💻 Stack

- [next](https://github.com/vercel/next.js): React framework (Pages Router).
- [react](https://github.com/facebook/react): JavaScript library for building user interfaces.
- [shadcn/ui](https://ui.shadcn.com): Components built with Radix UI and Tailwind CSS.
- [tailwindcss](https://github.com/tailwindlabs/tailwindcss): Utility-first CSS framework.
- [fullcalendar](https://github.com/fullcalendar/fullcalendar): The timetable.
- [tanstack/react-table](https://github.com/TanStack/table): Admin data tables.
- [react-hook-form](https://github.com/react-hook-form/react-hook-form) and [zod](https://github.com/colinhacks/zod): Forms and validation, shared between the browser and the API.
- [prisma](https://github.com/prisma/prisma): Postgres access and migrations.
- [cypress](https://github.com/cypress-io/cypress): End-to-end tests.
- [biome](https://github.com/biomejs/biome): Linting and formatting.

## 📝 Project Summary

- [.github](.github): CI (lint, typecheck, build and Cypress on every push and PR).
- [components](components): Reusable UI components.
- [cypress](cypress): End-to-end tests.
- [data](data): Static data: the timetable seed, medical conditions and days of the week.
- [lib/auth](lib/auth): Sign-in, sessions, password hashing and the guards for pages and API routes.
- [lib/db](lib/db): The data store: Postgres through Prisma, or in memory.
- [lib/validation](lib/validation): Form schemas shared by the browser and the API.
- [pages](pages): The site's pages and API routes, including the admin pages.
- [prisma](prisma): Schema, migrations and the seed script.
- [public](public): Static assets.
- [styles](styles): Global styles and CSS modules.

## 🔐 Accounts and Sign-in

Sign-in is built into the site; there's no third-party auth service.
- Passwords are hashed with scrypt (Node's built-in `crypto`), salted per user.
- Signing in creates a random session token, stored in an `HttpOnly`, `SameSite=Lax` cookie (`Secure` and `__Host-` prefixed in production). The database only keeps a SHA-256 of the token.
- Sessions last 30 days and renew themselves when used. Changing your password signs out every other device.
- Pages check the session in `getServerSideProps` (`requireUser`, `requireAdmin` in `lib/auth/pages.ts`). API routes declare who may call them with `route(..., "public" | "user" | "admin")` in `lib/auth/api.ts`, which also refuses cross-origin writes.
- Sign-in and sign-up attempts are rate limited per IP and per email.
- Anyone signing up with an `@virtuemovement.co.uk` address becomes an admin (configurable, see below). Admins can grant admin to others from **Admin: Users**.

## 🗄️ Database

All data access goes through the `Store` interface in `lib/db/types.ts`, which has two implementations:
- **Postgres** (`lib/db/prisma.ts`), used whenever `DATABASE_URL` is set.
- **In memory** (`lib/db/memory.ts`), used otherwise. It starts with the timetable from `data/classes.json`. Locally it's saved to `.data/dev-store.json` so it survives restarts; on Vercel it resets whenever a new server instance starts, so it's only for demos.

To move to Postgres:
1. Create a Postgres database (Neon, Supabase, Vercel Postgres, …) and set `DATABASE_URL` (and `DIRECT_URL` if your provider gives you a pooled URL).
2. `pnpm db:migrate` to create the tables.
3. `pnpm db:seed` to load the timetable.

## ⚙️ Environment Variables

All optional. See [.env.example](.env.example).
- `DATABASE_URL`: Postgres connection string. Without it, the in-memory store is used.
- `DIRECT_URL`: Direct (non-pooled) connection string for migrations.
- `ADMIN_EMAIL_DOMAINS`: Comma-separated email domains whose sign-ups become admins. Defaults to `virtuemovement.co.uk`.
- `ADMIN_EMAILS`: Comma-separated individual emails that become admins on sign-up.

## 🚀 Run Locally

0. Install [Node.js](https://nodejs.org/en/) 22 or newer and [pnpm](https://pnpm.io).

1. Clone the repository:

```sh
git clone https://github.com/rcnsh/virtue-gymnastics-website
```

2. Install the dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Sign up at http://localhost:3000/sign-up. Use an `@virtuemovement.co.uk` address to get the admin pages.

Other scripts: `pnpm lint`, `pnpm typecheck`, `pnpm build`, and `pnpm test` (Cypress, against a server running on port 3000).

## 🙌 Contributors

<table style="border:1px solid #404040;text-align:center;width:100%">
<tr><td style="width:14.29%;border:1px solid #404040;">
        <a href="https://github.com/RCNOverwatcher" spellcheck="false">
          <img src="https://avatars.githubusercontent.com/u/49075095?v=4?s=100" width="100px;" alt="RCNOverwatcher"/>
          <br />
          <b>RCNOverwatcher</b>
        </a>
        <br />
        <a href="https://github.com/rcnsh/virtue-gymnastics-website/commits?author=RCNOverwatcher" title="Contributions" spellcheck="false">
          All of the contributions
        </a>
      </td></table>

## 📄 License

This project is licensed under the **MIT License** - see the [**MIT License**](https://github.com/rcnsh/virtue-gymnastics-website/blob/main/LICENSE) file for details.
