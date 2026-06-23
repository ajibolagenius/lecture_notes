# JavaScript Advanced Projects: Full-Stack Features & Complex Architectures

**Course Level:** Intermediate to Expert (Weeks 1-6 Mastery)
**Deployment Requirement:** All projects must be deployed to Netlify or Vercel.

---

## 🎯 Advanced Project Requirements

All advanced projects must implement:

1. **Complex State Management**: Handle multiple data states (loading, success, error) across different components
2. **Advanced Array Methods**: Combine `.map()`, `.filter()`, `.reduce()`, `.find()` in sophisticated ways
3. **Error Handling**: Try-catch blocks with custom error messages and fallback UI
4. **Local Storage**: Persist data between sessions using `localStorage` API
5. **Event Delegation**: Handle events efficiently on dynamically created elements
6. **Performance Optimization**: Debouncing/throttling for search inputs and API calls
7. **Responsive Design**: Mobile-first approach with media queries
8. **Code Organization**: Separate concerns using functions and modules (Object-based architecture)
9. **API Integration**: Multiple API calls, data transformation, pagination
10. **Advanced DOM Manipulation**: Create complex, nested HTML structures dynamically

---

## 📊 Project 1: "Full-Stack E-Commerce Dashboard"

**APIs Used:** FakeStore API + Custom Product Analytics
**Difficulty:** ⭐⭐⭐⭐ (Advanced)

### Core Requirements

#### 1.1 **Multi-Filter & Sort System**
- Fetch products from `https://fakestoreapi.com/products`
- Implement **cascading filters**:
  - By category (using `.filter()`)
  - By price range (using `.filter()` with comparison)
  - By rating (products with rating > X stars)
- Implement sorting:
  - Price (low to high, high to low)
  - Popularity (by rating)
  - Newest first
- **Bonus Complexity**: Combine multiple filters simultaneously (e.g., "Electronics under $500 with 4+ stars")

#### 1.2 **Dynamic Cart System**
- Add/remove products from cart
- Track quantity per product
- Calculate total price with `.reduce()`
- Apply discount codes using `.find()` to match code with discount amount
- **Persistent Cart**: Save cart to `localStorage` as JSON

#### 1.3 **Product Details Modal**
- Display images, description, price, ratings
- Show product reviews (if available from API)
- Calculate average rating using `.reduce()` over reviews
- Include quantity selector and "Add to Cart" button

#### 1.4 **Analytics Dashboard (Bonus)**
- Show total revenue (sum of all cart totals)
- Most viewed product
- Best-selling category
- Use `.reduce()` for complex aggregations

#### 1.5 **Search & Auto-Complete**
- Search products by name/description
- Implement debouncing to limit API calls
- Show suggestions as user types

### Technical Implementation Details

```javascript
// Example structure:
const eCommerceApp = {
  products: [],
  cart: [],
  filters: {
    category: null,
    priceRange: [0, 1000],
    minRating: 0
  },

  // Initialize app
  init() {
    this.loadProducts();
    this.loadCartFromStorage();
    this.setupEventListeners();
  },

  // Fetch products with error handling
  async loadProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      this.products = await response.json();
      this.render();
    } catch (error) {
      this.showError(error.message);
    }
  },

  // Complex filtering logic
  getFilteredProducts() {
    return this.products
      .filter(p => this.filters.category ? p.category === this.filters.category : true)
      .filter(p => p.price >= this.filters.priceRange[0] && p.price <= this.filters.priceRange[1])
      .filter(p => p.rating.rate >= this.filters.minRating);
  },

  // Calculate cart total
  getCartTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
};
```

---

## 🎬 Project 2: "Advanced Movie Database Explorer"

**APIs Used:** TMDB API + Omdb API (optional)
**Difficulty:** ⭐⭐⭐⭐⭐ (Expert)

### Core Requirements

#### 2.1 **Multi-Source Search**
- Search across movies, TV shows, and actors simultaneously
- Combine results from different API endpoints
- Implement **pagination** for large result sets
- Handle rate limiting and API quotas

#### 2.2 **Advanced Filtering & Discovery**
- Filter by:
  - Genre (using `.filter()` and genre IDs)
  - Release year (range slider)
  - Rating (popularity, vote average)
  - Language
- Implement "Trending Today" using API data
- "Recommendations" based on selected movie (API provides related movies)

#### 2.3 **Watchlist & Collections**
- Create multiple custom watchlists (e.g., "Sci-Fi to Watch", "Feel-Good Movies")
- Add/remove items with optimistic UI updates
- Share watchlist (generate shareable URL with encoded watchlist data)
- **Local Storage**: Persist watchlists with metadata (created date, last modified)

#### 2.4 **Advanced Details View**
- Fetch detailed info about selected movie:
  - Cast list with photos
  - Plot summary
  - Runtime, budget, revenue
  - Similar/recommended movies
  - External links (IMDb, trailers)
- **Data Transformation**: Convert API data to app-friendly format

#### 2.5 **User Rating & Review System**
- Allow users to rate movies (1-10 stars)
- Write text reviews (store locally)
- Display average user rating using `.reduce()`
- Sort reviews by helpfulness (likes)

#### 2.6 **Advanced Search with Suggestions**
- Show search suggestions as user types (debounced API calls)
- **Caching**: Store recent searches in `localStorage` to reduce API calls
- Popular searches based on local data

### Technical Implementation Details

```javascript
// Example advanced architecture:
const movieApp = {
  state: {
    movies: [],
    watchlists: JSON.parse(localStorage.getItem('watchlists')) || [],
    recentSearches: [],
    currentPage: 1,
    searchQuery: '',
    filters: {
      genres: [],
      yearRange: [1900, 2026],
      minRating: 0,
      language: 'en'
    }
  },

  // Debounced search
  searchDebounce: null,

  handleSearch(query) {
    clearTimeout(this.searchDebounce);
    this.searchDebounce = setTimeout(() => {
      this.performSearch(query);
    }, 300); // Wait 300ms after user stops typing
  },

  // Complex data transformation
  async performSearch(query) {
    try {
      const response = await fetch(`/api/search?q=${query}`);
      const data = await response.json();

      // Transform and combine results
      this.state.movies = data.results
        .filter(item => item.title || item.name) // Ensure we have a title
        .map(item => ({
          ...item,
          displayTitle: item.title || item.name,
          year: new Date(item.release_date || item.first_air_date).getFullYear(),
          type: item.title ? 'movie' : 'tv'
        }))
        .sort((a, b) => b.popularity - a.popularity);

      this.render();
    } catch (error) {
      this.showError('Search failed. Please try again.');
    }
  },

  // Advanced filtering
  getFilteredMovies() {
    return this.state.movies
      .filter(movie => this.matchesGenres(movie))
      .filter(movie => movie.year >= this.state.filters.yearRange[0])
      .filter(movie => movie.vote_average >= this.state.filters.minRating);
  },

  // Add to watchlist with intelligent grouping
  addToWatchlist(movieId, watchlistId) {
    const watchlist = this.state.watchlists.find(wl => wl.id === watchlistId);
    if (watchlist) {
      watchlist.movies.push(movieId);
      this.saveWatchlists();
    }
  }
};
```

---

## 💼 Project 3: "Real-Time Job Board with Smart Filtering"

**APIs Used:** JSearch API (or custom job data)
**Difficulty:** ⭐⭐⭐⭐ (Advanced)

### Core Requirements

#### 3.1 **Job Listing with Pagination**
- Fetch job postings from API
- Implement cursor-based or page-based pagination
- Load more / infinite scroll
- Display: Title, Company, Location, Salary, Description, Requirements

#### 3.2 **Advanced Filtering Pipeline**
- Filter by:
  - Job title/keyword (search with `.filter()`)
  - Location (with radius/distance filtering if coordinates available)
  - Salary range (`.filter()` with min/max comparison)
  - Job type (Full-time, Part-time, Contract, Remote)
  - Experience level (Entry, Mid, Senior)
  - Industry/Category
- **Smart Filters**: Remember last used filters in `localStorage`

#### 3.3 **Saved Jobs & Applications**
- Save job postings to "Favorites"
- Create job applications with:
  - Cover letter (template system)
  - Upload resume
  - Application history (track when applied, status)
- Store in `localStorage` with timestamps

#### 3.4 **Job Matching Algorithm**
- Analyze user profile skills (comma-separated input)
- Match against job requirements using `.filter()` and string similarity
- Calculate match score (percentage)
- Highlight matching skills in job description

#### 3.5 **Salary Analytics**
- Show salary range distribution by job title
- Average salary by location
- Use `.reduce()` to aggregate salary data
- Create simple bar charts (can use HTML `<progress>` bars)

#### 3.6 **Notifications & Alerts**
- Set job alerts for specific keywords
- Store alerts in `localStorage`
- When new jobs are fetched, check against alerts
- Show badge with count of matching new jobs

### Technical Implementation Details

```javascript
// Complex filtering with scoring
const jobBoard = {
  async searchJobs(keyword, filters = {}) {
    try {
      const response = await fetch(`/api/jobs?search=${keyword}`, {
        headers: { 'Authorization': `Bearer ${API_KEY}` }
      });

      let jobs = await response.json();

      // Apply complex filter pipeline
      jobs = this.applyFilters(jobs, filters);

      // Score jobs based on user profile
      jobs = jobs.map(job => ({
        ...job,
        matchScore: this.calculateMatch(job, filters.userSkills || [])
      }));

      // Sort by relevance
      return jobs.sort((a, b) => b.matchScore - a.matchScore);
    } catch (error) {
      console.error('Job search failed:', error);
      return [];
    }
  },

  calculateMatch(job, userSkills) {
    const jobSkills = job.requirements
      .toLowerCase()
      .split(/[,\s]+/)
      .filter(s => s.length > 2);

    const matches = userSkills.filter(skill =>
      jobSkills.some(req => req.includes(skill.toLowerCase()))
    );

    return (matches.length / userSkills.length) * 100;
  },

  // Salary analytics using reduce
  getSalaryStats(jobs) {
    return jobs.reduce((acc, job) => {
      const salary = job.salary_max || 0;
      return {
        average: acc.average + salary,
        max: Math.max(acc.max, salary),
        min: acc.min === null ? salary : Math.min(acc.min, salary),
        count: acc.count + 1
      };
    }, { average: 0, max: 0, min: null, count: 0 });
  }
};
```

---

## 🏥 Project 4: "Healthcare Appointment Booking System"

**APIs Used:** Public Health Data API + Google Calendar API (optional)
**Difficulty:** ⭐⭐⭐⭐⭐ (Expert)

### Core Requirements

#### 4.1 **Doctor/Provider Discovery**
- Fetch doctors from data source with:
  - Name, specialty, bio, rating, availability
  - Location (with map integration using Leaflet.js)
  - Years of experience
- Filter by:
  - Specialty (using `.filter()`)
  - Rating (4+ stars)
  - Location/distance
  - Availability (has openings this week)

#### 4.2 **Appointment Booking Flow**
- **Step 1**: Select provider
- **Step 2**: Choose specialty/reason for visit
- **Step 3**: Pick date & available time slots
  - Fetch available slots from API/database
  - Block out already booked times
  - Show time slots visually (calendar grid)
- **Step 4**: Enter patient info + confirm
- **Step 5**: Confirmation with appointment details & reminder options

#### 4.3 **Calendar & Availability Management**
- Display provider schedule in calendar format
- Show booked (red) vs. available (green) slots
- Handle time zone conversions if needed
- Generate recurring availability rules (e.g., "Available Mon-Fri 9am-5pm")

#### 4.4 **Patient & Appointment History**
- Track all user appointments (past and upcoming)
- Cancel/reschedule appointments
- Store in `localStorage` with appointment ID, provider, date, time, status
- Show upcoming appointments on dashboard

#### 4.5 **Smart Recommendation Engine**
- Based on last appointment type, suggest related specialists
- Recommend follow-up appointments (e.g., "You had a checkup 6 months ago")
- Use `.find()` or `.filter()` to match patterns

#### 4.6 **Notifications & Reminders**
- Set reminders (24h, 1h before appointment)
- Store reminder preferences
- Show notification badge for upcoming appointments

### Technical Implementation Details

```javascript
// Complex appointment system
const appointmentApp = {
  state: {
    providers: [],
    appointments: [],
    availableSlots: [],
    currentBooking: null,
    userInfo: {}
  },

  // Generate available time slots
  generateTimeSlots(providerId, date) {
    const provider = this.state.providers.find(p => p.id === providerId);
    const dayOfWeek = new Date(date).getDay();

    // Get provider's working hours for this day
    const workHours = provider.schedule[dayOfWeek];
    if (!workHours) return [];

    // Generate 30-minute slots
    const slots = [];
    const [startHour, endHour] = workHours;

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const slotTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

        // Check if slot is already booked
        const isBooked = this.state.appointments.some(apt =>
          apt.provider_id === providerId &&
          apt.date === date &&
          apt.time === slotTime &&
          apt.status !== 'cancelled'
        );

        if (!isBooked) {
          slots.push({ time: slotTime, available: true });
        }
      }
    }

    return slots;
  },

  // Find best matching providers
  findBestProviders(specialty, maxDistance = 5) {
    return this.state.providers
      .filter(p => p.specialty === specialty)
      .filter(p => this.calculateDistance(p.location) <= maxDistance)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10); // Top 10
  },

  // Check for recommended follow-ups
  getRecommendedFollowUps() {
    const lastAppointment = this.state.appointments
      .filter(a => a.status === 'completed')
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

    if (!lastAppointment) return [];

    const daysSinceLastVisit = Math.floor(
      (new Date() - new Date(lastAppointment.date)) / (1000 * 60 * 60 * 24)
    );

    // If checkup was 6+ months ago, recommend follow-up
    if (lastAppointment.type === 'checkup' && daysSinceLastVisit > 180) {
      return this.findBestProviders(lastAppointment.specialty);
    }

    return [];
  }
};
```

---

## 🎓 Project 5: "Learning Management System (LMS) Dashboard"

**APIs Used:** Custom Course API (or YouTube API for video data)
**Difficulty:** ⭐⭐⭐⭐ (Advanced)

### Core Requirements

#### 5.1 **Course Catalog with Advanced Search**
- Fetch courses with metadata: title, description, instructor, duration, level, rating
- Search with multiple filters:
  - Keyword search
  - Category/topic (`.filter()`)
  - Level (beginner, intermediate, advanced)
  - Price range
  - Rating (4.5+ stars)
  - Language
- Sort by: relevance, popularity, newest, price (low-high)

#### 5.2 **Enrollment & Progress Tracking**
- Enroll in courses (store enrollment in `localStorage`)
- Track progress:
  - Lessons completed / total lessons
  - Percentage complete (using `.reduce()`)
  - Current streak (days learning in a row)
- Show progress bars with visual indicators

#### 5.3 **Lesson Management**
- Display course curriculum (nested structure: courses → modules → lessons)
- Mark lessons as complete
- Calculate time spent on each lesson
- Adaptive learning: suggest next lesson based on completion

#### 5.4 **Personalized Dashboard**
- Show enrolled courses
- In-progress courses (sorted by urgency/due date)
- Recommended courses (based on completed courses)
- Learning statistics:
  - Total hours learned (using `.reduce()`)
  - Certificates earned
  - Current streak
  - Achievements/badges

#### 5.5 **Advanced Recommendation Engine**
- Use `.filter()` to find courses related to completed courses
- Match course prerequisites with completed lessons
- Suggest harder courses after completing intermediate courses
- Show personalization score (match percentage)

#### 5.6 **Quiz & Assessment System**
- Display quiz questions (multiple choice, true/false)
- Calculate score automatically
- Show correct/incorrect answers
- Store quiz results with timestamp
- Track performance trends (use `.map()` to transform results into statistics)

### Technical Implementation Details

```javascript
// Complex LMS with nested data structures
const lmsApp = {
  state: {
    courses: [],
    enrollments: [],
    completedLessons: [],
    quizResults: []
  },

  // Calculate course progress
  getCourseProgress(courseId) {
    const course = this.state.courses.find(c => c.id === courseId);

    // Count total lessons across all modules
    const totalLessons = course.modules.reduce((sum, mod) =>
      sum + mod.lessons.length, 0
    );

    // Count completed lessons
    const completedCount = this.state.completedLessons.filter(cl =>
      course.modules.some(mod =>
        mod.lessons.some(lesson => lesson.id === cl)
      )
    ).length;

    return {
      percentage: Math.round((completedCount / totalLessons) * 100),
      completed: completedCount,
      total: totalLessons
    };
  },

  // Get learning statistics
  getLearningStats() {
    const enrolledCourses = this.state.enrollments.map(e =>
      this.state.courses.find(c => c.id === e.course_id)
    );

    return {
      coursesEnrolled: enrolledCourses.length,
      coursesCompleted: enrolledCourses.filter(c =>
        this.getCourseProgress(c.id).percentage === 100
      ).length,
      totalHours: enrolledCourses.reduce((sum, course) =>
        sum + course.modules.reduce((modSum, mod) =>
          modSum + mod.lessons.reduce((lesSum, lesson) =>
            lesSum + lesson.duration_minutes, 0), 0), 0
      ),
      averageRating: enrolledCourses.reduce((sum, c) =>
        sum + c.rating, 0) / enrolledCourses.length
    };
  },

  // Smart course recommendations
  getRecommendedCourses() {
    const completedCourses = this.state.enrollments
      .filter(e => this.getCourseProgress(e.course_id).percentage === 100)
      .map(e => this.state.courses.find(c => c.id === e.course_id));

    // Extract topics and levels from completed courses
    const completedTopics = new Set(
      completedCourses.flatMap(c => c.topics)
    );

    const avgLevel = completedCourses.reduce((sum, c) =>
      sum + (c.level === 'beginner' ? 1 : c.level === 'intermediate' ? 2 : 3), 0
    ) / completedCourses.length;

    // Find courses with similar topics but higher level
    return this.state.courses
      .filter(c => !this.state.enrollments.some(e => e.course_id === c.id)) // Not enrolled
      .filter(c => c.topics.some(t => completedTopics.has(t))) // Related topics
      .filter(c => this.getLevel(c.level) >= avgLevel) // At least same difficulty
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
  }
};
```

---

## 📋 Common Advanced Patterns to Use

### Pattern 1: Chained Array Methods
```javascript
// Filter → Map → Sort → Slice (Pagination)
const results = data
  .filter(item => item.active === true)
  .filter(item => item.price >= minPrice && item.price <= maxPrice)
  .map(item => ({
    ...item,
    displayPrice: `$${item.price.toFixed(2)}`,
    discount: item.price * 0.1
  }))
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 10); // Get top 10
```

### Pattern 2: Complex Reduce Operations
```javascript
// Group and count
const grouped = items.reduce((acc, item) => {
  const category = item.category;
  if (!acc[category]) {
    acc[category] = { items: [], count: 0 };
  }
  acc[category].items.push(item);
  acc[category].count++;
  return acc;
}, {});
```

### Pattern 3: Debounced API Calls
```javascript
let debounceTimer;
const handleSearch = (query) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    fetchData(query);
  }, 300); // Wait 300ms after user stops typing
};
```

### Pattern 4: Error Handling Across Async Calls
```javascript
async function loadMultipleAPIs() {
  try {
    const [data1, data2, data3] = await Promise.all([
      fetch('/api/1').then(r => r.json()),
      fetch('/api/2').then(r => r.json()),
      fetch('/api/3').then(r => r.json())
    ]);
    return { data1, data2, data3 };
  } catch (error) {
    console.error('One or more API calls failed:', error);
    // Provide fallback or retry logic
  }
}
```

### Pattern 5: Local Storage with JSON
```javascript
// Save
const data = { cart: [], preferences: {} };
localStorage.setItem('appData', JSON.stringify(data));

// Load
const savedData = JSON.parse(localStorage.getItem('appData')) || {};
```

---

## 🚀 Deployment Checklist

Before deploying to Netlify/Vercel:

- [ ] All API keys are hidden (use environment variables)
- [ ] Error states are handled with user-friendly messages
- [ ] Loading indicators show during API calls
- [ ] Mobile responsiveness is tested
- [ ] Local storage is working across browser sessions
- [ ] Console has no errors or warnings
- [ ] Performance: API calls are debounced/throttled
- [ ] Accessible: Keyboard navigation works, ARIA labels present
- [ ] README.md explains features and setup

---

## 🎓 Learning Outcomes

By completing these advanced projects, you will master:

✅ Complex state management patterns
✅ Advanced array methods (`.map()`, `.filter()`, `.reduce()`, `.find()`, chaining)
✅ Error handling with try-catch and graceful fallbacks
✅ Local storage persistence and data serialization
✅ Event delegation for dynamic elements
✅ Debouncing and throttling for performance
✅ Multi-API integration and data transformation
✅ Pagination and lazy loading
✅ Complex filtering and sorting pipelines
✅ Responsive, accessible UI design
✅ Professional code organization and best practices
