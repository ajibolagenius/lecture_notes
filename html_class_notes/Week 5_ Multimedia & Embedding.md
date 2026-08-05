# Week 5: Multimedia & Embedding

Welcome to Week 5! Until now, our websites have been mostly text and simple images. This week, we make them **loud and moving**. You will learn how to natively embed high-quality video and audio, how to safely embed content from other giants like YouTube and Google Maps, and how to master responsive images for any device.

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
        * **`poster`**: An image that shows while the video downloads or before the user hits play. (Like a YouTube thumbnail).

* **In-Depth Example (The "Bulletproof" Syntax):**
    We don't rely on just one file format. We provide options, and the browser picks the first one it understands.

    ```html
    <video controls width="600" poster="images/video-thumbnail.jpg">

      <source src="videos/movie.webm" type="video/webm">

      <source src="videos/movie.mp4" type="video/mp4">

      <p>Your browser does not support the video tag.
      <a href="videos/movie.mp4">Download the video</a>.</p>
    </video>
    ```


### 2. The `<audio>` Element

* **Lecture & Concepts:**
    * Works almost exactly like `<video>`, but without the visual component.
    * Supports `controls`, `autoplay`, `loop`, and `muted`.
    * **Common Formats:** `.mp3` (Universal), `.ogg` (Open source), `.wav` (High quality, large size).

* **In-Depth Example:**
    ```html
    <figure>
      <figcaption>Listen to our latest podcast:</figcaption>

      <audio controls>
        <source src="audio/podcast-ep1.mp3" type="audio/mpeg">
        <source src="audio/podcast-ep1.ogg" type="audio/ogg">
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
      <source src="movie.mp4" type="video/mp4">
      <track src="subtitles_en.vtt" kind="captions" srclang="en" label="English">
    </video>
    ```

* **⭐️ Class Exercise: Create a Music Player**
    1.  Create a new HTML file.
    2.  Find a sample `.mp3` file online (or use a local one).
    3.  Use the `<audio>` tag with the `controls` attribute.
    4.  Wrap it in a `<figure>` and add a `<figcaption>` with the song title and artist.

---

## Module 9: Advanced Media & Embedding

Sometimes you don't want to host the file yourself. You want to use Google Maps' data or YouTube's streaming power.

### 1. Embedding with `<iframe>`

* **Lecture & Concepts:**
    * An **iFrame** (Inline Frame) is literally a "window" into another website. You are cutting a hole in your page and showing `google.com` or `youtube.com` inside it.
    * **Attributes:**
        * `src`: The URL of the page to show.
        * `width` / `height`: Dimensions of the window.
        * `allowfullscreen`: Lets the user put the video in full-screen mode.
        * `loading="lazy"`: **Modern Best Practice.** Tells the browser not to load this heavy content until the user scrolls near it.
    * **Security:** iFrames can be risky. Use the `sandbox` attribute if you are embedding untrusted content to restrict scripts and popups.

* **In-Depth Example (YouTube):**
    * *Note: You cannot just use the URL of the video page. You must use the "Embed" URL.*
    ```html
    <h3>My Favorite Video</h3>
    <iframe
      width="560"
      height="315"
      src="[https://www.youtube.com/embed/dQw4w9WgXcQ](https://www.youtube.com/embed/dQw4w9WgXcQ)"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      loading="lazy">
    </iframe>
    ```

* **In-Depth Example (Google Maps):**
    * Go to Google Maps -> Share -> "Embed a map" to get this code.
    ```html
    <iframe
      src="[https://www.google.com/maps/embed?pb=](https://www.google.com/maps/embed?pb=)..."
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
        * `<img src="small.jpg" srcset="large.jpg 1000w, medium.jpg 500w" ...>`
    * **Method 2: `<picture>` (Art Direction)**
        * Use this when you want to change the *content* or *crop* of the image. (e.g., A wide landscape for desktop, but a zoomed-in portrait crop for mobile).
        * It works like `<video>`: You provide multiple `<source>` tags, and the browser picks the first one that matches the `media` query.

* **In-Depth Example (The `<picture>` Element):**

    ```html
    <picture>
      <source media="(min-width: 800px)" srcset="images/hero-desktop.jpg">

      <source media="(min-width: 450px)" srcset="images/hero-tablet.jpg">

      <img src="images/hero-mobile.jpg" alt="A happy customer using our product">
    </picture>
    ```

### 3. Scalable Vector Graphics (`<svg>`)

* **Lecture & Concepts:**
    * **Raster (JPG/PNG):** Made of pixels. If you zoom in, they get blurry.
    * **Vector (SVG):** Made of math (lines, curves, coordinates). You can zoom in infinitely, and they stay crisp. Perfect for logos and icons.
    * **Embedding:** You can use an SVG in an `<img>` tag, OR you can paste the raw `<svg>...</svg>` code directly into your HTML.
    * **Benefit of Inline SVG:** You can change the fill color using CSS (`fill: red;`)!

* **⭐️ Class Exercise: Embed a Map & Logo**
    1.  Go to Google Maps, find your favorite city, and grab the "Embed" iframe code. Paste it into your page.
    2.  Find a simple SVG logo online (e.g., the Twitter logo code). Paste the raw `<svg>` code into your HTML.
    3.  Add a `style` attribute to the `<svg>` tag: `style="fill: blue; width: 50px;"` and watch it change.

---

### Week 5: Comprehensive Assignment

**Objective:** Create a "Media Showcase" page featuring audio, video, responsive images, and embedded content.

**Files to Create:**
1.  `index.html`
2.  `style.css` (Optional, just for basic layout)
3.  **Assets:** You will need sample files. You can use these placeholder links if you don't have local files:
    * Video: `https://www.w3schools.com/html/mov_bbb.mp4`
    * Audio: `https://www.w3schools.com/html/horse.mp3`
    * Images: Use placeholders like `https://via.placeholder.com/800x400`

#### Requirements:

1.  **Structure:** Standard HTML5 boilerplate with a `<header>` (Title: "My Media Collection") and a `<main>` section.
2.  **Section 1: The Cinema (Local Video):**
    * Add an `<h2>` title.
    * Embed the sample MP4 video.
    * Ensure it has `controls`.
    * Add a `poster` image (you can use a placeholder image).
    * **Expert Step:** Add a text fallback for browsers that don't support video.
3.  **Section 2: The Jukebox (Local Audio):**
    * Add an `<h2>` title.
    * Embed the sample MP3 audio.
    * Ensure it has `controls` and is set to `loop`.
4.  **Section 3: The Screening Room (YouTube Embed):**
    * Add an `<h2>` title.
    * Embed your favorite YouTube video using an `iframe`.
    * Set the width to `100%` and add `loading="lazy"`.
5.  **Section 4: The Art Gallery (Responsive Images):**
    * Add an `<h2>` title.
    * Use the `<picture>` element.
    * Display a **square** image (e.g., `https://via.placeholder.com/400x400`) for mobile screens (default).
    * Display a **wide** image (e.g., `https://via.placeholder.com/800x400`) for screens wider than `600px`.
    * **Crucial:** Don't forget the `alt` text on the fallback `<img>` tag.

**Bonus Challenge:** Find an SVG icon code online. Create a footer and paste the SVG icon there, acting as a "logo" for your page.
