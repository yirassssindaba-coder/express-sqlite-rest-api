# Express + SQLite REST API

## 📌 Overview
Express + SQLite REST API adalah backend service sederhana yang menyediakan endpoint RESTful untuk operasi CRUD pada satu domain resource (contoh: `items`). Proyek ini dibuat untuk portofolio internship/entry-level dengan fokus pada struktur backend yang rapi, response JSON yang konsisten, validasi request, serta error handling yang stabil sehingga dapat dipakai oleh aplikasi web maupun mobile melalui HTTP API.

---

## 🎯 Project Objectives
- Menunjukkan kemampuan membangun **RESTful API** dengan standar yang rapi
- Menerapkan **CRUD + SQLite database** secara stabil
- Menggunakan **validation middleware** untuk mencegah input salah
- Menyediakan **error handling** terpusat agar API tidak crash
- Membuat proyek **job-ready** yang mudah diuji dengan Postman/Thunder Client

---

## 🧩 Key Features
### 1. RESTful CRUD Endpoints (Domain: `items`)
- `GET /api/items` — list items
- `GET /api/items/:id` — item detail
- `POST /api/items` — create item
- `PUT /api/items/:id` — update item
- `DELETE /api/items/:id` — delete item

### 2. Standard Response Format (Wajib)
**Success**
```json
{ "success": true, "data": {}, "message": "..." }
