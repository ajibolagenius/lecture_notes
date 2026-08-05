# JavaScript Student Project Boilerplates

Here are the starter HTML files for the 4 JavaScript projects. Copy the code for your assigned project into an `index.html` file. You will write your logic in `script.js`.

---

## 🌦️ Student 1: Global Weather Dashboard

**Task:** Fetch weather data and update the DOM.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JS Weather App</title>
    <link rel="stylesheet" href="style.css"> </head>
<body>

    <div class="app-container">
        <h1>Weather Dashboard</h1>

        <div class="search-box">
            <input type="text" id="city-input" placeholder="Enter city name (e.g. London)">
            <button id="search-btn">Get Weather</button>
        </div>

        <p id="error-message" style="color: red;"></p>

        <p id="loading-indicator" style="display: none;">Fetching data...</p>

        <div id="current-weather" class="weather-card" style="display: none;">
            <h2 id="city-name">City Name</h2>
            <img id="weather-icon" src="" alt="Weather Icon">
            <p id="temperature">Temp: --°C</p>
            <p id="description">Condition: --</p>
            <p id="humidity">Humidity: --%</p>
        </div>

        <div id="forecast-container">
            </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```
---

## 🪙 Student 2: Crypto Market Tracker

**Task:** Fetch a list of coins, render them in a table/grid, and implement a filter.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crypto Tracker</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container">
        <header>
            <h1>Crypto Market Tracker</h1>
            <input type="text" id="search-input" placeholder="Search by coin name...">
        </header>

        <main>
            <div id="loading" style="display: none;">Loading market data...</div>

            <table id="crypto-table">
                <thead>
                    <tr>
                        <th>Coin</th>
                        <th>Symbol</th>
                        <th>Price (USD)</th>
                        <th>24h Change</th>
                    </tr>
                </thead>
                <tbody id="crypto-list">
                    </tbody>
            </table>
        </main>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

---

## 🍳 Student 3: Smart Recipe Finder

**Task:** Search by ingredient, render a grid of results, and show a modal with details.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recipe Finder</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container">
        <h1>What's in your fridge?</h1>

        <div class="search-bar">
            <input type="text" id="ingredient-input" placeholder="e.g. Chicken, Avocado">
            <button id="search-btn">Find Recipes</button>
        </div>

        <div id="recipe-grid" class="grid">
            </div>
    </div>

    <div id="recipe-modal" class="modal" style="display: none;">
        <div class="modal-content">
            <span id="close-btn" class="close">&times;</span>
            <h2 id="modal-title">Recipe Title</h2>
            <img id="modal-img" src="" alt="" style="max-width: 100%;">
            <h3>Ingredients:</h3>
            <ul id="modal-ingredients"></ul>
            <h3>Instructions:</h3>
            <p id="modal-instructions"></p>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

---

## 🐉 Student 4: Pokedex (Pokemon Search)

**Task:** Search specific data, update stats bars dynamically, and toggle images.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JS Pokedex</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="pokedex-container">

        <div class="search-section">
            <input type="text" id="poke-input" placeholder="Enter Pokemon Name or ID">
            <button id="search-btn">Search</button>
        </div>

        <div id="poke-display" style="display: none;">

            <h2 id="poke-name">Pikachu</h2>
            <p id="poke-id">#025</p>

            <div class="img-container">
                <img id="poke-img" src="" alt="Pokemon Sprite">
                <br>
                <button id="shiny-btn">Toggle Shiny ✨</button>
            </div>

            <div id="types-container">
                </div>

            <div class="stats-container">
                <h3>Base Stats</h3>

                <label>HP:</label>
                <progress id="stat-hp" value="0" max="255"></progress>

                <label>Attack:</label>
                <progress id="stat-attack" value="0" max="255"></progress>

                <label>Defense:</label>
                <progress id="stat-defense" value="0" max="255"></progress>

                <label>Speed:</label>
                <progress id="stat-speed" value="0" max="255"></progress>
            </div>
        </div>

        <p id="error-msg" style="color: red;"></p>
    </div>

    <script src="script.js"></script>
</body>
</html>
```
