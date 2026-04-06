import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, MapPin, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";

// ── Shared animation helper ──────────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Form types & helpers ─────────────────────────────────────────────────────

type FormData = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  website: string; // honeypot
};

type FormErrors = Partial<Record<keyof Omit<FormData, "website" | "projectType" | "budget">, string>>;

const initialFormData: FormData = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  message: "",
  website: "",
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateFields(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required.";
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.message.trim()) errors.message = "Message is required.";
  return errors;
}

type SubmitState = "idle" | "loading" | "success";

// ── Shared input styles ──────────────────────────────────────────────────────

const inputBase =
  "w-full bg-background border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary text-sm transition-all duration-200 outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20";

// ── Contact Page ─────────────────────────────────────────────────────────────

export function ContactPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  function handleChange(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleBlur(field: keyof FormErrors) {
    const fieldErrors = validateFields(formData);
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Honeypot — silently reject bots
    if (formData.website) return;

    const fieldErrors = validateFields(formData);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setSubmitState("loading");

    // TODO: Wire up Supabase — insert into contact_submissions table
    console.log("Contact form submission:", {
      name: formData.name,
      email: formData.email,
      projectType: formData.projectType,
      budget: formData.budget,
      message: formData.message,
    });

    await new Promise((res) => setTimeout(res, 900));

    setSubmitState("success");
    setTimeout(() => {
      setSubmitState("idle");
      setFormData(initialFormData);
      setErrors({});
    }, 3000);
  }

  return (
    <main className="min-h-screen pt-28 pb-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-16 lg:gap-24 items-start max-w-6xl mx-auto">

          {/* ── Left column ─────────────────────────────────────────────── */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-4"
            >
              Contact
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
              className="font-heading font-bold text-5xl md:text-6xl text-text-primary leading-none tracking-tight mb-5"
            >
              Let's talk.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="text-text-secondary text-lg leading-relaxed mb-10"
            >
              Have a project in mind, a role to fill, or just want to connect?
              I'd love to hear from you.
            </motion.p>

            {/* Contact rows */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.5 }}
              className="flex flex-col gap-4"
            >
              {/* Email */}
              <a
                href="mailto:alan@alanponton.com"
                className="group inline-flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors duration-200 w-fit"
              >
                <div className="w-9 h-9 rounded-lg bg-[#6366F1]/10 flex items-center justify-center flex-none group-hover:bg-[#6366F1]/20 transition-colors duration-200">
                  <Mail size={17} className="text-[#6366F1]" />
                </div>
                <span className="text-sm font-medium">alan@alanponton.com</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/alanponton"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors duration-200 w-fit"
              >
                <div className="w-9 h-9 rounded-lg bg-[#6366F1]/10 flex items-center justify-center flex-none group-hover:bg-[#6366F1]/20 transition-colors duration-200">
                  <Linkedin size={17} className="text-[#6366F1]" />
                </div>
                <span className="text-sm font-medium">linkedin.com/in/alanponton</span>
              </a>

              {/* Location — no link */}
              <div className="inline-flex items-center gap-3 text-text-secondary">
                <div className="w-9 h-9 rounded-lg bg-[#6366F1]/10 flex items-center justify-center flex-none">
                  <MapPin size={17} className="text-[#6366F1]" />
                </div>
                <span className="text-sm font-medium">Dallas–Fort Worth, TX</span>
              </div>
            </motion.div>
          </div>

          {/* ── Right column — form ──────────────────────────────────────── */}
          <FadeUp delay={0.3}>
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

              {/* Honeypot — off-screen, invisible to real users, catches bots */}
              <div
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, pointerEvents: "none" }}
              >
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Name <span className="text-[#6366F1]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  className={inputBase}
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-500 font-mono">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Email <span className="text-[#6366F1]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  className={inputBase}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500 font-mono">{errors.email}</p>
                )}
              </div>

              {/* Project Type + Budget — side-by-side on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => handleChange("projectType", e.target.value)}
                    className={inputBase}
                  >
                    <option value="">Select a type…</option>
                    <option value="new-application">New Application</option>
                    <option value="ai-integration">AI Integration</option>
                    <option value="consulting">Consulting</option>
                    <option value="fullstack">Full-Stack Development</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => handleChange("budget", e.target.value)}
                    className={inputBase}
                  >
                    <option value="">Select a range…</option>
                    <option value="under-5k">Under $5K</option>
                    <option value="5k-15k">$5K–$15K</option>
                    <option value="15k-50k">$15K–$50K</option>
                    <option value="50k-plus">$50K+</option>
                    <option value="not-sure">Not Sure Yet</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Message <span className="text-[#6366F1]">*</span>
                </label>
                <textarea
                  placeholder="Tell me about your project, role, or just say hello…"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  className={`${inputBase} resize-none`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-500 font-mono">{errors.message}</p>
                )}
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={submitState !== "idle"}
                whileHover={submitState === "idle" ? { scale: 1.015 } : {}}
                whileTap={submitState === "idle" ? { scale: 0.985 } : {}}
                className="w-full h-12 rounded-xl bg-[#6366F1] text-white text-sm font-medium flex items-center justify-center gap-2 shadow-lg shadow-[#6366F1]/20 hover:bg-[#818cf8] hover:shadow-[#6366F1]/40 transition-all duration-200 disabled:cursor-not-allowed"
              >
                {submitState === "idle" && (
                  <>
                    Send Message
                    <ArrowRight size={16} />
                  </>
                )}
                {submitState === "loading" && (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending…
                  </>
                )}
                {submitState === "success" && (
                  <>
                    <CheckCircle2 size={16} />
                    Message sent!
                  </>
                )}
              </motion.button>
            </form>
          </FadeUp>
        </div>
      </Container>
    </main>
  );
}
