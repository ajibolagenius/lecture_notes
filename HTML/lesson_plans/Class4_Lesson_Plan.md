# 📋 HTML Class 3 — Lesson Plan (Tutor Script)
### Forms & Interactive Controls
**Duration:** ~2 hours | **Format:** Live coding + paired exercise

---

## ⏱ Session Timeline

| Time | Segment |
|------|---------|
| 0:00 – 0:15 | Screen reader demo — why forms matter |
| 0:15 – 0:45 | Form anatomy: labels, inputs, fieldsets |
| 0:45 – 1:20 | Modern input types, validation, select & radio |
| 1:20 – 1:45 | Full form build |
| 1:45 – 2:00 | Paired exercise: Enrolment form |

---

## 🛠 Setup (Do Before Students Arrive)
- Chrome with **ChromeVox** or **Screen Reader** extension installed
- Two HTML files ready: `bad-form.html` (unlabelled inputs) and `good-form.html` (fully labelled)
- VS Code with a blank `form.html` ready for live coding

---

## 🎤 PART A — Screen Reader Demo (0:00 – 0:15)

### The Unlabelled Form (10 min)

**[SAY]:**
> "I want you to feel something before I explain it. I am going to turn on a screen reader and try to fill out this form. Watch — and think: could you fill this out if all you could hear was what the screen reader says?"

**[OPEN `bad-form.html` — show a form with inputs and NO labels]:**
```html
<!-- bad-form.html — DO NOT show this code to students yet -->
<form>
  <input type="text" placeholder="Enter your name">
  <input type="email" placeholder="Enter your email">
  <select>
    <option>HTML</option>
    <option>JavaScript</option>
  </select>
  <button>Submit</button>
</form>
```

**[ENABLE ChromeVox — TAB through the form. The screen reader announces only "edit text", "edit text", "combobox" — no labels.]**

**[SAY]:**
> "What did you hear? 'Edit text'. 'Edit text'. 'Combo box'. Which field is for my name? Which is for my email? I have no idea. This form is completely unusable for a blind user. And this is not a rare edge case — the WHO estimates 2.2 billion people worldwide have some form of visual impairment."

**[OPEN `good-form.html` — same form with correct labels]:**

**[ENABLE ChromeVox — TAB through. Screen reader announces: "Full Name, edit text", "Email Address, edit text", "Choose a course, combo box".]**

**[SAY]:**
> "Same form. Two minutes of additional HTML. Now it is usable. Labels are not a nice-to-have. They are a requirement."

---

### The `for`/`id` Connection (5 min)

**[SAY]:**
> "Here is the mechanism. Every `<label>` has a `for` attribute. Every `<input>` has an `id` attribute. The values must match exactly — same spelling, same case. That connection is how the browser knows which label belongs to which input."

**[TYPE — slowly, while explaining]:**
```html
<label for="student-name">Full Name</label>
<input type="text" id="student-name" name="student_name">
```

**[SAY]:**
> "Click the label text in the browser. Notice the input gets focus. That is not just visual — it is the same accessibility mechanism. When a screen reader user navigates to the input, it reads the associated label aloud. The `for`/`id` bridge makes that happen."

**[SHOW the broken version]:**
```html
<!-- ❌ This does NOT create an accessible connection -->
<label>Full Name</label>
<input type="text" name="student_name">
```

**[SAY]:**
> "This looks the same on screen. But the label and input are not programmatically connected. A screen reader announces 'edit text' — no label. This is the most common form accessibility bug in the real world."

---

## 🎤 PART B — Form Anatomy (0:15 – 0:45)

### The `<form>` Element (5 min)

**[TYPE]:**
```html
<form action="/enrol" method="POST" novalidate>
```

**[SAY]:**
> "`action` tells the form where to send its data when submitted — usually a URL on your server. `method` is how it sends it: `GET` puts data in the URL (for search forms, filters), `POST` sends it in the request body (for creating, updating, any private data). For an enrolment form — `POST`."
>
> "`novalidate` disables the browser's built-in validation UI. We still use the HTML5 validation *attributes* (`required`, `minlength`, etc.) as a data API, but we want to style the error messages ourselves with CSS later. We also want to handle validation with JavaScript in the JavaScript course. For now, we leave `novalidate` on and understand what it does."

---

### `<fieldset>` and `<legend>` (10 min)

**[SAY]:**
> "`<fieldset>` groups related inputs together. `<legend>` gives the group a name. Think of it as a named container for a logical section of your form."

**[TYPE]:**
```html
<fieldset>
  <legend>Personal Details</legend>

  <div class="field">
    <label for="full-name">Full Name <span aria-hidden="true">*</span></label>
    <input
      type="text"
      id="full-name"
      name="full_name"
      autocomplete="name"
      placeholder="Ada Lovelace"
      required
      minlength="2"
      maxlength="100"
      aria-describedby="name-hint"
    >
    <span id="name-hint" class="field-hint">Enter your name as it appears on your ID.</span>
  </div>

</fieldset>
```

**[PAUSE — explain each attribute]:**

> "`autocomplete='name'` — this tells the browser the type of data this field expects. The browser can then offer to autofill it from the user's saved profile. The standardised values are documented at MDN. Use them. Users fill in forms 3× faster with autocomplete."

> "`required` — the field must not be empty on submission. Without `novalidate`, the browser shows its own error. With `novalidate`, this attribute becomes a signal we can read with JavaScript or CSS."

> "`minlength` and `maxlength` — minimum and maximum character counts. `minlength='2'` prevents single-character submissions. `maxlength='100'` prevents a user pasting a 10,000 character essay into a name field."

> "`aria-describedby='name-hint'` — this links the hint text to the input. When a screen reader focuses the input, it reads the label AND then the hint. The user hears: 'Full Name. Enter your name as it appears on your ID.' Without `aria-describedby`, the hint is visually present but audibly invisible."

> "`aria-hidden='true'` on the asterisk — screen readers would read 'asterisk' which is confusing. We hide it and explain that required fields are marked with an asterisk in a note below the form."

---

### Email, Phone & Date Inputs (15 min)

**[TYPE]:**
```html
  <div class="field">
    <label for="email">Email Address <span aria-hidden="true">*</span></label>
    <input
      type="email"
      id="email"
      name="email"
      autocomplete="email"
      placeholder="ada@example.com"
      required
    >
  </div>

  <div class="field">
    <label for="phone">Phone Number</label>
    <input
      type="tel"
      id="phone"
      name="phone"
      autocomplete="tel"
      placeholder="+234 800 000 0000"
    >
  </div>

  <div class="field">
    <label for="dob">Date of Birth</label>
    <input
      type="date"
      id="dob"
      name="dob"
      min="1940-01-01"
      max="2010-12-31"
    >
  </div>
```

**[SAY]:**
> "The `type` attribute is doing a lot of work here. Walk through this with me."

**[SHOW TABLE on handout or write on board]:**

| `type=` | Mobile keyboard | Built-in validation |
|---------|----------------|---------------------|
| `text` | Standard | None |
| `email` | Has `@` key prominent | Must have `@` and domain |
| `tel` | Number pad | None (formats vary) |
| `number` | Number pad | Must be numeric, `min`/`max` enforced |
| `date` | Native date picker | Must be valid date |
| `url` | Has `.com` button | Must start with `http://` |
| `password` | Standard, masked | None |

**[SAY]:**
> "On a phone: if you use `type='text'` for a phone number field, the user sees a full keyboard and has to switch to numbers. If you use `type='tel'`, they immediately see a number pad. That is one attribute improving the experience of every mobile user who ever fills in your form."

---

## 🎤 PART C — Select, Radio & Checkboxes (0:45 – 1:20)

### Select Dropdown (10 min)

**[TYPE]:**
```html
<fieldset>
  <legend>Course Preferences</legend>

  <div class="field">
    <label for="course">Choose a Starting Course</label>
    <select id="course" name="course" required>
      <option value="" disabled selected>-- Select a course --</option>
      <optgroup label="Web Development">
        <option value="html-css">HTML & CSS</option>
        <option value="javascript">JavaScript</option>
        <option value="react">React</option>
      </optgroup>
      <optgroup label="Mobile">
        <option value="react-native">React Native</option>
      </optgroup>
    </select>
  </div>
```

**[SAY]:**
> "The first `<option>` has `disabled selected value=''`. This creates the placeholder — 'Select a course'. `disabled` prevents it from being submitted. `selected` makes it the default. `value=''` is an empty string so `required` catches it if the user never changes it."
>
> "`<optgroup>` groups options with a visible label. It is not selectable — it is purely organizational. Essential for long dropdowns."

---

### Radio Buttons (10 min)

**[TYPE]:**
```html
  <fieldset>
    <legend>Preferred Schedule</legend>

    <div class="field field--inline">
      <input type="radio" id="schedule-morning" name="schedule" value="morning" checked>
      <label for="schedule-morning">Weekday Mornings (9am–12pm)</label>
    </div>

    <div class="field field--inline">
      <input type="radio" id="schedule-evening" name="schedule" value="evening">
      <label for="schedule-evening">Weekday Evenings (6pm–9pm)</label>
    </div>

    <div class="field field--inline">
      <input type="radio" id="schedule-weekend" name="schedule" value="weekend">
      <label for="schedule-weekend">Weekends (10am–4pm)</label>
    </div>
  </fieldset>
```

**[SAY]:**
> "Radio buttons work as a group — only one can be selected at a time. The group is defined by the `name` attribute — every radio in the group must share the same `name`. The `value` is what gets submitted when this option is selected. The `id` must be unique to each radio button — that is what connects it to its individual label."
>
> "They must all be inside a `<fieldset>` with a `<legend>`. Without that wrapper, a screen reader user hears 'Morning', 'Evening', 'Weekend' — but has no idea these are schedule options. With the `<legend>`, they hear 'Preferred Schedule group. Weekday Mornings, radio button, 1 of 3.'"

---

### Checkboxes (5 min)

**[TYPE]:**
```html
  <fieldset>
    <legend>How did you hear about us?</legend>
    <div class="field field--inline">
      <input type="checkbox" id="source-twitter" name="source" value="twitter">
      <label for="source-twitter">X / Twitter</label>
    </div>
    <div class="field field--inline">
      <input type="checkbox" id="source-instagram" name="source" value="instagram">
      <label for="source-instagram">Instagram</label>
    </div>
    <div class="field field--inline">
      <input type="checkbox" id="source-referral" name="source" value="referral">
      <label for="source-referral">Friend / Colleague Referral</label>
    </div>
  </fieldset>
</fieldset>
```

**[SAY]:**
> "Checkboxes vs. radios: checkboxes allow multiple selections. Radios allow one. Same grouping rules apply — shared `name`, individual `id` and `label for` on each one."

---

### Textarea, Range & Datalist (15 min)

**[TYPE]:**
```html
<fieldset>
  <legend>A Little More</legend>

  <div class="field">
    <label for="experience">Your Coding Experience Level</label>
    <input
      type="range"
      id="experience"
      name="experience"
      min="0" max="4" step="1" value="0"
      list="experience-labels"
    >
    <datalist id="experience-labels">
      <option value="0" label="None"></option>
      <option value="1" label="Beginner"></option>
      <option value="2" label="Some"></option>
      <option value="3" label="Intermediate"></option>
      <option value="4" label="Advanced"></option>
    </datalist>
  </div>

  <div class="field">
    <label for="goals">What do you hope to build?</label>
    <textarea
      id="goals"
      name="goals"
      rows="4"
      placeholder="I want to build an app that..."
      maxlength="500"
    ></textarea>
  </div>

</fieldset>
```

**[SAY]:**
> "`<datalist>` linked to a `<input type='range'>` shows tick labels on the slider in supporting browsers. The connection is the `list` attribute on the input matching the `id` on the `<datalist>`. `<datalist>` also works with `type='text'` to show autocomplete suggestions while the user types — completely native, no JavaScript."

**[SAY about textarea]:**
> "`<textarea>` is the multi-line text input. It must have an opening AND closing tag — unlike `<input>`. Do not put placeholder text inside the tags — use the `placeholder` attribute. `rows` sets the visible height. Always set `maxlength` on textareas — without it, a user can paste a 10,000-word essay."

---

## 🎤 PART D — Completing the Form (1:20 – 1:45)

**[TYPE to finish the form]:**
```html
  <p class="form-note">
    Fields marked <abbr title="required">*</abbr> are required.
  </p>

  <button type="submit">Submit Enrolment</button>
  <button type="reset">Clear Form</button>

</form>
```

**[SAY]:**
> "`<abbr>` is for abbreviations. The `title` attribute provides the expanded form — screen readers announce it, and desktop browsers show it on hover. `type='submit'` submits the form. `type='reset'` clears all fields back to their default values — use sparingly, users often misclick it."

**[DEMO — submit the form and show the data in the URL bar (if method=GET for demo) or browser network tab]:**

**[SAY]:**
> "Open DevTools → Network tab → Submit the form. See the request? Look at the payload: `full_name=Ada+Lovelace&email=ada%40example.com&course=react`. Each name/value pair corresponds to a `name` attribute and a `value`. The `name` attribute on every input is what makes data submission work. An input without a `name` is never submitted."

---

## ✏️ PART E — Paired Exercise (1:45 – 2:00)

**[SAY]:**
> "In pairs: build an enrolment form from scratch. One person types, one reads the requirements aloud and checks each line. Switch halfway through."

**Requirements on board:**
```
✅ <form> with action and method
✅ Two <fieldset> groups with <legend>
✅ name (text), email (email), phone (tel) — all labelled with for/id
✅ A <select> with at least 4 options and an optgroup
✅ A radio group of 3 options inside a nested <fieldset>
✅ A <textarea> with maxlength
✅ Required fields marked with aria-hidden asterisk
✅ Submit and Reset buttons
✅ Zero validation errors
```

---

## 🔚 Wrap-Up (Last 3 min)

**[SAY]:**
> "Whenever you write a form input, ask three questions: Does it have a `<label>` connected by `for`/`id`? Does it have the right `type`? Does it have a `name`? If the answer to any of those is no — the form is broken."
>
> "Next class: media, accessibility, and production HTML. We will learn responsive images, accessible video, ARIA attributes, and how to write a `<head>` that actually helps your site get found on Google."

---

## 📎 Tutor Notes

**Most common form errors in this class:**
- Forgetting `for` on the label or `id` on the input — they look the same, aren't linked
- Using the same `id` on two inputs (IDs must be unique per page)
- Forgetting `name` on inputs — data won't submit
- Writing `<input type="radio">` without a `value` — submits "on" instead of meaningful data
- Not wrapping radio/checkbox groups in `<fieldset>` + `<legend>`

**If pressed for time:** Skip `<datalist>` and `<input type="range">` — cover them as a bonus in Class 4. Do not skip radio/checkbox grouping — it is too important.
