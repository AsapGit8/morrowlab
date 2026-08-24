<template>
  <div class="wrapper">
    <div class="content-container">
      <main class="main">
        <div class="contact-grid">
          <!-- Left: intro + direct channels -->
          <section class="intro">
            <p class="lead">
              Tell us what you're building. Pick a budget range, edit the
              draft we've written for you, and send it straight to our inbox.
            </p>

            <div class="direct">
              <span class="direct-label">Prefer something else?</span>

              <a
                :href="`mailto:${STUDIO_EMAIL}`"
                class="direct-link"
              >{{ STUDIO_EMAIL }}</a>

              <a
                :href="INSTAGRAM_URL"
                target="_blank"
                rel="noopener noreferrer"
                class="ghost-button"
              >
                <svg
                  class="ig-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38A5.9 5.9 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Z"
                  />
                  <path
                    d="M12 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
                  />
                  <circle cx="18.41" cy="5.59" r="1.44" />
                </svg>
                Message us on Instagram
              </a>
            </div>
          </section>

          <!-- Right: enquiry form -->
          <section class="form-panel">
            <form
              v-if="!hasSent"
              class="form"
              @submit.prevent="handleSubmit"
            >
              <div class="row">
                <div class="field">
                  <label class="label" for="name">Name</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    name="name"
                    autocomplete="name"
                    placeholder="Name"
                    required
                  />
                </div>

                <div class="field">
                  <label class="label" for="email">Email</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    name="email"
                    autocomplete="email"
                    placeholder="Email"
                    required
                  />
                </div>
              </div>

              <div class="field">
                <label class="label" for="company">
                  Company <span class="optional">optional</span>
                </label>
                <input
                  id="company"
                  v-model="form.company"
                  type="text"
                  name="company"
                  autocomplete="organization"
                  placeholder="Company or project name"
                />
              </div>

              <fieldset class="field budget-field">
                <legend class="label">Budget range</legend>
                <div class="budget-grid">
                  <label
                    v-for="tier in BUDGET_TIERS"
                    :key="tier.id"
                    class="budget-option"
                    :class="{ 'is-selected': form.budget === tier.id }"
                  >
                    <input
                      v-model="form.budget"
                      type="radio"
                      name="budget"
                      :value="tier.id"
                    />
                    <span class="budget-amount">
                      {{ tier.peso }}
                      <span v-if="tier.usd" class="budget-usd">| {{ tier.usd }}</span>
                    </span>
                    <span class="budget-service">{{ tier.label }}</span>
                  </label>
                </div>
                <span v-if="budgetError" class="error">
                  Please pick a budget range so we can draft your message.
                </span>
              </fieldset>

              <div class="field">
                <div class="label-row">
                  <label class="label" for="message">Your message</label>
                  <button
                    v-if="messageEdited && selectedTier"
                    type="button"
                    class="reset-link"
                    @click="resetMessage"
                  >
                    Reset to draft
                  </button>
                </div>
                <textarea
                  id="message"
                  v-model="form.message"
                  name="message"
                  rows="10"
                  placeholder="Pick a budget range above and we'll draft this for you then edit it however you like."
                  required
                  @input="messageEdited = true"
                ></textarea>
                <span class="hint">
                  We've drafted this from your selection. Edit anything, then send.
                </span>
              </div>

              <button type="submit" class="modern-button">
                Send email
              </button>
            </form>

            <!-- Post-send state -->
            <div v-else class="sent-state">
              <h2>Your email is ready to send</h2>
              <p>
                Your mail app should have opened with the message filled in —
                just hit send. If nothing opened, copy the message below and
                email it to
                <a :href="`mailto:${STUDIO_EMAIL}`" class="direct-link">{{ STUDIO_EMAIL }}</a>.
              </p>
              <div class="sent-actions">
                <button type="button" class="modern-button" @click="copyMessage">
                  {{ copied ? 'Copied' : 'Copy message' }}
                </button>
                <button type="button" class="ghost-button" @click="hasSent = false">
                  Back to the form
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Availability />

      <Footer />
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from "vue";
import Footer from "@/components/Footer.vue";
import Availability from "@/components/Availability.vue";

const config = useRuntimeConfig();

const STUDIO_EMAIL = "morrowlabstudio@gmail.com";
const INSTAGRAM_URL = "https://www.instagram.com/morrowlab.studio";

/* Budget tiers mirror the base project rates on /services */
const BUDGET_TIERS = [
  {
    id: "web-essentials",
    label: "Web essentials",
    peso: "₱90k+",
    usd: "$1.5k",
    brief:
      "A focused website — a handful of pages, clean design, fast and well built.",
  },
  {
    id: "advanced-web",
    label: "Advanced web",
    peso: "₱500k+",
    usd: "$8k",
    brief:
      "A larger web build — custom functionality, integrations and a design-led front end.",
  },
  {
    id: "mobile-apps",
    label: "Mobile apps",
    peso: "₱800k+",
    usd: "$14k",
    brief:
      "A mobile app for iOS and/or Android, from design through to store launch.",
  },
  {
    id: "saas-platforms",
    label: "SaaS & Platforms",
    peso: "₱3M+",
    usd: "$50k",
    brief:
      "A full software platform — accounts, dashboards and a back-end architecture built to scale.",
  },
  {
    id: "government",
    label: "Government",
    peso: "Custom Price",
    usd: "",
    brief:
      "A government or public-sector project. Happy to walk through the requirements and scope.",
  },
];

const form = reactive({
  name: "",
  email: "",
  company: "",
  budget: "",
  message: "",
});

const messageEdited = ref(false);
const budgetError = ref(false);
const hasSent = ref(false);
const copied = ref(false);

const selectedTier = computed(
  () => BUDGET_TIERS.find((tier) => tier.id === form.budget) || null
);

/* The draft the visitor can edit before sending */
const draftMessage = computed(() => {
  const tier = selectedTier.value;
  if (!tier) return "";

  const name = form.name.trim() || "there";
  const company = form.company.trim();
  const who = company ? `${name} from ${company}` : name;
  const budget = tier.usd ? `${tier.peso} | ${tier.usd}` : tier.peso;

  return [
    "Hi MorrowLab,",
    "",
    `I'm ${who}. I'd like to discuss a new project with your team.`,
    "",
    `Project type: ${tier.label}`,
    `Budget range: ${budget}`,
    "",
    tier.brief,
    "",
    "What I have in mind:",
    "- ",
    "",
    "Thanks,",
    form.name.trim() || "",
    form.email.trim() || "",
  ]
    .join("\n")
    .trim();
});

/* Keep the textarea in sync until the visitor takes it over */
watch(
  draftMessage,
  (draft) => {
    if (!messageEdited.value) form.message = draft;
  },
  { immediate: true }
);

const resetMessage = () => {
  form.message = draftMessage.value;
  messageEdited.value = false;
};

const mailtoHref = computed(() => {
  const tier = selectedTier.value;
  const subject = tier
    ? `New project enquiry — ${tier.label} (${tier.peso})`
    : "New project enquiry";

  return `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(form.message)}`;
});

/* Radios are visually hidden, so budget is validated here rather than natively */
watch(
  () => form.budget,
  (budget) => {
    if (budget) budgetError.value = false;
  }
);

const handleSubmit = () => {
  if (!form.budget) {
    budgetError.value = true;
    return;
  }

  copied.value = false;
  hasSent.value = true;
  window.location.href = mailtoHref.value;
};

const copyMessage = async () => {
  try {
    await navigator.clipboard.writeText(form.message);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch {
    copied.value = false;
  }
};

useSeoMeta({
  title: "Contact Us",
  description:
    "Send MorrowLab Studio a project enquiry. Choose your budget range, review the draft brief, and email us directly — or message us on Instagram.",
  ogTitle: "Contact Us | MorrowLab Studio",
  ogDescription:
    "Tell us about your project. Pick a budget range and send us a brief in a couple of clicks.",
  ogImage: "https://morrowlab.studio/og-image.jpg",
  ogUrl: "https://morrowlab.studio/contact",
});

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": `${config.public.siteUrl}/contact#webpage`,
        url: `${config.public.siteUrl}/contact`,
        name: "Contact Us - MorrowLab Studio",
        description:
          "Send MorrowLab Studio a project enquiry by email, or message the studio on Instagram.",
        isPartOf: {
          "@id": `${config.public.siteUrl}/#website`,
        },
        about: {
          "@id": config.public.organizationId,
        },
        mainEntity: {
          "@id": config.public.organizationId,
        },
        datePublished: "2026-01-17",
        dateModified: "2026-07-29",
        inLanguage: "en-US",
      }),
    },
  ],
});
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.main {
  width: 100%;
  padding-top: 120px;
  padding-bottom: 100px;
  flex: 1;
}

.contact-grid {
  --gutter: 40px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: var(--gutter);
  padding-right: var(--gutter);
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 64px;
  align-items: start;
}

/* Typography — matches /services */
h1,
h2,
p,
label,
legend,
input,
textarea,
button,
a,
span {
  font-family: "Geist", sans-serif;
  letter-spacing: -0.03em;
}

h1 {
  font-weight: 400;
  font-size: 1rem;
  margin: 0 0 20px;
  padding: 0;
}

.lead {
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.4;
  margin: 0;
  color: #000;
}

/* Direct channels */
.direct {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.direct-label {
  font-size: 0.875rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
}

.direct-link {
  font-size: 1rem;
  font-weight: 700;
  color: #000;
  text-decoration: none;
  position: relative;
}

.direct-link::after {
  content: "";
  position: absolute;
  width: 0;
  height: 1px;
  bottom: -2px;
  left: 0;
  background-color: #000;
  transition: width 0.5s ease;
}

.direct-link:hover::after {
  width: 100%;
}

/* Form */
.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: none;
  margin: 0;
  padding: 0;
  min-width: 0;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
}

.label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #000;
  padding: 0;
}

.optional {
  font-weight: 400;
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.4);
}

.hint {
  font-size: 0.75rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.5);
}

.error {
  font-size: 0.75rem;
  font-weight: 500;
  color: #c0392b;
  margin-top: 8px;
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  box-sizing: border-box;
  font-size: 0.9375rem;
  font-weight: 400;
  color: #000;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 12px 14px;
  transition: border-color 0.3s ease;
  -webkit-appearance: none;
  appearance: none;
}

input[type="text"]::placeholder,
input[type="email"]::placeholder,
textarea::placeholder {
  color: rgba(0, 0, 0, 0.3);
}

input[type="text"]:focus,
input[type="email"]:focus,
textarea:focus {
  outline: none;
  border-color: #000;
}

textarea {
  resize: vertical;
  min-height: 220px;
  line-height: 1.5;
}

/* Budget selector */
.budget-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.budget-option {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 14px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.3s ease, background-color 0.3s ease;
  min-width: 0;
}

.budget-option:hover {
  border-color: rgba(0, 0, 0, 0.5);
}

.budget-option input[type="radio"] {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  margin: 0;
  pointer-events: none;
}

.budget-option.is-selected {
  border-color: #000;
  background-color: #000;
}

.budget-option:has(input[type="radio"]:focus-visible) {
  outline: 2px solid #000;
  outline-offset: 2px;
}

.budget-amount {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #000;
  white-space: nowrap;
}

.budget-usd {
  opacity: 0.3;
  font-weight: 400;
}

.budget-service {
  font-size: 0.8125rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
}

.budget-option.is-selected .budget-amount,
.budget-option.is-selected .budget-service {
  color: #fff;
}

.budget-option.is-selected .budget-usd {
  opacity: 0.45;
}

/* Buttons */
.modern-button {
  display: inline-block;
  background-color: #000;
  color: #fff;
  padding: 12px 24px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: -0.01em;
  transition: all 0.3s ease;
  border: 1px solid #000;
  cursor: pointer;
  align-self: flex-start;
}

.modern-button:hover {
  background-color: #fff;
  color: #000;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.ghost-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #fff;
  color: #000;
  padding: 12px 20px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9375rem;
  letter-spacing: -0.01em;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.ghost-button:hover {
  border-color: #000;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

.ig-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
  flex-shrink: 0;
}

.reset-link {
  background: none;
  border: none;
  padding: 0;
  font-size: 0.75rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.5);
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.3s ease;
}

.reset-link:hover {
  color: #000;
}

/* Post-send state */
.sent-state {
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 32px;
}

.sent-state h2 {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 12px;
  color: #000;
}

.sent-state p {
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.7);
  margin: 0 0 24px;
}

.sent-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

/* Responsive */
@media screen and (max-width: 1024px) {
  .contact-grid {
    --gutter: 24px;
    gap: 40px;
  }

  .lead {
    font-size: 1.0625rem;
  }
}

@media screen and (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .direct {
    margin-top: 28px;
  }
}

@media screen and (max-width: 768px) {
  .main {
    padding-top: 90px;
    padding-bottom: 60px;
  }

  .contact-grid {
    --gutter: 20px;
  }

  h1 {
    font-size: 0.9rem;
  }

  .lead {
    font-size: 1rem;
  }

  .row {
    grid-template-columns: 1fr;
  }

  textarea {
    min-height: 200px;
  }

  .modern-button {
    width: 100%;
    text-align: center;
  }

  .ghost-button {
    width: 100%;
    justify-content: center;
    box-sizing: border-box;
  }
}

@media screen and (max-width: 480px) {
  .contact-grid {
    --gutter: 16px;
  }

  .budget-grid {
    grid-template-columns: 1fr;
  }

  .sent-state {
    padding: 24px 20px;
  }

  .sent-actions .modern-button,
  .sent-actions .ghost-button {
    width: 100%;
  }
}

@supports (padding: max(0px)) {
  .contact-grid {
    padding-left: max(var(--gutter), env(safe-area-inset-left));
    padding-right: max(var(--gutter), env(safe-area-inset-right));
  }
}

@media (prefers-reduced-motion: reduce) {
  .modern-button,
  .ghost-button {
    transition: none;
  }

  .modern-button:hover,
  .ghost-button:hover {
    transform: none;
  }
}
</style>
