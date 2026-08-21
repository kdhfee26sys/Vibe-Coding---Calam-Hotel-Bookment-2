# Database Architecture

## 1. Database Selected
**Database:** PostgreSQL (via Supabase)
**Reason:** 
The project is a React SPA for a hotel administration dashboard (`calam-admin`), requiring complex relational data (users, rooms, bookings, payments, reviews). PostgreSQL is the ideal choice for structured relationships and transactions. Supabase was chosen as the BaaS platform because the project already includes `@supabase/supabase-js` as a dependency, making it the most seamless and appropriate integration without needing to maintain a separate Node.js backend. It also natively supports Row Level Security (RLS) for fine-grained authorization.

## 2. Technology Stack
* **Database Platform:** Supabase (PostgreSQL)
* **ORM / Database Toolkit:** `@supabase/supabase-js` (Native Client)
* **Migrations / CLI:** Supabase CLI
* **Types:** TypeScript definitions mapped directly to the database schema

## 3. Implemented Database Schema
The schema accurately reflects the domain models required by the PRD for hotel operations:
* `profiles` (extends `auth.users`): Manages staff/user roles (owner, manager, receptionist, housekeeping, finance, marketing).
* `room_types`: Categories of rooms (e.g., Standard, Deluxe) with base prices and capacities.
* `rooms`: Individual rooms associated with a room type, tracking their status (available, occupied, cleaning, maintenance).
* `guests`: Guest profiles with contact information and identity numbers.
* `promotions`: Discount codes for marketing campaigns.
* `bookings`: Reservation records with check-in/out dates, status, and total amount.
* `booking_items`: The specific rooms attached to a booking.
* `payments`: Payment records linked to bookings.
* `reviews`: Guest reviews tied to bookings.

## 4. Local Database Setup

Make sure you have Docker installed and running on your machine to run the local Supabase stack.

### 4.1 Start the database
```bash
npm run db:start
```
This will start the local Supabase container, apply the migrations, and insert the seed data automatically.

### 4.2 Generate Types
If you change the schema (add new tables/columns), regenerate the TypeScript definitions using:
```bash
npm run db:types
```

### 4.3 Reset Database
To drop the schema, re-run all migrations, and re-seed the database:
```bash
npm run db:reset
```

## 5. Environment Variables
The `.env` file should contain your Supabase connection strings.
```env
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```
For local development, these values are automatically provided when running `npm run db:start`.
For production, update these with the credentials from your hosted Supabase dashboard.

## 6. Accessing Data (Data Layer)
The database client is configured in `src/lib/supabase.ts`.

Example of data fetching in a component/hook:
```typescript
import { supabase } from '../lib/supabase';

// Fetch all available rooms
const { data: rooms, error } = await supabase
  .from('rooms')
  .select('*, room_types(name, base_price)')
  .eq('status', 'available');
```

## 7. Security and RLS
Row Level Security (RLS) policies have been initialized. For the MVP, they are set to allow authenticated users to perform operations. When preparing for production, you should refine these policies in the migration files to restrict access based on the `role` defined in the `profiles` table. No secrets are exposed to the frontend, only the anon key is used.
