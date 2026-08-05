# Week 5: Multimedia & Embedding

Welcome to Week 5! Until now, your portfolio has been mostly text and simple images. This week, you build `about.html` — the second page of your site — and make it **loud and visual**. You will learn how to natively embed video and audio, how to safely embed content from other giants like YouTube and Google Maps, and how to master responsive images for any device.

---

## Module 8: Audio & Video

Before HTML5, playing video on the web required clunky plugins like Flash. Today, the browser handles media natively. This means better performance, better battery life for mobile users, and better accessibility.

### 1. The `<video>` Element

* **Lecture & Concepts:**
    * The `<video>` tag embeds a media player.
    * **Attributes are key:** Without attributes, you might just see a frozen image (or nothing).
        * **`src`**: Path to the file (though we usually use `<source>` tags instead).
        * **`controls`**: **Crucial.** Adds the play/pause buttons, volume, and scrubber.
        * **`autoplay`**: Starts playing immediately. **Note:** Modern browsers block autoplay *unless* the video is also `muted`.
        * **`loop`**: Replays the video when it ends.
        * **`poster`**: An image that shows while the video downloads or before the user hits play.

* **In-Depth Example (The "Bulletproof" Syntax):**
    We don't rely on just one file format. We provide options, and the browser picks the first one it understands.

    ```html
    <video controls width="600" poster="assets/intro-poster.jpg">
      <source src="assets/intro.webm" type="video/webm">
      <source src="assets/intro.mp4" type="video/mp4">
      <p>Your browser does not support the video tag.
      <a href="assets/intro.mp4">Download the video</a>.</p>
    </video>
    ```

* Create `about.html` now, reusing your Week 3 `<header>`/`<nav>`/`<footer>`. This is where the intro video below will live.

### 2. The `<audio>` Element

* **Lecture & Concepts:**
    * Works almost exactly like `<video>`, but without the visual component.
    * Supports `controls`, `autoplay`, `loop`, and `muted`.
    * **Common Formats:** `.mp3` (Universal), `.ogg` (Open source), `.wav` (High quality, large size).

* **In-Depth Example:**
    ```html
    <figure>
      <figcaption>A 30-second audio intro:</figcaption>
      <audio controls>
        <source src="assets/intro.mp3" type="audio/mpeg">
        <source src="assets/intro.ogg" type="audio/ogg">
        Your browser does not support the audio element.
      </audio>
    </figure>
    ```

### 3. Accessibility: Captions & Tracks

* **Expert Tip:** To make video accessible to the deaf or hard-of-hearing, you must provide captions.
* **The `<track>` element:**
    * `kind="captions"`: For dialogue and sound effects (accessibility).
    * `kind="subtitles"`: For translation.
    * `src="captions.vtt"`: Links to a WebVTT file (text with timestamps).

    ```html
    <video controls>
      <source src="assets/intro.mp4" type="video/mp4">
      <track src="assets/intro-captions.vtt" kind="captions" srclang="en" label="English">
    </video>
    ```

* **⭐️ Class Exercise: Add Your Intro Video**
    1.  In `about.html`, add an `<h2>` "About Me" (or reuse/extend your Week 1-2 bio content here instead of on the homepage — your choice, but be consistent).
    2.  Record a short (30-60 second) intro video on your phone — or use a placeholder sample if you'd rather not appear on camera.
    3.  Embed it with `<video controls poster="...">`, wrapped in a `<figure>` with a `<figcaption>`.

---

## Module 9: Advanced Media & Embedding

Sometimes you don't want to host the file yourself. You want to use Google Maps' data or YouTube's streaming power.

### 1. Embedding with `<iframe>`

* **Lecture & Concepts:**
    * An **iFrame** (Inline Frame) is literally a "window" into another website. You are cutting a hole in your page and showing another site inside it.
    * **Attributes:**
        * `src`: The URL of the page to show.
        * `width` / `height`: Dimensions of the window.
        * `allowfullscreen`: Lets the user put the video in full-screen mode.
        * `loading="lazy"`: **Modern Best Practice.** Tells the browser not to load this heavy content until the user scrolls near it.
    * **Security:** iFrames can be risky. Use the `sandbox` attribute if you are embedding untrusted content to restrict scripts and popups.

* **In-Depth Example (A Project Demo on YouTube):**
    * *Note: You cannot just use the URL of the video page. You must use the "Embed" URL.*
    ```html
    <h3>Weather App — Demo</h3>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/your-video-id"
      title="Weather App demo video"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      loading="lazy">
    </iframe>
    ```

* **In-Depth Example (Google Maps on the Contact page):**
    * Go to Google Maps -> Share -> "Embed a map" to get this code.
    ```html
    <iframe
      src="https://www.google.com/maps/embed?pb=..."
      width="600"
      height="450"
      style="border:0;"
      allowfullscreen=""
      loading="lazy">
    </iframe>
    ```

---

### 2. Responsive Images (`<picture>` vs. `srcset`)

* **Lecture & Concepts:**
    * An `<img>` tag loads one image. But what if you want a massive high-res photo for a 4K desktop, but a tiny, square thumbnail for a phone to save data?
    * **Method 1: `srcset` (Resolution Switching)**
        * Use this when you have the *same image* in different sizes. You let the browser decide which one to load based on the screen width and wifi speed.
    * **Method 2: `<picture>` (Art Direction)**
        * Use this when you want to change the *content* or *crop* of the image. (e.g., a square crop for mobile, a wide crop for desktop).
        * It works like `<video>`: You provide multiple `<source>` tags, and the browser picks the first one that matches the `media` query.

* **In-Depth Example (Your Profile Photo, Responsively):**
    ```html
    <picture>
      <source media="(min-width: 800px)" srcset="assets/profile-wide.jpg">
      <source media="(min-width: 450px)" srcset="assets/profile-tablet.jpg">
      <img src="assets/profile-square.jpg" alt="Alice Chen smiling at her desk.">
    </picture>
    ```

### 3. Scalable Vector Graphics (`<svg>`)

* **Lecture & Concepts:**
    * **Raster (JPG/PNG):** Made of pixels. If you zoom in, they get blurry.
    * **Vector (SVG):** Made of math (lines, curves, coordinates). You can zoom in infinitely, and they stay crisp. Perfect for logos and icons.
    * **Embedding:** You can use an SVG in an `<img>` tag, OR you can paste the raw `<svg>...</svg>` code directly into your HTML.
    * **Benefit of Inline SVG:** You can change the fill color using CSS (`fill: red;`)!

* **⭐️ Class Exercise: Embed a Map, a Demo, and Your Own Logo**
    1.  On `contact.html`, embed a Google Map of your city using an `<iframe>` with `loading="lazy"`.
    2.  On `index.html`'s Featured Work section, embed a YouTube demo (or placeholder) for one project using an `<iframe>`.
    3.  Design (or find a generator for) a simple SVG monogram of your initials. Paste the raw `<svg>` code into your `<header>` as your site's logo, next to your `<h1>`.
    4.  Add a `style="fill: #0E7AFE;"` (or your own color) to the `<svg>` tag and watch it change.

---

### Week 5: Comprehensive Assignment

**Objective:** Build "About Me" page (`about.html`) — the second page of your portfolio, with a responsive photo and an intro video.

**Files Involved:**
1.  `about.html` (new)
2.  `assets/` (photos, video, and your SVG logo go here)

#### Requirements:

1.  **Structure:** Reuses the exact `<header>`/`<nav>`/`<footer>` from `index.html` and `contact.html` — this is one consistent site, not three unrelated pages.
2.  **Intro Video:** A self-recorded (or placeholder) `<video>` with `controls`, a `poster`, and text fallback for unsupported browsers.
3.  **Responsive Photo:** A `<picture>` element for your profile photo — a square crop on mobile (default), a wider crop for screens over 800px.
4.  **Project Demo Embed:** On `index.html`, embed a YouTube demo for one Featured Work project using an `<iframe>` with `loading="lazy"`.
5.  **Location:** On `contact.html`, embed a Google Map of your city.
6.  **Logo:** Your SVG monogram appears in the `<header>` of all three pages.

**Bonus Challenge:** Add `<track kind="captions">` to your intro video with a simple `.vtt` captions file.
