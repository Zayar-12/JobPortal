

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
  ![Landing Page](https://github.com/user-attachments/assets/280e4e5f-4a76-458e-b7b4-3ac1f16f5aec)
 ![categories section](https://github.com/user-attachments/assets/76d6cb02-d45a-437c-a6ff-df7e256d09bf)
- **Latest Opportunities**:
  ![Latest Opportunities](https://github.com/user-attachments/assets/0b98a90d-b24f-4b8c-878f-e73e4598b012)

### 2. Job Details & Application
*Inspect comprehensive job specifications, company info, and submit your CV application.*
- **Job Overview & Details**:
  ![Job Details 1](https://github.com/user-attachments/assets/622b6848-cd8b-43cd-b51d-61ca279b38d6)

- **Application Upload Form**:
  ![Job Details 2](https://github.com/user-attachments/assets/ad39d4b0-9953-497b-9d82-f81e763da2f9)

- **Company Overview & Details**:
  ![Company Details 1](https://github.com/user-attachments/assets/2e29c0cc-d567-4789-a287-32f03eaa3abe)

### 3. Employer Portal
*Post new job openings efficiently with detailed requirements and salary ranges.*
- **Post a New Job Opening**:
  ![Employer Post Job](https://github.com/user-attachments/assets/e860b47e-d57d-49f1-9c8f-a0e2b3dbc292)

### 4. Admin Portal
*Manage and moderate pending platform requests such as pending job approvals.*
- **Pending Job Approvals Dashboard**:
  ![Admin Pending Jobs](https://github.com/user-attachments/assets/dd4d9249-325e-4fce-9f8a-59171a11fd06)

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
