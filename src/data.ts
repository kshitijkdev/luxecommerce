import type { Product, Order } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1, name: "Meridian Chronograph", brand: "LuxeTime", price: 24500, originalPrice: 32000,
    category: "Watches", rating: 4.8, reviews: 128, image: "⌚", color: "#064E3B",
    desc: "Swiss-made automatic movement with 48-hour power reserve. Sapphire crystal glass, 100m water resistance.",
    specs: { movement: "Automatic ETA 2824", waterResistance: "100m", powerReserve: "48 hours", caseDiameter: "42mm", material: "316L Stainless Steel" },
    badge: "Bestseller"
  },
  {
    id: 2, name: "Noir Leather Wallet", brand: "CraftHaus", price: 3200, originalPrice: 4500,
    category: "Accessories", rating: 4.6, reviews: 89, image: "👜", color: "#1E3A5F",
    desc: "Full-grain leather bifold wallet with RFID blocking technology. 8 card slots, 2 bill compartments.",
    specs: { material: "Full-grain Calfskin", slots: "8 card + 2 bill", feature: "RFID Blocking", origin: "Italian Leather", weight: "85g" },
    badge: "New"
  },
  {
    id: 3, name: "Obsidian Sunglasses", brand: "VistaPro", price: 8750, originalPrice: 11000,
    category: "Eyewear", rating: 4.9, reviews: 214, image: "🕶️", color: "#1A1A2E",
    desc: "Polarized UV400 lenses with titanium frames. Featherweight design for all-day comfort.",
    specs: { lenses: "Polarized UV400", frame: "Grade 5 Titanium", weight: "28g", coating: "Anti-scratch + Anti-reflective", origin: "Japan" },
    badge: "Top Rated"
  },
  {
    id: 4, name: "Velvet Eau de Parfum", brand: "Essence & Co", price: 6800, originalPrice: 8500,
    category: "Fragrance", rating: 4.7, reviews: 67, image: "🫙", color: "#4A1942",
    desc: "A rich oud-infused fragrance with notes of black rose, amber, and sandalwood. 12-hour longevity.",
    specs: { concentration: "Eau de Parfum", volume: "100ml", notes: "Oud, Black Rose, Amber", longevity: "12 hours", origin: "France" },
    badge: null
  },
  {
    id: 5, name: "Carbon Slim Case", brand: "ShieldTech", price: 2100, originalPrice: 2800,
    category: "Tech", rating: 4.5, reviews: 312, image: "📱", color: "#2D2D2D",
    desc: "Military-grade drop protection with aerospace carbon fibre. Compatible with iPhone 15 Pro lineup.",
    specs: { material: "Carbon Fibre + TPU", protection: "MIL-STD-810G", compatibility: "iPhone 15 Pro / Max", wireless: "MagSafe Compatible", weight: "32g" },
    badge: "Sale"
  },
  {
    id: 6, name: "Nomad Weekender Bag", brand: "TravelLux", price: 18900, originalPrice: 24000,
    category: "Bags", rating: 4.8, reviews: 45, image: "🎒", color: "#2E1B0E",
    desc: "Vegetable-tanned leather weekender with brass hardware. Fits 3-4 days of essentials with shoe compartment.",
    specs: { material: "Veg-tanned Leather", capacity: "32L", compartments: "3 main + 2 pockets", hardware: "Solid Brass", origin: "Florence, Italy" },
    badge: "Limited"
  },
];

export const ORDERS: Order[] = [
  { id: "LX-20240312-001", date: "12 Mar 2024", status: "Delivered", items: [PRODUCTS[0]], total: 24500, tracking: "FX7823991IN" },
  { id: "LX-20240228-002", date: "28 Feb 2024", status: "In Transit", items: [PRODUCTS[2], PRODUCTS[1]], total: 11950, tracking: "DL4421007IN" },
  { id: "LX-20240115-003", date: "15 Jan 2024", status: "Delivered", items: [PRODUCTS[5]], total: 18900, tracking: "FX6103884IN" },
];

export const fmt = (n: number): string => `RS. ${n.toLocaleString('en-IN')}`;
