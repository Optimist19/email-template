import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("https://api.staging.delve.fun/api/v1/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await res.json();
      console.log("Response Data:", data);
      alert("Form submitted successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow">
      <div className="mb-4">
        <label className="block text-sm font-medium">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium">Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        ></textarea>
      </div>
      
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Submit
      </button>
    </form>
  );
}
