# Scrapbook Concierge Order Manager

The **Scrapbook Concierge Order Manager** streamlines the order fulfillment process for Scrapbook Concierge by fetching paid, unfulfilled orders from their Wix store. The app enables filtering of orders by kit SKUs, significantly reducing the time required to process and fulfill orders (by more than 75%).

## Features

- Fetches paid, unfulfilled orders from the Scrapbook Concierge Wix store.
- Search and filter orders by kit SKUs through a user-friendly interface.
- Results of fetched orders are cached temporarily in localStorage for efficiency and faster access.

## Tech Stack

* **Language**: TypeScript
* **Framework**: Next.js
* **Styling**: TailwindCSS
* **Bundler**: Turbopack
* **API Integration:** Wix Store API


## 🚀 Getting Started
### Prerequisites
* Node.js (18 or higher recommended)
* Yarn or npm

### Environment Variables

To run this project, you need to configure the following environment variables:

- `API_URL`: The base URL for the Wix API.
- `API_KEY`: The API key to authenticate requests.
- `SITE_ID`: The identifier for the Wix site.

### Installation

**Clone the repository**
```
git clone https://github.com/GMSTER22/scr-order-manager.git
cd scr-order-manager
```

**Install dependencies**
```
npm install
# or
yarn install
```

**Development**
```
npm run dev
# or
yarn dev
```
This will run the app on `http://localhost:3000`.

**Build**
```
npm run build
# or
yarn build
```


## 📂 Project Structure

    src/    
      └── app/    
          ├── api/    
          |    └──  orders/
          └── components/
          ├── global.css
          ├── layout.tsx
          └── page.tsx


## 📄 License

© 2025 Scrapbook Concierge. All rights reserved.
