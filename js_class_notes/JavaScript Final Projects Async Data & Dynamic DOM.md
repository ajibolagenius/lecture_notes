# JavaScript Final Projects: Async Data & Dynamic DOM

**Course Level:** Beginner to Expert (Weeks 1-6)
**Deployment Requirement:** All projects must be deployed to Netlify or Vercel.
f
## General Requirements (Applies to All Students)
1.  **API Integration:** Fetch data from a public API using `async/await` and `try...catch`.
2.  **Dynamic DOM:** No hardcoded HTML content. Use `document.createElement`, `textContent`, and `.append` to build the UI from the data.
3.  **Array Methods:** Use `.map()` to render lists, `.filter()` for search functionality, and `.sort()` for ordering.
4.  **User Interaction:** Handle `click` or `submit` events (e.g., search bars, filter buttons).
5.  **Loading States:** Show a "Loading..." spinner/text while data is fetching.

---

### 🌦️ Student 1 Project: "Global Weather Dashboard"
**API:** OpenWeatherMap or WeatherAPI.
**Core Features:**
* **Search:** Input field to type a city name.
* **Current Weather:** Display temperature, icon, humidity, and wind speed.
* **Forecast:** Use `.map()` to render a 5-day forecast list below the main card.
* **Logic:** Change the background color/image of the app based on the temperature (e.g., Blue for <10°C, Orange for >25°C).

---

### 🪙 Student 2 Project: "Crypto Market Tracker"
**API:** CoinGecko API (Public endpoints).
**Core Features:**
* **Dashboard:** Fetch the top 50 coins. Render them in a table or grid cards showing Name, Symbol, Current Price, and 24h Change.
* **Styling Logic:** If the 24h change is positive, color the text Green. If negative, color it Red.
* **Filter:** A search bar that uses `.filter()` to instantly narrow down the displayed coins by name as the user types.

---

### 🍳 Student 3 Project: "Smart Recipe Finder"
**API:** TheMealDB.
**Core Features:**
* **Search:** Search for meals by ingredient (e.g., "chicken", "avocado").
* **Results Grid:** Display recipe cards with thumbnails and names.
* **Modal/Details:** When a user clicks a "View Recipe" button, fetch the specific meal ID and display the instructions and ingredients list in a modal or expanded section.
* **Complexity:** The API returns ingredients as `strIngredient1`, `strIngredient2`, etc. Use an object loop or array logic to combine these into a clean list.

---

### 🐉 Student 4 Project: "Pokedex (Pokemon Search)"
**API:** PokeAPI.
**Core Features:**
* **Search:** Enter a Pokemon name or ID.
* **Card Display:** Show the sprite (image), name, ID number, and Type badges (Fire, Water, etc.).
* **Stats Chart:** Display HP, Attack, and Defense as simple HTML `<progress>` bars (set the `value` attribute dynamically via JS).
* **Shiny Toggle:** A button that toggles the image `src` between the normal sprite and the "Shiny" sprite.
