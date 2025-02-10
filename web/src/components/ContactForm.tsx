import type React from "react";
import { useState, type FormEvent } from "react";

// cmd contact forn :
// npx vercel dev

interface FormData {
  subject: string;
  name: string;
  email: string;
  message: string;
  honeypot: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    subject: "",
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // This is the only place the event is used, so we can keep it.
    if (validateForm() && formData.honeypot === "") {
      setIsLoading(true);
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject: formData.subject,
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }),
        });

        const text = await response.text();

        // Try to parse if it's JSON
        try {
          const data = JSON.parse(text);
          if (!response.ok) {
            throw new Error(`Failed to send email: ${data.error}`);
          }
        } catch (parseError) {
          console.error("Failed to parse response:", parseError);
          throw new Error("Failed to parse response");
        }

        setIsSubmitted(true);
        setFormData({
          subject: "",
          name: "",
          email: "",
          message: "",
          honeypot: "",
        });
      } catch (error) {
        console.error("Failed to send email:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const inputClass = (error?: string) =>
    `w-full p-2 border rounded ${
      error ? "border-red-500" : "border-gray-300"
    } focus:outline-none focus:border-[#10A588]`;

  if (isSubmitted) {
    return (
      <div className="text-center p-6">
        <h3 className="text-[#10A588] text-xl mb-4">
          Thank you for your message!
        </h3>
        <p className="text-gray-600">I'll get back to you soon.</p>
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
            htmlFor="name"
            className="block text-slate-800 text-sm font-bold mb-2"
          >
            Your Name
          </label>
          <input
            className={inputClass(errors.name)}
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-slate-800 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            className={inputClass(errors.email)}
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-slate-800 text-sm font-bold mb-2"
          >
            Subject
          </label>
          <input
            className={inputClass(errors.subject)}
            id="subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-slate-800 text-sm font-bold mb-2"
          >
            Message
          </label>
          <textarea
            className={inputClass(errors.message)}
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="Your message"
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        {/* Honeypot field */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#10A588] text-white py-2 px-4 rounded hover:bg-[#0D8C73] transition-colors disabled:bg-gray-400"
        >
          {isLoading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
