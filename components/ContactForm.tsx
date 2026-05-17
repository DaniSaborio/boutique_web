"use client";

import { useState } from "react";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="rounded-2xl border p-7 md:p-10 max-w-2xl mx-auto"
      style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
    >
      {submitted ? (
        <div className="text-center py-10">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(168,213,186,0.2)" }}
          >
            <svg className="w-7 h-7" style={{ color: "#3a8a5e" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-display font-bold text-xl mb-2" style={{ color: "var(--foreground)" }}>
            ¡Mensaje enviado!
          </h3>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Te responderemos lo antes posible. Gracias por contactarnos.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid sm:grid-cols-2 gap-5 mb-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Nombre <span style={{ color: "var(--error)" }}>*</span>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                required
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Correo <span style={{ color: "var(--error)" }}>*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@correo.com"
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "var(--text-muted)" }}
            >
              Mensaje <span style={{ color: "var(--error)" }}>*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="¿En qué podemos ayudarte?"
              rows={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Enviando...
              </span>
            ) : (
              "Enviar Mensaje"
            )}
          </button>
        </form>
      )}
    </div>
  );
};
