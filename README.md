# DiKampusin - Student Information Management System

**DiKampusin** is a comprehensive student management prototype platform specifically designed to facilitate student data administration. It prioritizes multi-layered security, agile performance, and cutting-edge design aesthetics featuring a *Glassmorphism* style.

---

## Architecture & Technical Decisions

This project's development adheres to the **Modern Web Stack** standard, where the frontend, server, and database seamlessly integrate into a cohesive execution formation. The core implementation foundations are:

1. **Next.js (App Router) & React 19**
   - The majority of layouts and data fetching are executed using pure *Server-Side Rendering* (SSR) to reduce browser load times and achieve maximum SEO scalability.
   - Reactive **Server Actions** are utilized for data manipulation forms (Create, Update, Delete) to execute logic on the server side without needing traditional `/api` endpoints. This makes component communication direct, instant, and *type-safe*.

2. **Supabase (@supabase/ssr) & PostgreSQL**
   - The architecture for processing and authenticating data relies entirely on the Supabase instance (BaaS).
   - Utilizing the SSR library package ensures that *session auth cookies* are handled securely and seamlessly within *Middleware*, as well as during the pre-rendering phase when verifying user states (Logged In or Logged Out).
   - The system does not require a separate server for security logic, as data protection is enforced through Supabase's RLS (*Row Level Security*) schema.
   
3. **Tailwind CSS v4 & Experiential User Experience (UX)**
   - Styling implementation utilizes the latest V4 optimization methods with a zero-config-file architecture.
   - **Glassmorphism Concept**: To avoid rigid tabular data displays, the interface is wrapped in a "Midnight Indigo" aesthetic using a combination of the CSS `backdrop-blur` property, radial gradients, and translucent glass color palettes that react fluidly in both color modes (*dark/light mode*).

4. **Server-Side Searching & Pagination Synchronization**
   - Performance-heavy computing operations (such as filtering, counting, and limiting dozens of student data records) are implemented using an URL parameter approach (*Search Params* like `?page=x&q=name`). This pattern makes search history easily shareable (*shareable link*) compared to letting data pile up in the client-side browser memory state.

5. **Software Architecture Pattern (Serverless MVC)**
   - The project applies a modernized iteration of the **MVC** (Model-View-Controller) pattern adapted specifically for React Server Components, also resembling a *Backend-For-Frontend* (BFF) layout.
   - **View (Presentation):** React Components (`app/`, `components/`) act purely as the user interface rendering engine.
   - **Controller (Logic):** Next.js Server Actions (`app/actions/`) handle direct business validations and request interceptors.
   - **Model (Data):** Supabase (PostgreSQL) encapsulates data storage, column-level unique constraints, and schema definitions.

---

## How to Run the Project (Local Development)

This local setup guide will help you configure the environment so you can start modifying and securely running this application on your personal browser.

### 1. Prerequisites
Ensure your machine's ecosystem has the following software installed:
- **Node.js** (Minimum version v18.x+ highly recommended)
- **NPM / Bun / Yarn** (as the *Package Manager*)

### 2. Clone the Repository
Run this command in your Operating System's Command Prompt or Terminal:
```bash
git clone https://github.com/ggghart/Dikampusin---Sistem-Manajemen-Data-Pengguna-dan-Mahasiswa.git
cd Dikampusin---Sistem-Manajemen-Data-Pengguna-dan-Mahasiswa
```

### 3. Environment Variables Configuration
Duplicate or create a file named `.env.local` in the **root directory** of the program and paste the authorization keys for this project's Supabase database service.

```env
NEXT_PUBLIC_SUPABASE_URL=https://xmamumrpvbgosonsjiwk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtYW11bXJwdmJnb3NvbnNqaXdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMTczNTQsImV4cCI6MjA5MDg5MzM1NH0.YmXJUKhA4Y5JwUYEOX3E6jgmjm-51OY_vKCOTqHzAsE
```

### 4. Install Dependencies
Begin downloading all related software packages listed in the `package.json`:
```bash
npm install
```

### 5. Start the Live Development Server
Once successfully installed, compile the application engine via the dev script:
```bash
npm run dev
```

### 6. Successfully Compiled!
Now launch your favorite Web Browser (like Chrome/Edge/Safari) and visit the development server entry point:
**[http://localhost:3000](http://localhost:3000)**

---
*© 2026 DiKampusin. All rights reserved.*
