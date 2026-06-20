# PantryPal: Your AI Sous-Chef for Smart Cooking

PantryPal is a vision-enabled culinary assistant designed to minimize food waste and eliminate decision fatigue in the kitchen. By leveraging advanced AI, PantryPal "sees" the ingredients you already own through photos of your fridge or uploaded grocery receipts, crafting tailored recipe ideas so you can cook right away without unnecessary shopping trips. 

This repository implements the premium, unified mobile-app mockup experience centered in a responsive desktop device container.

---

## Key Features

### 1. Vision-Based Pantry Scanning (Gemini 2.5 Flash)
Using the `@google/genai` SDK, users can scan or upload a file directly to classify and restock items:
- **Scan Receipt**: Analyzes a paper receipt to extract item names, map categories, and determine icons automatically.
- **Fridge Photo**: Scans pantry shelf photos to identify and track visible ingredients.
- **Connection Simulation**: Simulates order-history integration for apps like *Swiggy Instamart*, *Blinkit*, *Zepto*, *Amazon Fresh*, and *BigBasket*.
- *Note: A built-in simulation mode is available for offline validation and demo purposes.*

### 2. Multi-Theme Custom Styling System
The app features three distinct design themes selector accessible via the user avatar:
- **Fresh (Clean White & Garden Green)**: High-contrast, friendly rounded components (`--r: 22px`).
- **Warm (Cosy Cookbook)**: Earthy cookbook textures featuring elegant serif headings (`Newsreader` serif font) and soft corners (`--r: 16px`).
- **Mono (Bold Minimal)**: Dynamic high-contrast minimal theme featuring tight spacing and high-impact borders (`--r: 10px`).

### 3. Step-by-Step Cooking Guide (Cook Mode)
Provides a focused step-by-step kitchen assistant layout:
- Visible progress bar showing the percentage completion.
- Big counter numbers.
- Automated timer detection (e.g. tracking steps that require precise boiling or searing times).
- Completion toasts when the meal is finished.

### 4. Interactive Weekly Meal Planner
Allows planning meals across a Monday–Sunday grid:
- Highlighted **Today** badge indicators.
- Lunch and Dinner planning slots.
- Recipe Picker bottom drawer that displays recipes sorted by ingredient readiness (fully ready recipes appear first).

### 5. Categorized Inventory & Expirations
- Pantry items are sorted by category: *Produce*, *Dairy & Eggs*, *Proteins*, *Grains & Pasta*, and *Pantry Staples*.
- Proactive **Use Soon** horizontal carousel highlighting ingredients expiring in 3 days or less.
- Search-bar functionality for direct pantry exploration.

### 6. Intelligent Shopping Lists & Swiggy MCP Integration
- Automatically groups missing recipe ingredients into shopping aisles.
- Supports checking off items (strike-through) and clearing completed lists.
- Provides a detailed modal guide for configure a **Swiggy Model Context Protocol (MCP) Server** to automate grocery checkout directly from your local Claude Desktop configuration.

---

## Directory Architecture

```
PantryPal/
├── App.tsx                    # Coordinates global states and active sheets
├── index.html                 # Hosts Google Fonts and Material Icon sets
├── index.css                  # Handles animations, scrollbar hide, and resets
├── types.ts                   # Unified TypeScript definitions
├── components/
│   ├── Onboarding.tsx         # Welcome screens slider
│   ├── CookTab.tsx            # Home greeting, cards list, and AI recipe generator
│   ├── PantryTab.tsx          # Inventory categorization and search
│   ├── PlanTab.tsx            # Weekly slot scheduler
│   ├── ListTab.tsx            # Shopping items grouped by aisle
│   ├── RecipeDetail.tsx       # Ingredients checklist overlay
│   ├── CookMode.tsx           # Step-by-step active cooking interface
│   ├── RefreshHub.tsx         # Receipts scanner, cameras, and API links
│   ├── AppearanceSheet.tsx    # App styling custom variables configuration
│   ├── RecipePicker.tsx       # Sorted recipe planning drawer
│   └── SwiggyMcpGuide.tsx     # Swiggy MCP Server instructions
└── services/
    └── geminiService.ts       # Gemini 2.5 Flash API calls
```

---

## Local Development

### 1. Environment Configuration
Create a `.env` file in the root folder and add your Gemini API Key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 2. Run standard commands
To start the local bundler or preview production builds:
```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Compile TypeScript and test standard production bundler
npm run build
```
