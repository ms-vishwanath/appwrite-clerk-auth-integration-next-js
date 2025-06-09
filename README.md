# Clerk + Appwrite Webhook Integration (Next.js)

This project implements a webhook endpoint to handle Clerk authentication events and sync user data with Appwrite using a **serverless route in Next.js**.

---

## 📦 Tech Stack

- **Next.js (App Router)**
- **Clerk** (Authentication)
- **Appwrite** (Backend-as-a-Service)
- **Svix** (Webhook verification for Clerk)

---

## 📁 File Structure

```bash
app/
└── api/
    └── clerk-webhook/
        └── route.ts   # Webhook endpoint
