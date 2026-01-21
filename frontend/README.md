# Email Job Scheduler 🚀

A full-stack email scheduling application built using Node.js, Redis, BullMQ, and Next.js.

---

## 🧱 Architecture Overview

- Frontend: Next.js (React)
- Backend: Node.js with Express
- Queue: BullMQ
- Worker: Background email processor
- Redis: Job queue storage
- Mailer: Nodemailer

Flow:
1. User schedules an email from the dashboard
2. Backend API adds job to Redis queue
3. Worker listens to queue
4. Email is sent at scheduled time

---

## 📂 Project Structure

email-job-scheduler/
├── backend/
│   ├── server.js
│   ├── worker.js
│   ├── queue.js
│   ├── redis.js
│   └── .env
│
├── frontend/
│   └── app/page.tsx
│
└── README.md

---

## ⚙️ Setup Instructions

### 1️⃣ Clone repository
```bash
git clone https://github.com/sarah-23-azam/email-job-scheduler.git
cd email-job-scheduler
