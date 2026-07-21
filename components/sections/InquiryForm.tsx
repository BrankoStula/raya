"use client";

import { useState } from "react";

// RAYA enquiry — house RBG pattern: no-cors POST of JSON to a Google Apps Script
// /exec endpoint + a honeypot. Endpoint + WhatsApp come from env (set in .env.local);
// until they land the form still renders and degrades to the email/WhatsApp line.
const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ?? "";
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

type Status = "idle" | "submitting" | "success" | "error";

type FormData = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  budget: string;
  timeline: string;
  message: string;
  honeyPot: string;
};

const EMPTY: FormData = {
  name: "",
  email: "",
  phone: "",
  interest: "",
  budget: "",
  timeline: "",
  message: "",
  honeyPot: "",
};

const LABEL = "label-caps mb-2 block text-clay";
const FIELD =
  "w-full border-b border-limestone/20 bg-transparent py-3 text-limestone placeholder-limestone/30 transition-colors focus:border-clay focus:outline-none";
const SELECT = `${FIELD} appearance-none cursor-pointer`;

export default function InquiryForm() {
  const [data, setData] = useState<FormData>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");

  const change = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => setData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (data.honeyPot !== "") {
      setStatus("success");
      return;
    }
    if (!SCRIPT_URL) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ ...data, source: "raya.bali" }),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="cine-panel cine-text mx-auto max-w-lg py-16 text-center">
        <h3
          className="font-display text-limestone"
          style={{ fontSize: "var(--text-h2)" }}
        >
          Request received.
        </h3>
        <p className="mt-4 text-limestone/70">
          Thank you. We&apos;ll be in touch shortly with availability, pricing and
          the full RAYA package.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto w-full max-w-xl text-left">
      {/* honeypot */}
      <input
        type="text"
        name="honeyPot"
        value={data.honeyPot}
        onChange={change}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />

      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className={LABEL}>
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            value={data.name}
            onChange={change}
            className={FIELD}
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className={LABEL}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={data.email}
            onChange={change}
            className={FIELD}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className={LABEL}>
            Phone / WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={data.phone}
            onChange={change}
            className={FIELD}
            placeholder="+62 …"
          />
        </div>

        <div>
          <label htmlFor="interest" className={LABEL}>
            Interest
          </label>
          <select
            id="interest"
            name="interest"
            required
            value={data.interest}
            onChange={change}
            className={`${SELECT} ${data.interest === "" ? "text-limestone/40" : ""}`}
          >
            <option value="" disabled className="bg-espresso">
              Select
            </option>
            <option value="Villa" className="bg-espresso">
              A Villa
            </option>
            <option value="Apartment" className="bg-espresso">
              A Pool-Apartment
            </option>
            <option value="Both" className="bg-espresso">
              Both
            </option>
          </select>
        </div>

        <div>
          <label htmlFor="timeline" className={LABEL}>
            Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            value={data.timeline}
            onChange={change}
            className={`${SELECT} ${data.timeline === "" ? "text-limestone/40" : ""}`}
          >
            <option value="" disabled className="bg-espresso">
              Select
            </option>
            <option value="Ready now" className="bg-espresso">
              Ready now
            </option>
            <option value="1–3 months" className="bg-espresso">
              1–3 months
            </option>
            <option value="3–6 months" className="bg-espresso">
              3–6 months
            </option>
            <option value="Exploring" className="bg-espresso">
              Exploring
            </option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={LABEL}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={data.message}
            onChange={change}
            className={`${FIELD} resize-none`}
            placeholder="Anything you&apos;d like us to know"
          />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-6 text-sm text-clay">
          Couldn&apos;t submit just now. Reach us directly at{" "}
          <a className="underline" href="mailto:hello@raya.bali">
            hello@raya.bali
          </a>
          {WHATSAPP ? (
            <>
              {" "}
              or{" "}
              <a className="underline" href={`https://wa.me/${WHATSAPP}`}>
                WhatsApp
              </a>
            </>
          ) : null}
          .
        </p>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="label-caps bg-limestone px-8 py-4 text-espresso transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "submitting" ? "Sending…" : "Request the package"}
        </button>
        {WHATSAPP ? (
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="label-caps border border-limestone/40 px-8 py-4 text-limestone transition-colors hover:border-limestone"
          >
            WhatsApp
          </a>
        ) : null}
      </div>
    </form>
  );
}
