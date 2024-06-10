# FinVisual
<img src="https://github.com/anshtrivediaiml/SAAS-Finance-Manager/assets/120239120/080eb114-8a77-4e70-a9bd-131678149c93" width="1200" height="500">
FinVisual is a comprehensive financial management website that allows users to create accounts, categories, and transactions. The dashboard provides visualizations of the user's entire transaction history through various charts, including pie charts, bar charts, radar charts, line charts, area charts, and radial charts. Users can filter the accounts and dates to display metrics on the different charts. Thanks to CodewithAntonio for providing a tutorial of how to build such a web application.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [References](#references)
  

## Features

- Create and manage accounts and categories
- Add and track transactions for specific accounts and categories
- Visualize transaction data with various chart types
- Filter data by accounts and date ranges
- Secure user authentication

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, shadcn-ui
- **Backend**: Next.js,Hono JS
- **Database**: Neon Database with PostgreSQL
- **ORM**: Drizzle ORM
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Authentication**: ClerkAuthentication Agent
- **Deployment**: Vercel

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/anshtrivediaiml/SAAS-finance-manager.git
   cd SAAS-finance-manager
2. Install dependencies
   ```bash
    npm install
3. To generate a database and migrate it to neon
    ```bash
     bun run db:generate
     bun run db:migrate 

3. Run the development server
   ```bash
    npm run dev

## Usage

1. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
2. Sign up or log in using ClerkAuthentication.
3. Create accounts and categories.
4. Add transactions to your accounts.
5. Navigate to the dashboard to visualize your transactions.
6. Use filters to view specific accounts and date ranges.

## Authentication

FinVisual uses ClerkAuthentication Agent for secure user authentication. Ensure you have set up your Clerk API keys in the .env.local file.

## Deployment

The project is deployed on Vercel. To deploy your own instance:

1. Commit your changes to your GitHub repository.
2. Link your repository to Vercel.
3. Set up your environment variables on Vercel.
4. Deploy the project.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## References 

1. [Code with Antonio Youtube Video Link](https://youtu.be/N_uNKAus0II?si=wF7sBaPJaq3Wz0kr)


