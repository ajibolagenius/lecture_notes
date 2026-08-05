# React Course: Student Capstone Project Assignments

## Course Overview & Objectives
This document outlines the final capstone project tasks for the 2 students enrolled in the Comprehensive React Course. The goal of this project is to combine all skills learned over the 6-week curriculum—including **Routing**, **Context API**, **Data Fetching**, **Custom Hooks**, and **Deployment**—into a professional-grade Single Page Application (SPA).

All projects must be initialized using **Vite**, managed via **Git/GitHub**, and deployed to **Netlify** or **Vercel**.

---

## 🛠 Common Core Requirements (All Students)
Both students must adhere to the following technical architecture, ensuring a consistent baseline of difficulty.

### 1. Architecture & Setup
* **Framework:** React + Vite (latest version).
* **Language:** JavaScript (ES6+).
* **Version Control:** Public GitHub repository with meaningful commit history (e.g., `feat:`, `fix:`, `style:`).
* **Deployment:** Live URL via Netlify or Vercel.

### 2. Routing (React Router v6.4+)
The app must be a multi-page SPA utilizing `createBrowserRouter`.
* **Routes Required:**
    * `/` (Home)
    * `/shop` (Product Listing)
    * `/product/:id` (Product Detail)
    * `/cart` (Shopping Cart)
    * `*` (404 Not Found)


### 3. State Management (Context API)
* **CartContext:** A global state to manage the shopping cart.
* **Required Features:** `addToCart`, `removeFromCart`, `clearCart`, and a derived `cartTotal` calculation.
* **Persistence:** Cart data must persist in `localStorage` so items remain after a page refresh.


### 4. Data Fetching & Hooks
* **API:** Use the **FakeStoreAPI** (`https://fakestoreapi.com/`) to fetch product data dynamically.
* **Custom Hook:** Create a `useFetch(url)` hook that returns `{ data, loading, error }` to handle all API network requests.

---

## 👤 Student 1: "TechVault" (Electronics Focus)
**Student Name:** Student A
**Project Theme:** A high-end electronics and gadget store.

### Project Description
You are building "TechVault," a modern e-commerce platform for tech enthusiasts. Your design should be sleek, utilizing a "Dark Mode" aesthetic by default (or toggleable). The focus of your project is on **Searchability** and **User Experience**.

### Specific Feature Requirements
1.  **Real-Time Search Bar:**
    * Implement a search input in the `Navbar` or `Shop` page.
    * As the user types, filter the product list instantly based on the product `title`.
    * *Challenge:* Use the `useEffect` hook to debounce the search input (wait 300ms after typing stops) to prevent excessive re-renders.
2.  **Wishlist Context:**
    * In addition to `CartContext`, create a `WishlistContext`.
    * Allow users to "heart" items on the Product Detail page.
    * Create a simple modal or sidebar to view wishlisted items.
3.  **Tech Specs Layout:**
    * On the `/product/:id` page, format the description (which is a string in the API) into a readable "Specs" list, demonstrating your ability to manipulate string data.

### API Endpoints to Focus On
* All Products: `https://fakestoreapi.com/products`
* Category (Electronics): `https://fakestoreapi.com/products/category/electronics`

---

## 👤 Student 2: "LuxeLane" (Fashion & Lifestyle Focus)
**Student Name:** Student B
**Project Theme:** A trendy fashion and jewelry boutique.

### Project Description
You are building "LuxeLane," a boutique store for clothing and jewelry. Your design should be minimalist and image-heavy, focusing on **Categorization** and **Visual Browsing**.

### Specific Feature Requirements
1.  **Category Filter System:**
    * On the `/shop` page, implement a sidebar or tab system to filter products by category: "Men's Clothing," "Women's Clothing," and "Jewelery."
    * Clicking a category should fetch data from the specific category endpoint or filter the existing list.
2.  **Smart Cart Notification (Toast):**
    * When a user clicks "Add to Cart," trigger a temporary "Toast" notification (a small popup) at the bottom of the screen confirming the action (e.g., "Added Jacket to Cart!").
    * This requires managing a temporary UI state, potentially using a `useTimeout` custom hook logic inside a component.
3.  **Discount Logic:**
    * In your `CartContext`, implement a logic where if the `cartTotal` exceeds $200, a 10% discount is automatically applied to the total price displayed on the `/cart` page.

### API Endpoints to Focus On
* Categories: `https://fakestoreapi.com/products/categories`
* Specific Category: `https://fakestoreapi.com/products/category/jewelery`

---

## 📝 Evaluation Rubric

| Criteria | Points | Description |
| :--- | :--- | :--- |
| **Component Architecture** | 20 | Clean folder structure, reusable components (Buttons, Cards), proper use of Props. |
| **Hooks & Logic** | 25 | Proper implementation of `useState`, `useEffect`, and the custom `useFetch` hook. |
| **Global State** | 20 | Working `CartContext` with add/remove functionality and persistence. |
| **Routing** | 15 | Correct setup of pages, dynamic routes (`:id`), and 404 handling. |
| **Styling & UI** | 10 | Responsive design (mobile-friendly) and visual polish (CSS Modules or Tailwind). |
| **Deployment** | 10 | Live link working without errors, clean code on GitHub. |

**Total:** 100 Points

