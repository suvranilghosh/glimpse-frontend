# Glimpse: Lead Management System

Glimpse is a full-stack Lead Management System designed for sales teams to track, filter, and manage leads effectively. It features a clean UI with dynamic filtering, sorting, and secure authentication.

## Live Deployment

Access the live app here: **[https://glimpse-frontend-git-main-neils-projects-2a8fd08d.vercel.app/](https://glimpse-frontend-git-main-neils-projects-2a8fd08d.vercel.app/)**

## Tech Stack

### Frontend

- [Next.js 14](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN/UI](https://ui.shadcn.com/) – UI components
- Axios – HTTP client
- Cookies (js-cookie) – Auth persistence

### Backend

- [Express.js](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/) – Token-based authentication
- Bcrypt – Password hashing
- CORS – Cross-origin support

## Features

- User registration and JWT-based login
- CSV import for bulk lead entry
- Lead filtering by source, interest level, and status
- Search by lead name (case-insensitive)
- Pagination for large datasets
- Sorting by interest level and creation date
- Visual interest indicators using badges
- Responsive UI with mobile support
- Full error handling and field validation

## Project Structure

```
glimpse/
├── backend/ # Express + Prisma server
│ ├── prisma/ # Prisma schema & migrations
│ └── index.ts # Main Express app
├── frontend/ # Next.js + ShadCN UI
│ ├── components/ # UI & shared components
│ ├── pages/ # Next.js pages (sign-in, dashboard)
│ └── lib/ # Types, utils, API helpers
└── README.md
```
