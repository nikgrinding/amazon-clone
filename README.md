# Amazon Clone

An e-commerce web application inspired by Amazon, built using **vanilla JavaScript, HTML, and CSS**. This project focuses on strengthening core JavaScript fundamentals by building a realistic shopping experience without relying on modern frameworks.

**Live Demo:** _[Click here](https://simple-amazon-clone.vercel.app/)_

---

## Features

-   **Product Catalog:** Browse products with images, prices, ratings, and details
-   **Shopping Cart:** Add and remove items, update quantities, with cart data persisted using `localStorage`
-   **Search:** Keyword-based search similar to Amazon, matching relevant product terms
-   **Checkout Flow:** Select delivery options, place orders, and view automatically calculated delivery dates (excluding weekends) with real-time price and payment summary updates
-   **Order Management:** Place orders, view order history, and track delivery status
-   **Responsive UI:** Mobile-friendly layout with a hamburger menu for smaller screens

---

## Tech Stack

-   **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6 Modules)
-   **Backend (Lightweight):** JavaScript-based backend interaction via `fetch` calls to an external server (supersimple.dev)
-   **State Persistence:** Browser `localStorage`
-   **Date Handling:** Day.js
-   **Testing:** Jasmine

---

## Architecture & Implementation

-   Modular ES6 codebase with clear separation of data handling, business logic, and UI rendering
-   Object-oriented product model using a base class with specialized subclasses
-   Delivery date logic that accounts for weekends and selected shipping options

---

## Testing

The project includes unit and integration tests covering:

-   Cart operations and persistence
-   Checkout and payment summary logic
-   Order creation and retrieval
-   Delivery date calculations

Tests are run in the browser using the Jasmine framework.

---

## Project Structure

```
amazon-clone/
├── data/              # Application data and state management
├── scripts/           # JavaScript modules and business logic
├── styles/            # Shared and page-specific CSS
├── images/            # Product images and UI assets
└── tests/             # Jasmine test suite
```

---

## Running the Project

```bash
git clone https://github.com/yourusername/amazon-clone.git
cd amazon-clone
```

Open `amazon.html` in any modern web browser. No build tools or dependencies are required.

---

## Acknowledgments

-   UI inspiration and sample assets from Amazon and supersimple.dev
