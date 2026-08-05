# CSS Project Boilerplates

Here are the starter HTML files for all CSS projects. Copy the code for your assigned project into an `index.html` file.

---

## Batch 1 Projects

### 💻 Student 1: SaaS Startup Landing Page

**Focus:** Flexbox/Grid layouts, Pricing Cards, "Featured" modifiers.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TaskFlow - Manage Your Work</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>

    <header class="main-header">
        <div class="logo">TaskFlow</div>
        <nav class="main-nav">
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#" class="btn btn--primary">Get Started</a>
        </nav>
    </header>

    <section class="hero">
        <div class="hero__content">
            <h1>Organize your life in seconds.</h1>
            <p>The world's most effective task manager for teams.</p>
            <a href="#" class="btn btn--cta">Try for Free</a>
        </div>
        <div class="hero__image">
            <img src="https://via.placeholder.com/500x300?text=App+Dashboard" alt="App Screenshot">
        </div>
    </section>

    <section class="features">
        <div class="feature-row">
            <div class="feature-text">
                <h2>Real-time Sync</h2>
                <p>Never lose track of your progress. Updates happen instantly across all devices.</p>
            </div>
            <div class="feature-img">
                <img src="https://via.placeholder.com/400x250?text=Sync+Feature" alt="Sync">
            </div>
        </div>
        <div class="feature-row feature-row--reverse">
            <div class="feature-text">
                <h2>Team Collaboration</h2>
                <p>Comment, assign, and track work with your entire team in one place.</p>
            </div>
            <div class="feature-img">
                <img src="https://via.placeholder.com/400x250?text=Team+Feature" alt="Team">
            </div>
        </div>
    </section>

    <section class="pricing">
        <h2>Choose your plan</h2>
        <div class="pricing-grid">
            <div class="card">
                <h3>Basic</h3>
                <p class="price">$0</p>
                <ul>
                    <li>1 User</li>
                    <li>5 Projects</li>
                </ul>
                <a href="#" class="btn btn--outline">Sign Up</a>
            </div>

            <div class="card card--featured">
                <span class="badge">Best Value</span>
                <h3>Pro</h3>
                <p class="price">$12</p>
                <ul>
                    <li>Unlimited Users</li>
                    <li>Unlimited Projects</li>
                    <li>Analytics</li>
                </ul>
                <a href="#" class="btn btn--primary">Sign Up</a>
            </div>

            <div class="card">
                <h3>Enterprise</h3>
                <p class="price">$49</p>
                <ul>
                    <li>24/7 Support</li>
                    <li>Custom Security</li>
                </ul>
                <a href="#" class="btn btn--outline">Contact Us</a>
            </div>
        </div>
    </section>

    <footer>
        <p>&copy; 2025 TaskFlow Inc.</p>
    </footer>
</body>
</html>
```

---

### 🍽️ Student 2: Fine Dining Experience

**Focus:** Parallax backgrounds, elegant typography, complex menu grid.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lumière - Fine Dining</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400&display=swap" rel="stylesheet">
</head>
<body>

    <header class="hero-parallax">
        <div class="hero-overlay">
            <h1 class="hero-title">Lumière</h1>
            <p class="hero-subtitle">Taste the Extraordinary</p>
            <a href="#menu" class="btn-reserve">Reserve a Table</a>
        </div>
    </header>

    <section class="intro">
        <div class="container">
            <h2>Our Philosophy</h2>
            <p>We believe in locally sourced ingredients prepared with classic French techniques.</p>
        </div>
    </section>

    <section id="menu" class="menu-section">
        <h2>Le Menu</h2>

        <div class="menu-grid">
            <div class="menu-item">
                <div class="item-header">
                    <span class="item-name">Truffle Risotto</span>
                    <span class="item-dots"></span> <span class="item-price">$28</span>
                </div>
                <p class="item-desc">Arborio rice, black truffle, parmesan reggiano.</p>
            </div>

            <div class="menu-item">
                <div class="item-header">
                    <span class="item-name">Duck Confit</span>
                    <span class="item-dots"></span>
                    <span class="item-price">$34</span>
                </div>
                <p class="item-desc">Slow-cooked duck leg, pomme purée, cherry glaze.</p>
            </div>

            <div class="menu-item">
                <div class="item-header">
                    <span class="item-name">Seared Scallops</span>
                    <span class="item-dots"></span>
                    <span class="item-price">$30</span>
                </div>
                <p class="item-desc">Cauliflower purée, caper raisin emulsion.</p>
            </div>

            <div class="menu-item">
                <div class="item-header">
                    <span class="item-name">Wagyu Beef</span>
                    <span class="item-dots"></span>
                    <span class="item-price">$85</span>
                </div>
                <p class="item-desc">A5 Japanese Wagyu, roasted vegetables.</p>
            </div>
        </div>
    </section>

    <section class="gallery">
        <img src="https://via.placeholder.com/400x400?text=Dish+1" alt="Dish">
        <img src="https://via.placeholder.com/400x400?text=Interior" alt="Interior">
        <img src="https://via.placeholder.com/400x400?text=Chef" alt="Chef">
    </section>

    <footer>
        <p>123 Culinary Ave, Paris, France</p>
    </footer>
</body>
</html>
```

---

### 📸 Student 3: Travel & Photography Blog

**Focus:** Masonry-style CSS Grid, Sticky Sidebar.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wanderlust - Travel Blog</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header class="blog-header">
        <div class="logo">Wanderlust</div>
        <nav>
            <a href="#">Destinations</a>
            <a href="#">Journal</a>
            <a href="#">About</a>
        </nav>
    </header>

    <div class="main-layout">

        <main class="gallery-grid">
            <article class="card card--tall">
                <img src="https://via.placeholder.com/400x600?text=Kyoto" alt="Kyoto">
                <div class="card-overlay"><h3>Kyoto, Japan</h3></div>
            </article>

            <article class="card card--wide">
                <img src="https://via.placeholder.com/600x300?text=Iceland" alt="Iceland">
                <div class="card-overlay"><h3>Iceland</h3></div>
            </article>

            <article class="card">
                <img src="https://via.placeholder.com/300x300?text=Paris" alt="Paris">
                <div class="card-overlay"><h3>Paris</h3></div>
            </article>

            <article class="card">
                <img src="https://via.placeholder.com/300x300?text=Bali" alt="Bali">
                <div class="card-overlay"><h3>Bali</h3></div>
            </article>

             <article class="card card--tall">
                <img src="https://via.placeholder.com/400x600?text=NYC" alt="NYC">
                <div class="card-overlay"><h3>New York</h3></div>
            </article>
        </main>

        <aside class="sidebar">
            <div class="sticky-content">
                <h3>About Me</h3>
                <img src="https://via.placeholder.com/100" class="avatar" alt="Profile">
                <p>I travel the world and take photos.</p>

                <h3>Recent Posts</h3>
                <ul class="link-list">
                    <li><a href="#">10 Days in Japan</a></li>
                    <li><a href="#">Packing Light</a></li>
                    <li><a href="#">Best Cameras 2025</a></li>
                </ul>
            </div>
        </aside>
    </div>

</body>
</html>
```

---

### 🛍️ Student 4: E-Commerce Product Showcase

**Focus:** Filters sidebar, Product Cards with Hover effects, Badges.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UrbanKicks - Sneaker Store</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <nav class="navbar">
        <div class="brand">UrbanKicks</div>
        <div class="cart-icon">Cart (0)</div>
    </nav>

    <div class="shop-container">

        <aside class="filters">
            <h3>Filters</h3>
            <div class="filter-group">
                <h4>Category</h4>
                <label><input type="checkbox"> Running</label>
                <label><input type="checkbox"> Lifestyle</label>
                <label><input type="checkbox"> Basketball</label>
            </div>
            <div class="filter-group">
                <h4>Price</h4>
                <input type="range" min="0" max="500">
            </div>
        </aside>

        <main class="product-grid">

            <div class="product-card">
                <div class="image-wrapper">
                    <span class="badge badge--sale">Sale</span>
                    <img src="https://via.placeholder.com/300x300?text=Sneaker+1" alt="Shoe">
                    <button class="quick-view">Quick View</button> </div>
                <div class="product-info">
                    <h3>Air Runner Pro</h3>
                    <p class="price"><span class="old-price">$120</span> $89</p>
                    <button class="btn-add">Add to Cart</button> </div>
            </div>

            <div class="product-card">
                <div class="image-wrapper">
                    <span class="badge badge--new">New</span>
                    <img src="https://via.placeholder.com/300x300?text=Sneaker+2" alt="Shoe">
                    <button class="quick-view">Quick View</button>
                </div>
                <div class="product-info">
                    <h3>Street Legend</h3>
                    <p class="price">$150</p>
                    <button class="btn-add">Add to Cart</button>
                </div>
            </div>

            <div class="product-card">
                <div class="image-wrapper">
                    <img src="https://via.placeholder.com/300x300?text=Sneaker+3" alt="Shoe">
                    <button class="quick-view">Quick View</button>
                </div>
                <div class="product-info">
                    <h3>Court Master</h3>
                    <p class="price">$110</p>
                    <button class="btn-add">Add to Cart</button>
                </div>
            </div>

            <div class="product-card">
                <div class="image-wrapper">
                    <img src="https://via.placeholder.com/300x300?text=Sneaker+4" alt="Shoe">
                    <button class="quick-view">Quick View</button>
                </div>
                <div class="product-info">
                    <h3>High Tops</h3>
                    <p class="price">$95</p>
                    <button class="btn-add">Add to Cart</button>
                </div>
            </div>

        </main>
    </div>

</body>
</html>
```

---

## Batch 2 Projects

### 🎨 Student 1: Creative Agency Portfolio

**Focus:** Full-screen hero, Masonry Grid, Complex Hover Effects.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VIVID - Digital Design Agency</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
</head>
<body>

    <header class="main-header">
        <div class="logo">VIVID.</div>
        <nav class="main-nav">
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#contact" class="btn btn--outline">Let's Talk</a>
        </nav>
    </header>

    <section class="hero">
        <div class="hero__media">
            <img src="https://via.placeholder.com/1920x1080?text=Agency+Reel" alt="Background Reel">
        </div>
        <div class="hero__overlay">
            <h1>We Craft Digital <br> Experiences.</h1>
            <p>Bold strategies for modern brands.</p>
            <a href="#work" class="btn btn--solid">View Projects</a>
        </div>
    </section>

    <section id="services" class="services">
        <div class="container">
            <h2>Our Expertise</h2>
            <div class="services-grid">
                <div class="service-card">
                    <h3>UI/UX Design</h3>
                    <p>Creating intuitive interfaces that users love.</p>
                </div>
                <div class="service-card">
                    <h3>Branding</h3>
                    <p>Defining your visual identity and voice.</p>
                </div>
                <div class="service-card">
                    <h3>Development</h3>
                    <p>Robust frontend and backend solutions.</p>
                </div>
            </div>
        </div>
    </section>

    <section id="work" class="work">
        <div class="container">
            <h2>Selected Works</h2>
            <div class="masonry-grid">
                <div class="project project--tall">
                    <img src="https://via.placeholder.com/400x600?text=Fashion+Brand" alt="Project 1">
                    <div class="project__overlay">
                        <h3>Vogue Redesign</h3>
                        <p>Web Design</p>
                    </div>
                </div>

                <div class="project project--wide">
                    <img src="https://via.placeholder.com/600x300?text=Tech+Startup" alt="Project 2">
                    <div class="project__overlay">
                        <h3>FinTech Dashboard</h3>
                        <p>Product Design</p>
                    </div>
                </div>

                <div class="project">
                    <img src="https://via.placeholder.com/300x300?text=Coffee+Shop" alt="Project 3">
                    <div class="project__overlay">
                        <h3>Brew Co.</h3>
                        <p>Branding</p>
                    </div>
                </div>

                <div class="project">
                    <img src="https://via.placeholder.com/300x300?text=Mobile+App" alt="Project 4">
                    <div class="project__overlay">
                        <h3>FitTrack App</h3>
                        <p>Mobile UX</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <p>&copy; 2025 VIVID Agency.</p>
    </footer>
</body>
</html>
```

---

### 📰 Student 2: Modern News/Magazine Site

**Focus:** Sticky Navbar with Dropdown, Article Layouts, Typography.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Daily Byte - Tech News</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Roboto:wght@400;500&display=swap" rel="stylesheet">
</head>
<body>

    <header class="navbar">
        <div class="container navbar__content">
            <div class="logo">The Daily Byte</div>
            <nav>
                <ul class="nav-list">
                    <li><a href="#">Latest</a></li>
                    <li class="dropdown">
                        <a href="#">Topics ▾</a>
                        <div class="dropdown-menu">
                            <a href="#">AI & Robotics</a>
                            <a href="#">Cybersecurity</a>
                            <a href="#">Startups</a>
                        </div>
                    </li>
                    <li><a href="#">Podcasts</a></li>
                    <li><a href="#" class="btn-subscribe">Subscribe</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <div class="container main-layout">

        <main>
            <section class="featured-news">
                <article class="article-main">
                    <img src="https://via.placeholder.com/800x450?text=Main+Headline" alt="Main Story">
                    <div class="article-content">
                        <span class="category">Artificial Intelligence</span>
                        <h1>The Future of Generative AI in 2025</h1>
                        <p class="excerpt">How new models are reshaping the creative industry and what it means for designers.</p>
                    </div>
                </article>

                <div class="article-side-stack">
                    <article class="article-small">
                        <img src="https://via.placeholder.com/150x100?text=Tech" alt="Thumb">
                        <h3>New Chipsets Revealed</h3>
                    </article>
                    <article class="article-small">
                        <img src="https://via.placeholder.com/150x100?text=Space" alt="Thumb">
                        <h3>Mars Mission Update</h3>
                    </article>
                </div>
            </section>

            <section class="latest-feed">
                <h2>Latest Stories</h2>
                <article class="feed-item">
                    <h3>Silicon Valley Trends</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </article>

                <blockquote class="quote-highlight">
                    "Technology is best when it brings people together."
                    <cite>- Matt Mullenweg</cite>
                </blockquote>
            </section>
        </main>

        <aside class="sidebar">
            <div class="sidebar-widget">
                <h3>Trending Topics</h3>
                <ul class="trending-list">
                    <li>#CryptoCrash</li>
                    <li>#VRGaming</li>
                    <li>#GreenEnergy</li>
                </ul>
            </div>

            <div class="sidebar-widget newsletter-widget">
                <h3>Get the Newsletter</h3>
                <p>Daily tech digests sent to your inbox.</p>
                <input type="email" placeholder="Your email">
                <button>Sign Up</button>
            </div>
        </aside>

    </div>

    <footer>
        <p>&copy; 2025 The Daily Byte. All rights reserved.</p>
    </footer>
</body>
</html>
```

---

### 🧘 Student 3: Wellness & Yoga Studio

**Focus:** Semantic Table, Pricing Cards, CSS Scroll Snap, Atmospheric Design.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Serenity Yoga Studio</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;500;700&display=swap" rel="stylesheet">
</head>
<body>

    <header class="hero">
        <div class="hero__content">
            <h1>Find Your Balance</h1>
            <p>Join our community of mindfulness and movement.</p>
            <a href="#schedule" class="btn btn--soft">View Schedule</a>
        </div>
    </header>

    <main>
        <section id="schedule" class="section">
            <div class="container">
                <h2>Weekly Schedule</h2>
                <div class="table-wrapper">
                    <table class="schedule-table">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Monday</th>
                                <th>Wednesday</th>
                                <th>Friday</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>07:00 AM</td>
                                <td>Sunrise Flow</td>
                                <td>Morning Stretch</td>
                                <td>Sunrise Flow</td>
                            </tr>
                            <tr>
                                <td>12:00 PM</td>
                                <td>Power Yoga</td>
                                <td>Vinyasa</td>
                                <td>Power Yoga</td>
                            </tr>
                            <tr>
                                <td>06:00 PM</td>
                                <td>Deep Stretch</td>
                                <td>Hatha</td>
                                <td>Meditation</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <section id="pricing" class="section pricing-bg">
            <div class="container">
                <h2>Membership Plans</h2>
                <div class="pricing-grid">
                    <div class="card">
                        <h3>Drop-In</h3>
                        <p class="price">$20<span>/class</span></p>
                        <ul class="features">
                            <li>Access to 1 Class</li>
                            <li>Mat Rental Included</li>
                        </ul>
                        <button class="btn btn--outline">Buy Now</button>
                    </div>

                    <div class="card card--recommended">
                        <span class="badge">Most Popular</span>
                        <h3>Unlimited</h3>
                        <p class="price">$120<span>/month</span></p>
                        <ul class="features">
                            <li>Unlimited Classes</li>
                            <li>Free Workshops</li>
                            <li>Guest Passes</li>
                        </ul>
                        <button class="btn btn--primary">Join Now</button>
                    </div>

                    <div class="card">
                        <h3>10 Class Pack</h3>
                        <p class="price">$180</p>
                        <ul class="features">
                            <li>Valid for 3 months</li>
                            <li>Shareable</li>
                        </ul>
                        <button class="btn btn--outline">Buy Now</button>
                    </div>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <h2>Stories from the Mat</h2>
                <div class="testimonial-slider">
                    <div class="testimonial-card">
                        <p>"This studio changed my life. The instructors are so supportive."</p>
                        <h4>- Sarah J.</h4>
                    </div>
                    <div class="testimonial-card">
                        <p>"The perfect place to decompress after a long work week."</p>
                        <h4>- Mike T.</h4>
                    </div>
                    <div class="testimonial-card">
                        <p>"I love the morning classes. Great energy to start the day!"</p>
                        <h4>- Elena R.</h4>
                    </div>
                    <div class="testimonial-card">
                        <p>"Beautiful facility and a welcoming community."</p>
                        <h4>- David B.</h4>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer>
        <p>123 Lotus Lane, Cityville &bull; (555) 123-4567</p>
    </footer>

</body>
</html>
```
