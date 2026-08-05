# CSS Final Projects: Complete Specifications

**Course Level:** Beginner to Expert
**Deployment Requirement:** All projects must be deployed to Netlify or Vercel.

## General Requirements (Applies to All Students)

### Batch 1 Requirements
1.  **Mobile-First:** All CSS must be written for mobile first, with `@media (min-width: ...)` for tablets and desktops.
2.  **Layout:**
    * **Flexbox:** Used for Navigation bars and 1D alignments.
    * **CSS Grid:** Used for the main content areas (cards, galleries).
3.  **Modern Syntax:**
    * **CSS Variables:** Use `:root` for colors, fonts, and spacing.
    * **BEM:** Use Block-Element-Modifier naming conventions (e.g., `.card__title`).
4.  **Polish:**
    * At least one `@keyframes` animation (e.g., fade-in on load).
    * `transition` effects on all hover states (`:hover`, `:focus`).
    * **Bonus:** Use **Sass/SCSS** (Nesting and Variables) for the codebase.

### Batch 2 Requirements
1.  **Mobile-First Workflow:** Start by styling for small screens, then use min-width media queries for larger devices.
2.  **Semantic Layouts:** Utilize semantic HTML5 tags appropriately (`<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`, etc.).
3.  **Modern CSS Syntax:**
    * **Variables:** Define colors, fonts, and spacing using CSS variables (`--primary-color`, etc.) in the `:root` pseudo-class.
    * **Box Model:** Ensure `box-sizing: border-box` is applied globally.
    * **Flexbox & Grid:** Demonstrate proficiency in both layout modules where best suited.
4.  **Polish & Interactivity:**
    * Include at least one `@keyframes` animation (e.g., loading spinner, entrance animation).
    * Use `transition` for smooth state changes on interactive elements like buttons and links.
    * Adhere to BEM naming conventions for clean, maintainable classes.

---

## Batch 1 Projects

### 💻 Student 1 Project: "SaaS Startup Landing Page"
**Theme:** A clean, tech-focused site for a software product (e.g., a Task Manager App).
**Key Challenges:**
* **Pricing Table:** A 3-column Grid layout that stacks on mobile. Use a "Featured" modifier (`.card--featured`) to scale up the middle card and add a shadow/border.
* **Feature List:** A "Zig-Zag" layout (Text Left/Image Right, then alternating) using Flexbox or Grid.
* **Animation:** A subtle "floating" animation (translateY) on the main hero illustration.

---

### 🍽️ Student 2 Project: "Fine Dining Experience"
**Theme:** An elegant, high-end restaurant website. Focus on typography and atmosphere.
**Key Challenges:**
* **Parallax:** Use `background-attachment: fixed` on the hero section.
* **Menu Grid:** A complex Grid layout for the menu items with dot leaders (using pseudo-elements `::after` or flexbox space-between).
* **Visuals:** Use `rgba()` overlays on background images to ensure text readability.
* **Animation:** A slow fade-in + slide-up effect for the menu content when the page loads.

---

### 📸 Student 3 Project: "Travel & Photography Blog"
**Theme:** An image-heavy blog showcasing travel destinations.
**Key Challenges:**
* **Masonry-Style Gallery:** A CSS Grid layout using `grid-column: span 2` or `grid-row: span 2` to create an uneven, mosaic photo gallery.
* **Typography:** Use a unique Google Font pairing (Serif for headers, Sans for body) and manage line-heights carefully.
* **Sticky Elements:** A `position: sticky` sidebar for "Recent Posts" or the Navigation bar.
* **Interaction:** Image cards should have a zoom effect (`transform: scale()`) and a caption slide-up on hover.

---

### 🛍️ Student 4 Project: "E-Commerce Product Showcase"
**Theme:** A modern streetwear or sneaker shop.
**Key Challenges:**
* **Product Cards:** Complex cards with a "Quick View" button that appears on hover (`opacity: 0` to `1`).
* **Filters Sidebar:** A layout with a sidebar (for filters) and main grid (for products). On mobile, the sidebar should move to the top or become an accordion.
* **Badges:** Use `position: absolute` to place "Sale" or "New" badges on product images.
* **Animation:** A "pulse" animation on the "Add to Cart" buttons to draw attention.

---

## Batch 2 Projects

### 🎨 Student 1 Project: "Creative Agency Portfolio"
**Theme:** A bold, visually striking portfolio for a digital design agency.
**Key Technical Challenges:**
* **Hero Section:** Create a full-screen hero section with a video background or a large, high-quality image using `object-fit: cover`. Overlay text should be perfectly centered using Flexbox.
* **Services Grid:** Implement a responsive grid for services offered. On desktop, this should be a 3-column layout using CSS Grid; on mobile, a single column stack. Use `gap` for spacing.
* **Project Gallery:** Design a masonry-style gallery for past projects. Use Grid with `grid-row` and `grid-column` spanning to create interesting, non-uniform layouts for images.
* **Hover Effects:** Implement complex hover effects on project cards—e.g., an overlay sliding in with project details using `transform: translateY()` and `opacity`.

---

### 📰 Student 2 Project: "Modern News/Magazine Site"
**Theme:** A content-heavy, structured news portal or online magazine.
**Key Technical Challenges:**
* **Complex Navbar:** Build a sticky navigation bar with a dropdown menu. Use Flexbox for alignment and `position: sticky` to keep it at the top. The dropdown should appear on hover using display or visibility transitions.
* **Featured Article Layout:** Create a "featured" section at the top with a large main article on the left and two smaller "top stories" stacked on the right. This is a classic Grid use case.
* **Typography Focus:** Pay close attention to typography hierarchy. Use `rem` and `em` units for scalable font sizes. Style blockquotes uniquely.
* **Sidebar Layout:** On desktop, include a sidebar (`<aside>`) for "Trending Topics" or "Newsletter Signup" that sits alongside the main content. This sidebar should move to the bottom on mobile.

---

### 🧘 Student 3 Project: "Wellness & Yoga Studio"
**Theme:** A calm, serene website for a yoga studio with class schedules and membership info.
**Key Technical Challenges:**
* **Schedule Table:** Style a semantic HTML table for the weekly class schedule. It must be responsive—perhaps converting to a list or scrollable area on mobile. Use `nth-child` pseudo-selectors for zebra striping rows.
* **Membership Pricing Cards:** Create a set of pricing cards. Use a "Recommended" card that pops out (scales up slightly) and has a distinct shadow or border color. Use Flexbox to align features within the cards.
* **Testimonial Slider (CSS Only):** Attempt a CSS-only slider or scrolling container for client testimonials using `overflow-x: scroll` and scroll snap properties (`scroll-snap-type`).
* **Atmospheric Transitions:** Use slow, easing transitions for all interactive elements to match the "calm" theme. Buttons should gently change color or lift (`transform: translateY(-2px)`) on hover.
