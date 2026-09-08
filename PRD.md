# Product Requirement Document (PRD): Calam Hotel Management System (Calam PMS)

> **Document Type:** Product Requirement Document (PRD) for Landing Page Generation  
> **Product Name:** Calam PMS (Calam Hotel & Resort Operating System)  
> **Version:** 1.0.0 (Production-Ready)  
> **Primary Use Case:** Feed this document into AI/GPT to generate a high-converting, modern, and structured SaaS Landing Page.

---

## 1. Executive Summary & Product Vision

### 1.1 Product Overview
**Calam PMS** is an all-in-one, modern cloud-based Property Management System (PMS) and Hotel Operating Platform designed specifically for boutique hotels, luxury resorts, villas, and independent accommodation operators. 

It unifies front-desk operations, real-time visual reservation calendars, multi-channel booking management, room inventory, housekeeping workflows, guest CRM, multi-method payment centers, reputation/review management, and executive analytics into a single, cohesive, ultra-responsive dashboard.

### 1.2 Value Proposition & Core Taglines
- **Primary Tagline:** *"The Modern Operating System for Next-Generation Hospitality."*
- **Secondary Tagline:** *"Streamline operations, delight guests, and maximize RevPAR—all from one intuitive platform."*
- **Core Promise:** Eliminates double-bookings, speeds up guest check-ins by 70%, synchronizes housekeeping in real-time, and provides hotel owners with crystal-clear financial and occupancy metrics.

### 1.3 Target Audience & Ideal Customer Profile (ICP)
1. **Boutique Hotel & Resort Owners:** Need birds-eye operational clarity, revenue tracking, and automated reporting without clunky legacy software.
2. **General Managers (GMs) & Operations Heads:** Want seamless team coordination across front desk, housekeeping, and finance.
3. **Front Desk Agents & Receptionists:** Need a fast, error-free check-in/out workflow and an interactive reservation calendar.
4. **Housekeeping Supervisors:** Need live room cleaning statuses and instant room turnover notifications.
5. **Hospitality Finance & Accounting Teams:** Need automated invoicing, transaction auditing, and multi-payment reconciliation (QRIS, Cards, Bank Transfers, OTA Virtual Cards).

---

## 2. Market Problems & Calam's Solutions

| Problem in Legacy Systems | Calam PMS Modern Solution |
| :--- | :--- |
| **Fragmented Software Silos:** Front desk, housekeeping, and finance use disconnected tools or manual spreadsheets. | **Unified All-In-One Hub:** Single source of truth linking bookings, rooms, guests, payments, and staff in real-time. |
| **Clunky, Outdated UIs:** Legacy systems from the 2000s are slow, confusing, and require weeks of staff training. | **Consumer-Grade Modern UX:** Fast, sleek interface with light/dark themes, intuitive shortcuts, and instant search. |
| **Double-Booking & Calendar Chaos:** Hard-to-read calendars lead to overbooking and guest friction. | **Interactive Visual Timeline:** 1-year jumper, daily/weekly/monthly timeline views, instant conflict prevention. |
| **Manual Payment Reconciliation:** Difficult to track deposits, partial payments, and multi-channel invoices. | **Integrated Payment Center:** Real-time transaction statuses (Paid, Partial, Refunded, Unpaid) with one-click invoices. |
| **Delayed Housekeeping Updates:** Front desk calls housekeeping via walkie-talkie or WhatsApp to check room readiness. | **Live Housekeeping Sync:** Real-time room status updates (Available, Cleaning, Occupied, Maintenance) across all screens. |
| **Scattered Guest Reviews:** Missing OTA reviews leads to poor online reputation and lower search ranking. | **Centralized Review Management:** Consolidated reviews from Google, Traveloka, Booking.com, and Agoda with reply templates. |

---

## 3. Comprehensive Feature Breakdown & Modules

### Module 1: Executive Dashboard & Analytics
- **Live KPI Metrics:** Real-time cards displaying Occupancy Rate, Total Revenue, Check-Ins Today, Check-Outs Today, and Net Operating Profit.
- **Visual Analytics:** Interactive Recharts graphs showing 12-month revenue performance and weekly occupancy trends.
- **Arrivals & Departures Tracker:** Live front-desk queue showing today's guest arrivals, room numbers, and payment readiness.
- **Recent Activity Feed:** Real-time audit log of new bookings, payments collected, and staff actions.

### Module 2: Interactive Reservation Calendar
- **Dynamic Multi-View Timeline:** Instant switching between **Daily**, **Weekly**, and **Monthly (12-Month Full Year)** grid views.
- **1-Year Quick Month Selector:** Effortless single-click navigation across the entire calendar year.
- **Visual Room Blocks:** Interactive floating reservation chips color-coded by occupancy, showing guest names and booking spans.
- **Room Type Filter:** Quick filter by room category (Standard, Deluxe, Suite).
- **Reservation Details Modal:** Instant click-to-view modal with guest info, stay dates, booking ID, payment status, and total amount.

### Module 3: Booking & Reservation Engine
- **Centralized Booking Ledger:** Complete records with booking codes (e.g., `BK-1042`), guest names, room assignments, stay duration, and channel source.
- **Multi-Channel Source Tracking:** Tracks direct website reservations, walk-ins, OTA channels (Traveloka, Agoda, Booking.com).
- **Status Workflows:** Filter bookings by `Confirmed`, `Pending`, `Checked-in`, `Checked-out`, or `Cancelled`.
- **Create & Edit Booking Modals:** Quick booking modal with automated room assignment, date picker, and pricing calculation.
- **One-Click CSV Export:** Export filtered bookings directly to `.csv` for external reporting and auditing.

### Module 4: Front-Desk Check-In & Check-Out Hub
- **Rapid Check-In Workflow:** Search by guest name or booking code, verify identity number, assign room keys, and mark as checked-in.
- **Instant Check-Out & Folio Balance:** Real-time payment verification before check-out, ensuring no outstanding bills remain unpaid.
- **Late Check-Out & Early Check-In Support:** Flexible status tagging for smoother guest arrival handling.

### Module 5: Room & Inventory Management
- **Room Grid & Floor Organization:** Visual room directory grouped by floor and category (Standard, Deluxe, Suite).
- **4-State Room Status Engine:** `Available`, `Occupied`, `Cleaning`, and `Maintenance`.
- **Room Configuration:** Base price per night, guest capacity limits, amenities management (WiFi, AC, Bathtub, City View, Minibar).
- **Create / Edit Room Modal:** Add new rooms or update room numbers and pricing in seconds.

### Module 6: Guest CRM & Guest Profiles
- **Guest Database:** Centralized guest ledger with phone numbers, emails, identity/passport numbers, and custom guest notes.
- **Stay & Spend History:** View all past and upcoming reservations tied to a specific guest.
- **VIP & Preference Tagging:** Record special guest preferences, allergies, and anniversary requests.
- **Add Guest Modal & CSV Export:** Add walk-in guests or export guest lists for email marketing campaigns.

### Module 7: Live Housekeeping & Room Turnover
- **Housekeeping Board:** Real-time view of rooms requiring cleaning, in-progress tasks, and completed inspections.
- **Staff Assignment:** Assign specific housekeeping staff to rooms or floors.
- **Priority Cleaning Flags:** Prioritize rooms with incoming guests waiting at the lobby.

### Module 8: Payment Center & Invoicing
- **Multi-Method Payment Support:** Cash, Credit Card, Bank Transfer, QRIS, and OTA Virtual Cards.
- **Status Tracking:** Accurate ledger for `Paid`, `Partial`, `Refunded`, and `Unpaid` transactions.
- **Instant Invoicing:** Download or preview customer receipts and tax invoices.
- **Note Payment Modal:** Manually log received deposits or split payments with transaction reference IDs.
- **Financial Export:** Export all transaction records to CSV for accounting software (Xero, QuickBooks, Accurate).

### Module 9: Multi-Channel Review & Reputation Management
- **Aggregated Review Inbox:** Centralize feedback from Google Reviews, Traveloka, Booking.com, and Agoda.
- **Star Rating Breakdown:** 1 to 5-star ratings with visual badges.
- **Pre-Built Response Templates:** One-click response templates for thanking positive guests or addressing concerns professionally.
- **Review Flagging:** Mark urgent complaints for General Manager escalation.

### Module 10: Staff Management & Permissions
- **Role-Based Access Control (RBAC):** Distinct permission levels for `Owner`, `Manager`, `Receptionist`, `Housekeeping`, `Finance`, and `Marketing`.
- **Staff Directory:** Manage staff contact info, assigned roles, and activity status.
- **Add Staff Modal:** Easily onboard new team members.

### Module 11: Security, Auth & Profile Settings
- **Enterprise Authentication:** Firebase Authentication supporting **Sign in with Google**, **Sign in with Apple**, and Email/Password.
- **Protected Routing & Session Persistence:** Secure local and cloud auth state management.
- **User Profile Management:** Update First/Last name, Avatar, Phone number, and Bio.
- **In-App Password Updates:** Secure re-authentication flow to change account passwords.
- **App Preferences:** Multi-language support (Bahasa Indonesia, English) and Timezone selection (WIB, WITA, WIT).
- **Sleek Light & Dark Theme:** Full native Dark Mode toggle with customized HSL color tokens.

---

## 4. Key Differentiators & Competitive Advantages

1. **Lightning-Fast Single-Page App (SPA):** Built with React 18 + Vite for instantaneous transitions without page reloads.
2. **Zero Learning Curve UX:** Designed with clean typography (Outfit / Inter), cohesive spacing, and micro-interactions that feel like high-end consumer apps (Linear / Notion).
3. **True All-in-One Architecture:** Eliminates the need for 5 separate SaaS subscriptions (PMS + Housekeeping App + Review Manager + Invoicing Tool + Analytics Dashboard).
4. **Mobile & Tablet Responsive:** Front desk staff can operate on iPads or desktop PCs with equal speed and convenience.
5. **Local-First & Cloud-Ready Database:** Prisma ORM backed by SQLite locally and PostgreSQL/Supabase in production for maximum data integrity.

---

## 5. Recommended Landing Page Blueprint (For AI / GPT Prompting)

When generating the Landing Page for Calam PMS, structure the page with the following conversion-optimized sections:

### Section 1: Hero Section (High Impact)
- **Badge:** `✨ Next-Gen Cloud PMS for Boutique Hotels & Resorts`
- **Headline (H1):** *"The Modern Operating System for Next-Generation Hospitality."*
- **Subheadline:** *"Stop juggling spreadsheets and clunky legacy software. Calam unites front-desk check-ins, interactive calendars, live housekeeping, and automated payments into one beautiful dashboard."*
- **Primary CTA:** `Start Free 14-Day Trial` (No credit card required)
- **Secondary CTA:** `Book a Live Demo` (or `Interactive Preview`)
- **Visual:** High-resolution mockup of Calam's Dashboard showing the Revenue Chart, Reservation Calendar, and Dark Mode toggle.

### Section 2: Social Proof & Trust Bar
- **Headline:** *"Trusted by 250+ Boutique Hotels, Luxury Villas, and Resorts across Southeast Asia"*
- **Logos:** Boutique hotel brand placeholders, OTA partner badges (Google, Traveloka, Agoda, Booking.com certified integration).

### Section 3: The 4 Core Pillars / Bento Grid
1. **Interactive Visual Calendar:** *"Never overbook again. Seamless multi-month timeline navigation."*
2. **Instant Front-Desk Check-In:** *"Check in guests in under 30 seconds with automated key tracking."*
3. **Live Housekeeping Sync:** *"Room turnover speed increased by 40% with real-time floor updates."*
4. **Automated Payment Center:** *"Reconcile QRIS, Cards, and OTA Virtual Cards effortlessly."*

### Section 4: Deep-Dive Feature Tabs (Interactive Module Showcase)
- Tab 1: **Front Desk & Calendar** (Show timeline and booking modals)
- Tab 2: **Housekeeping & Rooms** (Show room cards and cleaning checklists)
- Tab 3: **Payments & Invoicing** (Show transaction ledger and invoice generation)
- Tab 4: **Reputation & Reviews** (Show multi-channel review inbox and AI templates)
- Tab 5: **Analytics & Reports** (Show occupancy charts, RevPAR metrics, CSV export)

### Section 5: Quantifiable ROI / Key Metrics Banner
- **70% Faster** Guest Check-in time
- **0%** Double-booking errors guaranteed
- **+18% Average Increase** in direct booking revenue
- **4.9 / 5.0** Operational efficiency rating from GMs

### Section 6: Testimonials / Case Studies
- Testimonial from a Boutique Hotel Owner in Bali / Bandung praising the simplicity and modern design.
- Testimonial from a Front Desk Manager praising how easy it was to train staff in under 15 minutes.

### Section 7: Transparent Pricing Table
- **Starter (1 - 15 Rooms):** For boutique villas and bed & breakfasts. Includes Calendar, Bookings, Front Desk.
- **Pro (16 - 50 Rooms) - [Most Popular]:** For boutique hotels and resorts. Adds Housekeeping, Payment Center, Reviews, Staff Roles, CSV Export.
- **Enterprise (50+ Rooms / Chains):** Multi-property management, custom API access, dedicated account manager, 99.99% uptime SLA.

### Section 8: Frequently Asked Questions (FAQ)
- Can I migrate my existing bookings from Excel/another PMS?
- Does it support Indonesian payment methods like QRIS and Bank Transfers?
- How long does it take to train front-desk staff?
- Is my hotel data secure? (Explain Firebase Auth and database encryption).
- Can I access Calam on an iPad or tablet?

### Section 9: Final High-Converting CTA Section
- **Headline:** *"Ready to upgrade your hotel operations to the modern era?"*
- **Subheadline:** *"Join hundreds of forward-thinking hotel operators saving hours every day with Calam PMS."*
- **Buttons:** `Get Started Free` | `Schedule a 15-Minute Demo`

---

## 6. Tone & Brand Voice Guidelines for Copywriting
- **Tone:** Premium, Professional, Modern, Trustworthy, Efficient, Hospitality-Centric.
- **Avoid:** Overly complex technical jargon, boring legacy corporate speak, or generic buzzwords without clear benefits.
- **Highlight:** Speed, visual elegance, error reduction, staff happiness, and increased guest satisfaction.
