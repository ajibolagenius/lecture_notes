import { useEffect, useRef, useState } from 'react'

export default function ContactForm() {
  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    contactMethod: "email",
    message: ""
  })

  const [errors, setErrors] = useState({})

  // Helper functions

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(
      (prevData) => ({ ...prevData, [name]: value })
    )
  }

  // Validation functions
  const isValidEmail = (email) => email.includes("@") && email.includes(".");
  const isMessageLongEnough = (message) => message.trim().length >= 20;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valud email address."
    }

    if (!isMessageLongEnough(formData.message)) {
      newErrors.message = "Your message needs to be at least 20 characters."
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      console.log("Form is valid! Submitting:", formData)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Get In Touch</legend>

        <label htmlFor="name">Name:</label>
        <input
          ref={nameInputRef}
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </fieldset>

      <label htmlFor="reason">Reason for contact:</label>
      <select id="reason" name="reason" value={formData.reason} onChange={handleChange}>
        <option value="">--Please choose an option--</option>
        <option value="job">Job Opportunity</option>
        <option value="collab">Collaboration</option>
        <option value="hi">Just Saying Hi</option>
      </select>

      <p>Preferred contact method:</p>
      <label>
        <input
          type="radio"
          name="contactMethod"
          value="email"
          checked={formData.contactMethod === "email"}
          onChange={handleChange}
        />
        Email
      </label>
      <label>
        <input
          type="radio"
          name="contactMethod"
          value="phone"
          checked={formData.contactMethod === "phone"}
          onChange={handleChange}
        />
        Phone
      </label>

      <label htmlFor="message">Message:</label>
      <textarea
        id="message"
        name="message"
        rows="5"
        value={formData.message}
        onChange={handleChange}
      />
      {errors.message && <p className="error">{errors.message}</p>}

      <button type="submit">Send Message</button>
    </form>
  )

}