import type React from "react";
import { useState, type FormEvent } from "react";

interface FormData {
  subject: string;
  name: string;
  email: string;
  message: string;
  honeypot: string; // Added honeypot field
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    subject: "",
    name: "",
    email: "",
    message: "",
    honeypot: "", // Initialize honeypot field
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
      isValid = false;
    }
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm() && formData.honeypot === "") {
      // Check if honeypot is empty
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      setFormData({
        subject: "",
        name: "",
        email: "",
        message: "",
        honeypot: "",
      });
    }
  };

  const inputClass = (error?: string) => `
    w-full px-3 py-2 text-slate-800 bg-white border 
    ${error ? "border-red-500" : "border-slate-300"} 
    rounded-md focus:outline-none focus:ring-2 focus:ring-[#10A588] 
    transition-all duration-300
  `;

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto mt-10 px-4 text-center">
        <h2 className="text-[#10A588] text-3xl font-mono font-medium mb-6">
          Thank you for your message!
        </h2>
        <p className="text-slate-800">
          I'll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <h2 className="text-[#10A588] text-3xl font-mono font-medium mb-6">
        Contact Me
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            className="block text-slate-800 text-sm font-bold mb-2"
            htmlFor="subject"
          >
            Subject
          </label>
          <input
            className={inputClass(errors.subject)}
            id="subject"
            type="text"
            placeholder="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
          {errors.subject && (
            <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
          )}
        </div>
        <div>
          <label
            className="block text-slate-800 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className={inputClass(errors.name)}
            id="name"
            type="text"
            placeholder="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label
            className="block text-slate-800 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={inputClass(errors.email)}
            id="email"
            type="email"
            placeholder="your@email.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label
            className="block text-slate-800 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            className={`${inputClass(errors.message)} h-32 resize-none`}
            id="message"
            placeholder="Your message here"
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message}</p>
          )}
        </div>
        {/* Honeypot field */}
        <div className="hidden">
          <label htmlFor="honeypot">Leave this field empty</label>
          <input
            type="text"
            id="honeypot"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <div>
          <button
            className="bg-[#10A588] hover:bg-[#0D8C73] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
            type="submit"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
