 # Portfolio Management Dashboard

 A Next.js-based dashboard for analyzing investment portfolio performance with interactive charts, return summaries, and supporting content.

 ## Features

 - **Portfolio analytics**
   - Equity curve visualization
   - Drawdown chart
   - Monthly and trailing returns views
 - **Data tables**
   - Tabular display of monthly performance
   - Reusable data table component for other datasets
 - **Content & navigation**
   - Blog-style cards for related articles or notes
   - Sidebar layout and page headers for a clean UX
 - **Modern stack**
   - App Router architecture
   - Fully typed with TypeScript

 ## Tech stack

 - **Framework:** Next.js 16, React 19
 - **Language:** TypeScript
 - **Styling:** Tailwind CSS 4
 - **Charts:** D3.js
 - **Testing:** Jest, React Testing Library, jest-dom

 ## Getting started

 ### Prerequisites

 - Node.js 18+ (LTS recommended)
 - npm (or another compatible package manager)

 ### Installation

 ```bash
 npm install
 ```

 ### Run the development server

 ```bash
 npm run dev
 ```

 Then open http://localhost:3000 in your browser.

 ### Build for production

 ```bash
 npm run build
 npm start
 ```

 ### Linting

 ```bash
 npm run lint
 ```

 ### Testing

 Run the test suite:

 ```bash
 npm test
 ```

 Watch mode:

 ```bash
 npm run test:watch
 ```

 If tests are not working due to dependency or peer-dependency issues, reinstall dependencies with:

 ```bash
 npm install --legacy-peer-deps
 ```

 ## Project structure

 ```text
 app/
   layout.tsx          # Root layout
   page.tsx            # Landing page
   portfolios/         # Portfolio analytics pages
 components/
   cards/              # Blog and metric cards
   charts/             # Equity curve & drawdown charts
   tables/             # Monthly returns table
   common/             # Shared UI components (sidebar, headers, data table)
 data/                 # Static data (navigation, blog entries, etc.)
 lib/                  # Utility functions (e.g., nav stats)
 public/               # Static assets
 ```

 ## Scripts

 - `npm run dev` – Start development server
 - `npm run build` – Create production build
 - `npm start` – Run production server
 - `npm run lint` – Lint the codebase
 - `npm test` – Run tests
 - `npm run test:watch` – Run tests in watch mode

