<div align="center">

# 🎂 Birthday Wish - Personalized Birthday Celebration Platform

### Create Magical Birthday Experiences with Countdown Timers, Custom Cards & Celebrations

[![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

<img src="https://github.com/shawkath646/birthday-wish/blob/main/src/app/opengraph-image.png?raw=true" alt="Birthday Wish Platform" width="800">

[Live Demo](https://birthday-wish-eight.vercel.app/) · [Report Bug](https://github.com/shawkath646/birthday-wish/issues) · [Request Feature](https://github.com/shawkath646/birthday-wish/issues)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Purpose](#-purpose)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Routes & Pages](#-routes--pages)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Architecture](#-architecture)
- [Author](#-author)
- [Made By](#-made-by)

---

## 🎯 About

**Birthday Wish** is a modern, fully-featured web application designed to create personalized birthday experiences for your loved ones. Built with Next.js 16, React 19, and cutting-edge web technologies, this platform offers countdown timers, custom birthday cards, interactive celebrations, and fun games - all wrapped in a beautiful, responsive interface with stunning animations.

Designed with love and attention to detail, Birthday Wish allows you to send heartfelt wishes seamlessly from anywhere in the world. Whether it's a countdown to the big day, a personalized card with custom themes and messages, or an interactive celebration with confetti and balloons, this platform makes birthdays extra special.

**Keywords**: Birthday Wishes, Online Birthday Card, Birthday Countdown Timer, Personalized Birthday, Virtual Birthday Celebration, Birthday Animation, Custom Birthday Cards, Interactive Birthday Games, Next.js Birthday App

---

## 🎨 Purpose

Sometimes, the birthday of a beloved individual arrives, and it's important to extend heartfelt wishes from afar. As a web developer, given the physical distance of a thousand miles, I chose to convey my wishes remotely. Therefore, I created this application, adorned with captivating concepts and animations, to express heartfelt birthday wishes.

**This platform serves multiple purposes:**

- **Personal Connection**: Bridge distances and make loved ones feel special on their birthday
- **Creative Expression**: Customize cards with themes, fonts, colors, and personal messages
- **Interactive Experience**: Engage with countdown timers, virtual cake, balloon games, and celebrations
- **Memory Preservation**: Store and share custom birthday cards with unique links
- **Preview Mode**: Test the entire experience before sharing with the birthday person
- **Modern Architecture**: Demonstrates Next.js 16 best practices with server components and server actions

---

## ✨ Features

### 🎁 **Core Features**

- ✅ **Countdown Timer** - Real-time countdown to birthday with beautiful digit animations
- ✅ **Custom Card Creator** - Design personalized birthday cards with:
  - 6 unique themes (Modern, Classic, Playful, Elegant, Vibrant, Minimalist)
  - 6 font styles (Roboto, Playfair, Pacifico, Montserrat, Dancing Script, Courier)
  - Color picker for personalized styling
  - Custom image upload support
  - Personal message customization
- ✅ **Default Cards** - 10 pre-designed birthday cards from curated collection
- ✅ **Interactive Celebration** - Birthday animation with:
  - Full-screen confetti effects
  - Floating emoji particles
  - Animated birthday message
  - Background music with mute toggle
- ✅ **Virtual Cake** - Interactive birthday cake with candles to blow out
- ✅ **Balloon Game** - Fun balloon-popping mini-game
- ✅ **Goodbye Message** - Beautiful farewell animation to end the experience

### 🔐 **Advanced Features**

- ✅ **Preview Mode** - Test the entire flow before sharing (uses cookies, no database)
- ✅ **Database Storage** - Save cards and user data via CloudBurst Lab API
- ✅ **Shareable Links** - Generate unique URLs for each birthday person
- ✅ **Cookie-based Sessions** - Persistent user experience across pages
- ✅ **Route Handlers** - API route for setting cookies and redirects
- ✅ **Server Actions** - Server-side data fetching with getUserData action

### 🎨 **User Experience**

- ✅ **Responsive Design** - Seamless experience on mobile, tablet, and desktop
- ✅ **Smooth Animations** - Powered by Framer Motion for delightful interactions
- ✅ **Sound Effects** - Background music and audio controls
- ✅ **Accessibility** - WCAG 2.1 compliant with semantic HTML and ARIA labels
- ✅ **SEO Optimized** - OpenGraph tags, Twitter Cards, and dynamic metadata
- ✅ **Fast Performance** - Server-side rendering and optimized client components

### 🚀 **Technical Excellence**

- ✅ **Next.js 16+ Architecture** - Proper server/client component separation
- ✅ **Server-First Data Flow** - All data processing on server, props-based client rendering
- ✅ **Zero Client-Side Storage Reads** - No localStorage operations in client components
- ✅ **Component Co-location** - Components organized within their route folders
- ✅ **Type Safety** - Full TypeScript coverage with strict mode
- ✅ **Modern React 19** - Latest React features and patterns

---

## 🛠️ Technology Stack

### **Frontend**

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

</div>

- **Next.js 16.0.7** - React framework with App Router and Server Components
- **React 19.2.1** - Latest React with enhanced performance
- **TypeScript 5.x** - Type-safe development
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion 12.x** - Production-ready animations
- **React Hook Form 7.68** - Performant form validation
- **React Confetti 6.4** - Celebration confetti effects
- **Digital Digit 2.0** - Animated countdown digits

### **Backend & Services**

<div align="center">

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![CloudBurst Lab](https://img.shields.io/badge/CloudBurst_Lab-4285F4?style=for-the-badge&logo=cloud&logoColor=white)

</div>

- **CloudBurst Lab API** - Custom birthday data storage and management
- **Server Actions** - Next.js server-side data fetching
- **Route Handlers** - API endpoints for cookie management and redirects
- **Vercel Analytics** - Real-time performance monitoring

### **DevOps & Tools**

- **Turbopack** - Fast development builds
- **PostCSS** - CSS processing and optimization
- **Vercel** - Deployment platform with edge functions
- **Git** - Version control

---

## 📁 Project Structure

```
birthday-wish/
├── 📂 src/
│   ├── 📂 actions/              # Server actions
│   │   ├── cloudburstStorage.ts # CloudBurst API integration
│   │   └── getUserData.ts       # Fetch user data server action
│   │
│   ├── 📂 app/                  # Next.js App Router
│   │   ├── page.tsx             # Home page (server component)
│   │   ├── HomeClient.tsx       # Home page client wrapper
│   │   ├── layout.tsx           # Root layout
│   │   ├── robots.ts            # Robots.txt config
│   │   ├── sitemap.ts           # Dynamic sitemap
│   │   │
│   │   ├── 📂 timer/            # Countdown timer route
│   │   │   ├── page.tsx         # Server component
│   │   │   ├── TimerClient.tsx  # Client wrapper
│   │   │   └── Timer.tsx        # Timer component
│   │   │
│   │   ├── 📂 celebrate/        # Birthday celebration route
│   │   │   ├── page.tsx         # Server component
│   │   │   ├── CelebrateClient.tsx # Client wrapper
│   │   │   └── HappyBirthday.tsx   # Celebration animation
│   │   │
│   │   ├── 📂 messages/         # Birthday cards route
│   │   │   ├── page.tsx         # Server component
│   │   │   ├── MessagesClient.tsx  # Client wrapper
│   │   │   ├── Message.tsx      # Cards display
│   │   │   ├── VirtualCake.tsx  # Interactive cake
│   │   │   ├── BalloonGame.tsx  # Balloon game
│   │   │   └── CardCreator.tsx  # Card creation form
│   │   │
│   │   ├── 📂 goodbye/          # Farewell route
│   │   │   ├── page.tsx         # Server component
│   │   │   ├── GoodbyeClient.tsx # Client wrapper
│   │   │   └── GoodBye.tsx      # Goodbye animation
│   │   │
│   │   └── 📂 r/                # Redirect route
│   │       └── route.ts         # Cookie setter and redirect handler
│   │
│   ├── 📂 components/           # Shared components
│   │   └── BirthdayBox.tsx      # Birthday card component
│   │
│   ├── 📂 JsonData/             # Static data
│   │   └── WishMessages.json    # Default birthday messages
│   │
│   ├── 📂 lib/                  # Third-party configs
│   │   └── cloudburstApi.ts     # CloudBurst API client
│   │
│   ├── 📂 utils/                # Utility functions
│   │   ├── cookies.ts           # Cookie helpers
│   │   └── useWindowSize.ts     # Window size hook
│   │
│   └── 📂 assets/               # Images and static files
│
├── 📂 public/                   # Public static files
│   └── googlec35dc04930fdb16e.html # Google verification
│
├── 📄 next.config.js            # Next.js configuration
├── 📄 tailwind.config.ts        # Tailwind CSS config
├── 📄 tsconfig.json             # TypeScript config
└── 📄 package.json              # Dependencies
```

---

## 🗺️ Routes & Pages

### **Public Routes**

| Route | Description | Features | Type |
|-------|-------------|----------|------|
| `/` | Home page | Card creator, preview mode, database save | Server Component |
| `/timer` | Countdown timer | Real-time countdown to birthday | Server Component |
| `/celebrate` | Birthday celebration | Confetti, animations, music, floating particles | Server Component |
| `/messages` | Birthday cards | Custom cards, default cards, virtual cake, balloon game | Server Component |
| `/goodbye` | Farewell message | Beautiful goodbye animation | Server Component |
| `/r?t=[id]` | Redirect handler | Sets cookie and redirects to timer | Route Handler (GET) |

### **Data Flow Architecture**

```
User Entry → Home Page (Server)
    ↓
Preview Mode:
    → Cookies (is_preview, preview_name, preview_dob)
    → Timer → Celebrate → Messages → Goodbye
    
Database Mode:
    → CloudBurst API (save data)
    → Generate shareable link (/r?t=[id])
    → Share link with birthday person
    → /r route sets cookie (birthday_db_id)
    → Timer → Celebrate → Messages → Goodbye
    
Each Route:
    → Server Component fetches data (getUserData action)
    → Passes data as props to Client Component
    → Client Component handles UI interactions only
    → Zero localStorage operations
```

### **SEO Features**

- **Dynamic Sitemap**: `/sitemap.xml` - All routes with appropriate priorities
- **Robots.txt**: `/robots.txt` - Disallows `/r` route (redirect only)
- **Metadata**: Every page has OpenGraph and Twitter Card metadata
- **Semantic HTML**: Proper HTML5 structure (main, header, section, article)
- **Accessibility**: WCAG 2.1 compliant with ARIA labels

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **CloudBurst Lab Account** (for database storage - optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/shawkath646/birthday-wish.git
cd birthday-wish

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Run development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build & Production

```bash
# Create production build
npm run build

# Start production server
npm run start
```

### Linting

```bash
# Run ESLint
npm run lint
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Application Configuration
NEXT_PUBLIC_APP_BASE_URL=https://yourdomain.com
NEXT_PUBLIC_DATE_OF_BIRTH=2006-12-25
NEXT_PUBLIC_PERSON_NAME=Birthday Person Name

# CloudBurst Lab API Configuration (Optional - for database storage)
CLOUDBURST_API_URL=https://cloudburstlab.vercel.app
APP_ID=birthday-wish
APP_SECRET=your_app_secret_here
```

### Configuration Details

- **NEXT_PUBLIC_APP_BASE_URL**: Your deployed application URL (for shareable links)
- **NEXT_PUBLIC_DATE_OF_BIRTH**: Birthday date in YYYY-MM-DD format (used for countdown)
- **NEXT_PUBLIC_PERSON_NAME**: Name of the birthday person (displayed throughout)
- **CLOUDBURST_API_URL**: CloudBurst Lab API endpoint (server-side only)
- **APP_ID**: Your CloudBurst Lab application ID (server-side only)
- **APP_SECRET**: Your CloudBurst Lab API secret key (server-side only, keep secure)

### Preview Mode (No Database Required)

If you don't configure CloudBurst Lab credentials, the app works perfectly in **preview mode**:
- All features available
- Data stored in cookies only
- No shareable links
- Perfect for testing and personal use

### Database Mode (With CloudBurst Lab)

Configure CloudBurst Lab credentials to enable:
- Permanent card storage
- Shareable birthday links
- Data persistence across sessions

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/shawkath646/birthday-wish)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Manual Deployment Steps

```bash
# Build the application
npm run build

# The build output is in .next folder
# Deploy to your preferred hosting platform
```

### Compatible Platforms

- **Vercel** - Optimal performance with edge functions
- **Netlify** - Full Next.js support
- **AWS Amplify** - Serverless deployment
- **Railway** - Simple deployment with HTTPS
- **Google Cloud Run** - Container-based deployment

---

## 🏗️ Architecture

### **Server-First Architecture**

Birthday Wish follows Next.js 16+ best practices with a server-first approach:

```typescript
// Pattern: Server Component → Client Component → Child Components

// 1. Server Component (page.tsx)
export default async function TimerPage() {
  const userData = await getUserData(); // Server action
  return <TimerClient {...userData} />; // Pass data as props
}

// 2. Client Component (TimerClient.tsx)
'use client';
export default function TimerClient({ personName, dateOfBirth, cards, isPreview }) {
  // Only UI interactions, no data fetching
  return <Timer dateOfBirth={dateOfBirth} isPreview={isPreview} />;
}

// 3. Child Component (Timer.tsx)
'use client';
export default function Timer({ dateOfBirth, isPreview }) {
  // Pure presentational, receives all data as props
  // No localStorage, no data fetching
}
```

### **Key Architectural Decisions**

1. **Server Components**: All route pages are server components
2. **Props-Based Flow**: Data flows server → client via props
3. **Zero Client Storage**: No localStorage reads in client components
4. **Server Actions**: Data fetching with 'use server' directive
5. **Route Handlers**: Cookie management via route.ts API routes
6. **Component Co-location**: Components live in their route folders

### **Data Flow Diagram**

```
┌─────────────────────────────────────────────────────────────┐
│                        User Request                          │
└────────────────────────────┬────────────────────────────────┘
                             ▼
                  ┌──────────────────────┐
                  │   Server Component   │
                  │     (page.tsx)       │
                  └──────────┬───────────┘
                             ▼
                  ┌──────────────────────┐
                  │   getUserData()      │
                  │   Server Action      │
                  └──────────┬───────────┘
                             ▼
                  ┌──────────────────────┐
                  │  Check Cookies       │
                  │  - is_preview        │
                  │  - birthday_db_id    │
                  └──────────┬───────────┘
                             ▼
              ┌──────────────┴──────────────┐
              ▼                             ▼
    ┌─────────────────┐          ┌─────────────────┐
    │  Preview Mode   │          │  Database Mode  │
    │  (from cookies) │          │  (CloudBurst)   │
    └────────┬────────┘          └────────┬────────┘
             │                            │
             └────────────┬───────────────┘
                          ▼
              ┌──────────────────────┐
              │   Return Data        │
              │   as Props           │
              └──────────┬───────────┘
                         ▼
              ┌──────────────────────┐
              │  Client Component    │
              │  (*Client.tsx)       │
              │  - Handles UI only   │
              │  - No data fetching  │
              └──────────┬───────────┘
                         ▼
              ┌──────────────────────┐
              │  Child Components    │
              │  - Pure presentation │
              │  - Props-based       │
              └──────────────────────┘
```

---

## 👨‍💻 Author

**Shawkat Hossain Maruf**

- 🌐 Website: [shawkath646.vercel.app](https://shawkath646.vercel.app)
- 💼 LinkedIn: [linkedin.com/in/shawkath645](https://linkedin.com/in/shawkath645)
- 📧 Email: <shawkath646@gmail.com>
- 🐙 GitHub: [@shawkath646](https://github.com/shawkath646)

**About Me**: Full-stack developer passionate about creating beautiful, performant web applications. This Birthday Wish platform was built with love to make birthdays special for people I care about, demonstrating expertise in modern React, Next.js architecture, and thoughtful UX design.

---

## 🏢 Made By

<div align="center">

<img src="https://cloudburstlab.vercel.app/api/branding/logo?variant=transparent" alt="Cloudburst Lab" width="200" />

**Cloudburst Lab** is a digital innovation studio focused on creating exceptional web and mobile applications. We specialize in modern JavaScript frameworks, cloud technologies, and user-centric design principles.

[Visit CloudBurst Lab](https://cloudburstlab.vercel.app)

</div>

---

## 📄 License

This project is **proprietary** and © 2023-2025 Shawkat Hossain Maruf. All rights reserved.

The source code is available for viewing and learning purposes. For commercial use, collaboration, or inquiries, please contact the author.

---

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Vercel** - For excellent hosting and analytics
- **Framer Motion** - For smooth animations
- **React Confetti** - For celebration effects
- **Open Source Community** - For incredible tools and libraries

---

## 📊 Project Stats

![Next.js](https://img.shields.io/badge/Framework-Next.js_16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?style=flat-square&logo=typescript)
![Performance](https://img.shields.io/badge/Performance-Optimized-brightgreen?style=flat-square)
![SEO](https://img.shields.io/badge/SEO-Optimized-brightgreen?style=flat-square)
![Accessibility](https://img.shields.io/badge/Accessibility-WCAG_2.1-brightgreen?style=flat-square)
![Mobile](https://img.shields.io/badge/Mobile-Responsive-brightgreen?style=flat-square)

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

### 🎂 Make someone's birthday special today!

[Live Demo](https://birthday-wish-eight.vercel.app/) | [Report Issue](https://github.com/shawkath646/birthday-wish/issues) | [Contact Author](mailto:shawkath646@gmail.com)

</div>

- Email: shawkath646@gmail.com

- Occupation: Student

<img  src="https://storage.googleapis.com/sh-cloudburst-labs.appspot.com/cloudburst_lab_logo_transparent.png?GoogleAccessId=firebase-adminsdk-lf84z%40sh-cloudburst-labs.iam.gserviceaccount.com&Expires=4863727974&Signature=B1G9adLuRnjVIxGHoh3dyMVtGsR00KdmatEJRzKpMHPDjgsUX%2Bi9VftAz71puzbFmFsC5xP%2FHZFcBKQ7NBfJbkQzhiuywJMBmOSJlsn7mNfLgZlEsU5ReaNaMXDF6y3W65YeR76u2XBiQjAvVNl%2FEIvMvgbanNJWoDULrxF1OgeF1q8O270oT05ZfzIytLpi7c%2BbBIv6OtmzeUHNa0KJaTX0QPcdesQKFL0pQpaQPncdk6iQtOCOUafgKfQregHwn9iOo1iW1SM4sLw92uJURvLWimyq8JUWjc8J8AXyActsuwQs9IRQz5%2BUjc4k5zVwIS4fQDODvN8t97FDR2Sg7g%3D%3D"  alt="CloudBurst Logo"  height="80" width="150">

*A product of [CloudBurst Lab](https://cloudburstlab.vercel.app)*