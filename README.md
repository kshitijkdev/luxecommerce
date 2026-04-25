# LuxeCommerce — Premium E-Commerce App

A fully responsive, mobile-first e-commerce application built with **React + Vite + TypeScript**.

## Design System: Emerald & Slate
- **Primary**: Deep Emerald (#064E3B)
- **Font**: Manrope (Google Fonts)
- **Currency**: RS. (Indian Rupee)

## Screens
1. **Sign In** — Email/password + Google/Apple social login
2. **Product Catalog** — Searchable, filterable grid with category tabs
3. **Product Detail** — Specs, description tabs, quantity picker, reviews
4. **Checkout** — Order summary, address, delivery options, price breakdown
5. **Payment** — Card (visual card preview), UPI, Net Banking
6. **Payment Status** — Success (with order tracking) / Failed states
7. **My Orders** — Order history with tracking, expandable cards

## Setup

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── App.tsx              # Root app shell + routing state
├── main.tsx             # Entry point
├── types.ts             # TypeScript interfaces
├── data.ts              # Product/order data + helpers
├── styles.ts            # Design tokens + style helpers
└── components/
    ├── Icon.tsx          # SVG icon system
    ├── SignIn.tsx        # Authentication screen
    ├── ItemsList.tsx     # Product catalog grid
    ├── ItemDetail.tsx    # Product detail view
    ├── Checkout.tsx      # Order summary + address
    ├── Payment.tsx       # Payment methods
    ├── PaymentStatus.tsx # Success/failure screen
    ├── Orders.tsx        # Order history
    └── BottomNav.tsx     # Persistent bottom navigation
```
