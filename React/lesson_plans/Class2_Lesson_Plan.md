# 📋 React Class 2 — Lesson Plan (Tutor Script)
### Props, Composition & Thinking in Components
**Duration:** ~2 hours | **Format:** Build the full page shell

---

## ⏱ Session Timeline

| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Homework review |
| 0:10 – 0:40 | Props deep dive: types, defaults, validation signals |
| 0:40 – 1:10 | The `children` prop and composition patterns |
| 1:10 – 1:50 | Thinking in components: decompose the portfolio into a tree |
| 1:50 – 2:00 | Exercise brief |

---

## 🎤 PART A — Props Deep Dive (0:10 – 0:40)

**[SAY:]:**
> "Props are the inputs to a component. They flow one direction: from parent to child. A child never reaches up to modify a parent's data. Understanding this constraint is what makes React apps predictable."

**[TYPE:]**
```jsx
// Props are read-only. This is enforced by convention, not by the language.
function CourseCard({ title, price }) {
  // ❌ Never do this — modifying props
  price = price * 1.1   // This changes the local copy, not the parent's data
                         // It is a code smell that indicates wrong architecture

  // ✅ Derive new values from props
  const discountedPrice = price * 0.9

  return <p>₦{discountedPrice.toLocaleString()}</p>
}
```

### Prop Types — What Goes In (15 min)

**[TYPE — covering all prop types students will encounter:]**
```jsx
function ComponentShowcase({
  // Primitives
  title,             // string
  count,             // number
  isActive,          // boolean — note: <Comp isActive /> is shorthand for isActive={true}
  id,                // string or number

  // Functions (callbacks — how children talk back to parents)
  onClick,           // () => void
  onSubmit,          // (formData) => void
  onChange,          // (newValue) => void

  // Objects and arrays
  user,              // { id, name, email }
  courses,           // Array<{ id, title, price }>

  // React elements
  icon,              // <SomeIcon /> — passed as a prop
  children,          // Everything between opening and closing tags

  // Default values
  variant = 'default',
  size = 'medium',
  disabled = false,

}) {
  return (
    <div className={`component component--${variant} component--${size}`}>
      {icon && <span className="icon">{icon}</span>}
      <h3>{title}</h3>
      {children}
      <button onClick={onClick} disabled={disabled}>
        Action
      </button>
    </div>
  )
}
```

**[SAY:]:**
> "Notice `onClick` — a function passed as a prop. This is how children communicate with parents. The parent passes down a function; the child calls it when something happens. The parent's state changes. React re-renders. This is the 'events flow up' rule from the board."

---

### Boolean Props Shorthand (5 min)

**[TYPE:]**
```jsx
// These are equivalent:
<Button disabled={true} />
<Button disabled />       // ← Shorthand — presence of the prop means true

// These are also equivalent:
<Button disabled={false} />
<Button />                // ← Absence of the prop means it will use the default (false)
```

---

## 🎤 PART B — The `children` Prop & Composition (0:40 – 1:10)

**[SAY:]:**
> "The `children` prop is what makes React composable. Instead of a card knowing about every possible layout variation, we make it a wrapper and let the parent decide what goes inside."

**[TYPE:]**
```jsx
// Without children — inflexible, props explosion
function Card({ title, body, footer, image, badge, isHighlighted }) { ... }
// You would need to keep adding props for every new variation

// With children — flexible, composable
function Card({ children, className = '' }) {
  return (
    <article className={`card ${className}`}>
      {children}
    </article>
  )
}

function CardHeader({ children }) {
  return <header className="card__header">{children}</header>
}

function CardBody({ children }) {
  return <div className="card__body">{children}</div>
}
```

**[SAY:]:**
> "Now the card is a container, not a controller. The parent decides what goes inside."

**[SHOW usage:]**
```jsx
// Parent composes the card content
<Card className="card--featured">
  <CardHeader>
    <h2>React 19</h2>
    <Badge variant="new">New</Badge>
  </CardHeader>
  <CardBody>
    <p>Learn the latest React features including Actions...</p>
  </CardBody>
</Card>

// Same Card, completely different content
<Card>
  <CardHeader>
    <Avatar src={user.avatar} name={user.name} />
    <time>{post.date}</time>
  </CardHeader>
  <CardBody>
    <p>{post.excerpt}</p>
  </CardBody>
</Card>
```

**[SAY:]:**
> "This is the composition pattern. It is the React equivalent of the HTML `children` we discussed in the HTML course. The same idea — a wrapper that holds whatever you put in it — but now it is a JavaScript component that can have behaviour too."

---

### The `as` Prop Pattern (5 min)

```jsx
// Sometimes you want a component to render as a different HTML element
function Text({ as: Component = 'p', children, className = '' }) {
  return <Component className={`text ${className}`}>{children}</Component>
}

// Usage
<Text>A paragraph</Text>           // renders as <p>
<Text as="h1">A heading</Text>     // renders as <h1>
<Text as="span">Inline</Text>      // renders as <span>
```

---

## 🎤 PART C — Thinking in Components (1:10 – 1:50)

**[SAY:]:**
> "The hardest part of React is not the syntax. It is knowing how to decompose a UI into components. Let me teach you the process."

**[SHOW the portfolio design (or draw it on the board) and decompose it live:]**

```
STEP 1: Draw boxes around UI regions
STEP 2: Name each box with a noun
STEP 3: Identify what data each box needs (its props)
STEP 4: Identify which boxes are repeated (those become parameterised components)
STEP 5: Decide who owns the data (the nearest common ancestor of all consumers)
```

**[DRAW and NAME the component tree:]**
```
App
├── SiteHeader
│   ├── Logo
│   └── NavBar
│       └── NavLink (×5)
├── HeroSection
│   ├── HeroText
│   └── HeroCTA (button)
├── CoursesSection
│   └── CourseCard (×N)
│       ├── Badge
│       └── EnrolButton
├── AboutSection
└── SiteFooter
    └── FooterLinks
```

**[BUILD together — start with the shell, work outward:]**

```jsx
// src/components/SiteHeader.jsx
import NavBar from './NavBar'

function SiteHeader() {
  return (
    <header className="site-header">
      <a href="/" className="site-header__logo" aria-label="Deejoft home">
        Deejoft
      </a>
      <NavBar />
    </header>
  )
}

export default SiteHeader
```

```jsx
// src/components/NavBar.jsx
const NAV_LINKS = [
  { href: '/',        label: 'Home'    },
  { href: '/courses', label: 'Courses' },
  { href: '/about',   label: 'About'   },
  { href: '/contact', label: 'Contact' },
]

function NavBar() {
  return (
    <nav aria-label="Primary navigation">
      <ul className="nav__list">
        {NAV_LINKS.map(link => (
          <li key={link.href}>
            <a href={link.href} className="nav__link">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
```

```jsx
// src/components/HeroSection.jsx
function HeroSection({ title, subtitle, ctaText, ctaHref }) {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__content">
        <h1 id="hero-heading" className="hero__title">
          {title}
        </h1>
        <p className="hero__subtitle">{subtitle}</p>
        <a href={ctaHref} className="btn btn--primary btn--large">
          {ctaText}
        </a>
      </div>
    </section>
  )
}

export default HeroSection
```

```jsx
// Updated App.jsx
import SiteHeader from './components/SiteHeader'
import HeroSection from './components/HeroSection'
import CourseCard from './components/CourseCard'
import SiteFooter from './components/SiteFooter'

const courses = [ /* ... */ ]

function App() {
  return (
    <>
      <SiteHeader />
      <HeroSection
        title="Learn to Code in Lagos"
        subtitle="Modern web development taught by working developers."
        ctaText="Browse Courses"
        ctaHref="/courses"
      />
      <main className="container">
        <section aria-labelledby="courses-heading">
          <h2 id="courses-heading">Our Courses</h2>
          <div className="course-grid">
            {courses.map(course => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

export default App
```

---

## 📅 Exercise (1:50 – 2:00)

**[SAY:]:**
> "For next class: take the `CoursesSection` and extract it into its own component. Give it a `title` prop (defaults to `'Our Courses'`) and a `courses` prop (the array). Build a `SiteFooter` component with copyright text and three footer links. Make sure every component is in its own file in `src/components/`."

---

## 📎 Tutor Notes

**The most important concept today:** The composition pattern with `children`. If students understand this, they will be able to build flexible, reusable components throughout the course. If they do not, they will build components with too many props and get stuck.

**Common mistake:** Passing a function but calling it: `onClick={handleClick()}` vs `onClick={handleClick}`. The first calls the function immediately on render and passes its return value (probably `undefined`). The second passes the function reference to be called later when the event occurs.
