# JobPortal - Full-Stack Job Board Web Application

A modern, full-featured job portal web application inspired by platforms like JobNet, developed to bridge the gap between job seekers, employers, and administrators.

---

## 🚀 About The Project

- **Development Duration**: ~2 Months
- **Architecture**: Decoupled RESTful API with a Single Page Application (SPA) frontend.

### Tech Stack
* **Backend**: Laravel (REST API)
* **Frontend**: React, Tailwind CSS, Lucide Icons
* **Database**: MySQL

---

## ✨ Key Features & Functionalities

### 👤 Job Seeker Features
* **Advanced Search & Filter**: Search jobs by keywords, companies, or industry categories.
* **Browse Listings**: Explore top hiring companies and latest opportunities categorized by specialized fields (e.g., IT Hardware & Software, Engineering, Finance, etc.).
* **Job Application**: Securely apply to jobs by uploading CVs (PDF/Image formats) after logging in.
* **User Profile & Tracking**: Monitor submitted job applications and track their real-time application status.

### 🏢 Employer Portal Features
* **Employer Authentication & Dashboard**: Dedicated login portal for employers to manage hiring workflows.
* **Job Management (CRUD)**: Post new job openings with detailed descriptions, salaries, locations, and deadlines, and manage existing listings.
* **Application Review**: View incoming job applications and candidate CV forms.
* **Application Decision**: Accept or reject candidate job applications directly from the dashboard.

### 🛡️ Admin Portal Features
* **Comprehensive Oversight**: Centralized monitoring of all platform companies, jobs, users, and applications.
* **Approval System**: Review, accept, or reject pending company registrations and pending job postings before they go live publicly.
* **Category Management**: Add and manage industry job categories.

---

## 📸 Screenshots & UI Previews

### 1. Home & Discovery
*Explore top hiring companies, browse industries by category, and view fresh job listings with pagination.*
- **Landing & Categories View**:
  ![Landing Page](Screenshot%202026-07-29%20153557.png)
- **Latest Opportunities**:
  ![Latest Opportunities](Screenshot%202026-07-29%20153606.png)

### 2. Job Details & Application
*Inspect comprehensive job specifications, company info, and submit your CV application.*
- **Job Overview & Details**:
  ![Job Details 1](Screenshot%202026-07-29%20153725.png)
- **Application Upload Form**:
  ![Job Details 2](Screenshot%202026-07-29%20153731.png)

### 3. Employer Portal
*Post new job openings efficiently with detailed requirements and salary ranges.*
- **Post a New Job Opening**:
  ![Employer Post Job](Screenshot%202026-07-29%20152446.png)

### 4. Admin Portal
*Manage and moderate pending platform requests such as pending job approvals.*
- **Pending Job Approvals Dashboard**:
  ![Admin Pending Jobs](Screenshot%202026-07-29%20153327.png)

---

## 🛠️ Getting Started

To run this project locally, follow these steps:

### Prerequisites
* PHP >= 8.2 & Composer
* Node.js & npm
* MySQL

### Backend Setup (Laravel API)
1. Clone the repository and navigate to the backend directory.
2. Install PHP dependencies:
   ```bash
   composer install
