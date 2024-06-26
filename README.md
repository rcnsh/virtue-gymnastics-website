<p align="center">
<a href=https://github.com/RCNOverwatcher/virtue-gymnastics-website target="_blank">
<img src='/public/virtue-icon.png' width="100%" alt="Banner" />
</a>
</p>

<p align="center">
<img src="https://img.shields.io/github/contributors/RCNOverwatcher/virtue-gymnastics-website" alt="GitHub contributors" />
<img src="https://img.shields.io/github/discussions/RCNOverwatcher/virtue-gymnastics-website" alt="GitHub discussions" />
<img src="https://img.shields.io/github/issues/RCNOverwatcher/virtue-gymnastics-website" alt="GitHub issues" />
<img src="https://img.shields.io/github/issues-pr/RCNOverwatcher/virtue-gymnastics-website" alt="GitHub pull request" />
</p>

<p></p>
<h1 align="center" style="font-size: 1.875rem; line-height: 2.25rem;">Virtue Movement Website Project</h1>
<p></p>

## 🔍 Table of Contents

- [💻 Stack](#stack)

- [📝 Project Summary](#project-summary)

- [⚙️ Setting Up](#setting-up)

- [🚀 Run Locally](#run-locally)

- [🙌 Contributors](#contributors)

- [📄 License](#license)

## 💻 Stack

- [shadcn/ui](https://ui.shadcn.com): Beautifully designed components built with Radix UI and Tailwind CSS.
- [clerk/nextjs](https://github.com/clerk/javascript): Authentication and user management.
- [fullcalendar/react](https://github.com/fullcalendar/fullcalendar): Timetable component for displaying events.
- [hookform/resolvers](https://github.com/react-hook-form/resolvers): Resolvers for form validation.
- [radix-ui/react-icons](https://github.com/radix-ui/react-icons): Collection of icons for UI components.
- [tanstack/react-table](https://github.com/tannerlinsley/react-table): Data table component for displaying and managing tabular data.
- [next](https://github.com/vercel/next.js): Framework for building server-side rendered React applications.
- [react](https://github.com/facebook/react): JavaScript library for building user interfaces.
- [tailwindcss](https://github.com/tailwindlabs/tailwindcss): Utility-first CSS framework for styling components.

## 📝 Project Summary

- [.github](.github): GitHub workflows for CI/CD automation.
- [components](components): Reusable UI components for building the application.
- [lib](lib): Utility libraries or modules used throughout the project.
- [pages](pages): Main pages of the application, including admin and student pages.
- [pages/admin](pages/admin): Admin-related pages such as data tables.
- [pages/booking](pages/booking): Booking-related pages for adding and managing bookings.
- [pages/students](pages/students): Student-related pages for adding managing student data.
- [prisma](prisma): Database ORM migrations and models for data manipulation.
- [public](public): Publicly accessible assets and static files.
- [styles](styles): Global stylesheets and CSS modules for styling the application.

Note: The directories are listed in alphabetical order.

## ⚙️Environment Variables

- DATABASE_URL: URL for the postgres database
- DIRECT_URL: Direct url of the database for dev jobs
- CLERK_SECRET_KEY: Clerk private API key
- RESEND_API_KEY: Resend api key for sending emails
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: Clerk public API key
- NEXT*PUBLIC_CLERK*...: Environmental variables for defining clerk behavior

## 🚀 Run Locally

0. Install [Node.js](https://nodejs.org/en/)

1.Clone the virtue-gymnastics-website repository:

```sh
git clone https://github.com/RCNOverwatcher/virtue-gymnastics-website
```

2.Install the dependencies:

```bash
npm install
```

3.Start the development mode:

```bash
npm run dev
```

## 🙌 Contributors

<table style="border:1px solid #404040;text-align:center;width:100%">
<tr><td style="width:14.29%;border:1px solid #404040;">
        <a href="https://github.com/RCNOverwatcher" spellcheck="false">
          <img src="https://avatars.githubusercontent.com/u/49075095?v=4?s=100" width="100px;" alt="RCNOverwatcher"/>
          <br />
          <b>RCNOverwatcher</b>
        </a>
        <br />
        <a href="https://github.com/RCNOverwatcher/virtue-gymnastics-website/commits?author=RCNOverwatcher" title="Contributions" spellcheck="false">
          All of the contributions
        </a>
      </td></table>

## 📄 License

This project is licensed under the **MIT License** - see the [**MIT License**](https://github.com/RCNOverwatcher/virtue-gymnastics-website/blob/main/LICENSE) file for details.
