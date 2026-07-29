<div align="center">

# 🚀 JobPortal - Full-Stack Job Board Web Application

  <p>A modern, full-featured job portal web application inspired by platforms like JobNet, built to seamlessly bridge the gap between job seekers, employers, and administrators.</p>

  <p>
    <img src="https://github.com/user-attachments/assets/280e4e5f-4a76-458e-b7b4-3ac1f16f5aec" alt="JobPortal Banner" width="100%" />
  </p>

  <p>
    <img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  </p>
</div>

---

## 📖 About The Project

**JobPortal** is a robust, high-performance web platform designed to streamline the recruitment process. Developed over a span of ~2 months, it features a decoupled RESTful API architecture ensuring clean separation of concerns, high scalability, and a responsive Single Page Application (SPA) user experience.

### 🛠️ Tech Stack
* **Backend**: Laravel (REST API)
* **Frontend**: React, Tailwind CSS, Lucide Icons
* **Database**: MySQL

---

## ✨ Key Features & Functionalities

### 👤 Job Seeker Features
* **Advanced Search & Filter**: Dynamically search listings by keywords, target companies, or specific industry categories.
* **Explore Marketplaces**: Browse top hiring companies and latest opportunities organized by specialized sectors (e.g., IT, Engineering, Finance).
* **Frictionless Applications**: Securely apply to open positions by uploading CVs (PDF/Image formats) upon authentication.
* **Application Tracker**: Monitor submitted applications and track real-time hiring statuses directly from the user profile.

### 🏢 Employer Portal Features
* **Dedicated Dashboard**: Comprehensive overview for employers to oversee hiring workflows and candidate pipelines.
* **Full Job CRUD**: Create, read, update, and delete job postings complete with specifications, salary brackets, and deadlines.
* **Candidate Review**: Inspect incoming job applications and candidate CV forms seamlessly.
* **Application Control**: Make definitive hiring decisions by accepting or rejecting candidate applications.

### 🛡️ Admin Portal Features
* **Centralized Governance**: Full operational visibility over all platform users, companies, listings, and applications.
* **Moderation & Approval**: Review, approve, or reject pending company registrations and job submissions prior to public release.
* **Category Management**: Dynamically expand and control platform industry sectors.

---

## 📸 Screenshots & UI Previews

### 🔍 Home & Discovery UI
| Categories Section | Latest Opportunities |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/76d6cb02-d45a-437c-a6ff-df7e256d09bf" width="600" /> | <img src="https://github.com/user-attachments/assets/0b98a90d-b24f-4b8c-878f-e73e4598b012" width="600" /> |

---

### 📄 Job Details & Application UI
| Job Overview & Details | Application Form | Company Overview |
| :---: | :---: | :---: |
| <img src="https://github.com/user-attachments/assets/622b6848-cd8b-43cd-b51d-61ca279b38d6" width="380" /> | <img src="https://github.com/user-attachments/assets/ad39d4b0-9953-497b-9d82-f81e763da2f9" width="380" /> | <img src="https://github.com/user-attachments/assets/2e29c0cc-d567-4789-a287-32f03eaa3abe" width="380" /> |

---

### 💼 Employer Portal UI
| Employer Home | Dashboard Overview |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/77bc916e-beb2-4a8b-8d94-fee45f8cdb84" width="600" /> | <img src="https://github.com/user-attachments/assets/e525dd9f-214b-48ea-b989-c3dd12bd7c0e" width="600" /> |

| Applicant Management & Edit Job | Post a New Job Opening |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/ed5cf49b-de3e-41cf-af81-46c697e22ba7" width="600" /> | <img src="https://github.com/user-attachments/assets/e860b47e-d57d-49f1-9c8f-a0e2b3dbc292" width="600" /> |

---

### 🛡️ Admin Portal UI
| Admin Dashboard Overview |
| :---: |
| <center><img src="https://github.com/user-attachments/assets/dd4d9249-325e-4fce-9f8a-59171a11fd06" width="600" /></center> |

| Pending Jobs Page | Category Management |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/98e51b45-a015-461c-861b-744f1b580790" width="600" /> | <img src="https://github.com/user-attachments/assets/6e03337a-be31-4e83-a2cb-3865705dab87" width="600" /> |

| View All Job Applications | Pending Companies Page |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/258c7cef-339f-419e-bf89-f556d9bb579b" width="600" /> | <img src="https://github.com/user-attachments/assets/5c13a9f4-4f2a-469a-8538-c7797dafde2d" width="600" /> |

---

## 🛠️ Getting Started

Follow these instructions to set up and run the project locally on your machine.

### Prerequisites
* **PHP** >= 8.2 & Composer
* **Node.js** & npm / yarn
* **MySQL** database server

### 1. Backend Setup (Laravel API)
Clone the repository and configure the backend server:

```bash
# Navigate to backend directory
cd backend

# Install PHP dependencies
composer install

# Configure environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run database migrations and seeders
php artisan migrate --seed

# Start the local server
php artisan serve
