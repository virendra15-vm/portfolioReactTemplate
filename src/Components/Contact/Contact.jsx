import React, { useState } from "react";
import "./Contact.css"
import theme_pattern from "../../assets/theme_pattern.svg"
import mail_icon from "../../assets/mail_icon.svg"
import location_icon from "../../assets/location_icon.svg"
import call_icon from "../../assets/call_icon.svg"


const Contact = () => {

  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    
      const form = event.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  // 🧠 Basic Validation
  if (!name || !email || !message) {
    setResult("Please fill all fields.");
    setTimeout(() => setResult(""), 3000);
    return;
  }

  // ✅ Simple email format check
  const emailPattern = /\S+@\S+\.\S+/;
  if (!emailPattern.test(email)) {
    setResult("Please enter a valid email.");
    setTimeout(() => setResult(""), 3000);
    return;
  }

    const formData = new FormData(event.target);

    formData.append("access_key", "75d91172-f7b8-4474-b69c-eb3cf33f896c");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
      setTimeout(() => {
        setResult("");
      }, 3000);
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div id='contact' className='contact' name="contact">
      <div className="contact-title">
        <h1>Get in touch</h1>
        <img src={theme_pattern} alt="" />
      </div>
      <div className="contact-section">
        <div className="contact-left">
          <h1>Let's talk</h1>
          <p>I'm currently avaliable to take on new projects, so feel free to send me a message about anything that you want me to work on. You can contact anytime.</p>
          <div className="contact-details">
            <div className="contact-detail">
              <img src={mail_icon} alt="" /> <p>greatstackdev@gmail.com</p>
            </div>
            <div className="contact-detail">
              <img src={call_icon} alt="" /> <p>+772-825-524</p>
            </div>
            <div className="contact-detail">
              <img src={location_icon} alt="" /> <p>CA, United States</p>
            </div>
          </div>
        </div>
        <form onSubmit={onSubmit} className="contact-right">
          <label htmlFor="">Your Name</label>
          <input type="text" placeholder='Enter your name' name='name' />
          <label htmlFor="">Your Email</label>
          <input type="text" placeholder='Enter your email' name='email' />
          <label htmlFor="">Write your message here</label>
          <textarea name="message" rows="8" placeholder='Enter your message'></textarea>
          <button type='submit' className="contact-submit">Submit Now</button>
          <span>{result}</span>
        </form>

      </div>
    </div>
  )
}

export default Contact