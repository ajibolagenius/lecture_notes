# 📄 HTML Class 3 — Student Handout
### Forms & Interactive Controls
**Deejoft Coding School** | Bring this to class.

---

## A. The Golden Rule of Forms

Every `<input>`, `<select>`, and `<textarea>` must have a **programmatically connected label**.

The connection is made by matching the `for` attribute on `<label>` to the `id` on the input:

```html
<label for="student-name">Full Name</label>  ←  for="student-name"
<input type="text" id="student-name">         ←  id="student-name"
```

> ⚠️ These two values must **match exactly** — same spelling, same case.

> ✏️ **Fill in:** What does a screen reader announce when a user focuses an input that has NO connected label?
>
> It announces: __________________________________

> ✏️ **Fill in:** Write the `<label>` + `<input>` pair for an email field. The label should say "Email Address" and the input id should be `"email-addr"`:
>
> ```html
>
>
> ```

---

## B. Form Anatomy — Full Annotated Example

```html
<form
  action="/enrol"       ←  Where data is sent on submit
  method="POST"         ←  How it's sent: POST for creating/sensitive data, GET for search/filters
  novalidate            ←  Disable browser's default validation UI (we handle it ourselves)
>

  <fieldset>
    <legend>Personal Details</legend>
    <!--  <fieldset> groups related inputs. <legend> names the group.
          A screen reader announces the legend name before each input in the group.  -->

    <div class="field">
      <label for="full-name">
        Full Name
        <span aria-hidden="true">*</span>  ←  Visual asterisk, hidden from screen readers
      </label>
      <input
        type="text"
        id="full-name"
        name="full_name"           ←  The key sent with the form data. REQUIRED for submission.
        autocomplete="name"        ←  Browser offers to autofill from saved profile
        placeholder="Ada Lovelace" ←  Hint text (not a replacement for the label)
        required                   ←  Field must not be empty
        minlength="2"              ←  Minimum characters
        maxlength="100"            ←  Maximum characters
        aria-describedby="name-hint"  ←  Links hint text to this input
      >
      <span id="name-hint">Enter your name as it appears on your ID.</span>
    </div>

  </fieldset>

</form>
```

> ✏️ **Fill in:** What does the `name` attribute on an `<input>` control?
>
> _________________________________________________________________

> ✏️ **Fill in:** What happens if you submit a form and an input has no `name` attribute?
>
> _________________________________________________________________

---

## C. Input `type` Values — Why They Matter

```html
<input type="text">     ← Standard keyboard on mobile
<input type="email">    ← Keyboard shows @ key prominently. Validates: must have @ and domain.
<input type="tel">      ← Number pad on mobile. No format validation (phone formats vary).
<input type="number">   ← Number pad. Validates: must be numeric. Respects min/max/step.
<input type="date">     ← Native date picker. Validates: must be a valid date.
<input type="url">      ← Shows .com button on mobile. Validates: must start with http/https.
<input type="password"> ← Standard keyboard, input is masked.
<input type="search">   ← Standard keyboard with clear button.
<input type="range">    ← Slider control. Use min, max, step.
<input type="checkbox"> ← True/false toggle. Multiple can be selected.
<input type="radio">    ← One of many. Same name = same group. Only one selectable.
<input type="file">     ← File upload.
<input type="hidden">   ← Invisible. Sends data without user seeing it.
<input type="submit">   ← Submit the form (use <button type="submit"> instead).
```

> ✏️ **Fill in:** Which `type` should you use for a field asking for a website URL?
>
> `type="__________"`

> ✏️ **Fill in:** A form has a field for age (number only, between 18 and 65). Write the input:
>
> ```html
> <input type="______" id="age" name="age" min="__" max="__">
> ```

---

## D. Group Controls Reference

### Select Dropdown

```html
<label for="course">Choose a Course</label>
<select id="course" name="course" required>

  <option value="" disabled selected>-- Select --</option>
  <!--  disabled + selected + value="" = placeholder option  -->

  <optgroup label="Web Development">          ←  Groups options visually, not selectable
    <option value="html-css">HTML & CSS</option>
    <option value="javascript">JavaScript</option>
  </optgroup>

  <optgroup label="Mobile">
    <option value="react-native">React Native</option>
  </optgroup>

</select>
```

### Radio Buttons

```html
<fieldset>
  <legend>Preferred Schedule</legend>
  <!--  Radio groups MUST be in a <fieldset> with a <legend>  -->

  <div class="field field--inline">
    <input type="radio" id="sched-am" name="schedule" value="morning" checked>
    <!--  name="schedule" — all radios in the group share the SAME name  -->
    <!--  id must be UNIQUE to each radio  -->
    <label for="sched-am">Mornings (9am–12pm)</label>
  </div>

  <div class="field field--inline">
    <input type="radio" id="sched-pm" name="schedule" value="evening">
    <label for="sched-pm">Evenings (6pm–9pm)</label>
  </div>
</fieldset>
```

### Checkboxes

```html
<fieldset>
  <legend>How did you hear about us?</legend>

  <div class="field field--inline">
    <input type="checkbox" id="src-twitter" name="source" value="twitter">
    <label for="src-twitter">X / Twitter</label>
  </div>

  <div class="field field--inline">
    <input type="checkbox" id="src-referral" name="source" value="referral">
    <label for="src-referral">Friend Referral</label>
  </div>
</fieldset>
```

> ✏️ **Fill in:** What is the key difference between radio buttons and checkboxes?
>
> Radio: ________________________________________________________
>
> Checkbox: _____________________________________________________

> ✏️ **Fill in:** What makes a group of radio buttons behave as a group (only one selectable at a time)?
>
> The __________ attribute — all radios in the group must share the same value.

---

## E. Textarea, Range & Datalist

```html
<!-- Multi-line text input -->
<label for="goals">What do you hope to build?</label>
<textarea
  id="goals"
  name="goals"
  rows="4"                    ←  Visible height in lines
  maxlength="500"             ←  Maximum character count — always set this
  placeholder="I want to build..."
></textarea>
<!--  Note: <textarea> has an opening AND closing tag, unlike <input>  -->

<!-- Slider with labelled tick marks -->
<label for="experience">Experience Level</label>
<input type="range" id="experience" name="experience"
  min="0" max="4" step="1" value="0" list="exp-labels">
<datalist id="exp-labels">
  <option value="0" label="None"></option>
  <option value="2" label="Some"></option>
  <option value="4" label="Advanced"></option>
</datalist>
```

---

## F. Validation Attributes Reference

| Attribute | What it does | Works on |
|-----------|-------------|---------|
| `required` | Field must not be empty | All inputs, select, textarea |
| `minlength="n"` | Minimum n characters | text, email, password, url, search |
| `maxlength="n"` | Maximum n characters | text, email, password, url, search, textarea |
| `min="n"` | Minimum value | number, date, range |
| `max="n"` | Maximum value | number, date, range |
| `step="n"` | Value must be in steps of n | number, range |
| `pattern="regex"` | Must match this regular expression | text, email, url |

---

## G. Class 3 Exercise Checklist

- [ ] `<form>` with `action` and `method="POST"`
- [ ] At least two `<fieldset>` groups with `<legend>`
- [ ] Full name input: `type="text"`, `for`/`id` connected, `required`, `autocomplete="name"`
- [ ] Email input: `type="email"`, `required`, `autocomplete="email"`
- [ ] Phone input: `type="tel"`, `autocomplete="tel"`
- [ ] `<select>` with a placeholder option and at least one `<optgroup>`
- [ ] Radio button group: same `name`, individual `id` and `label for`, wrapped in `<fieldset>` + `<legend>`
- [ ] `<textarea>` with `maxlength`
- [ ] Required fields marked with asterisk (`aria-hidden="true"`) + explanatory note
- [ ] `<button type="submit">` and `<button type="reset">`
- [ ] Zero W3C validation errors

---

## ⚡ Quick Reference — Class 3 Forms

| Element / Attribute | Key Rule |
|---------------------|---------|
| `<form action method>` | `action` = destination, `method` = GET or POST |
| `<fieldset>` + `<legend>` | Groups inputs and names the group |
| `<label for="id">` | MUST match the `id` of its input |
| `id` on `<input>` | MUST be unique on the page |
| `name` on `<input>` | REQUIRED for data submission |
| `autocomplete` | Use standardised values: `name`, `email`, `tel`, etc. |
| `required` | Field must not be empty |
| `aria-describedby` | Links hint/error text to an input |
| `aria-hidden="true"` | Hides from screen readers (use on decorative asterisks) |
| Radio `name` | All radios in a group share the same `name` |
| Radio/checkbox `value` | What gets submitted when this option is selected |
| `<select>` placeholder | First `<option>`: `value=""` + `disabled` + `selected` |
| `<textarea>` | Has opening AND closing tag. Always set `maxlength`. |
| `<button type="submit">` | Submits. Always set `type` explicitly. |

---

*Deejoft Coding School | HTML Class 3 | Bring to Class 4*
