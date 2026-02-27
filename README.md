# ASTU Smart Complaint & Issue Tracking System

A modern, full-stack complaint management system designed for Adama Science and Technology University (ASTU). It allows students to report facility issues, admins to assign them to specific staff, and an AI chatbot to provide instant guidance.

## 🚀 Key Features
- **Role-Based Access**: Specialized dashboards for Students, Staff, and Admins.
- **AI Chatbot**: Fast, context-aware assistance powered by **Groq (Llama 3.3)**.
- **Dynamic Assignment**: Admins can assign tickets to departments OR specific staff members.
- **Visual Analytics**: Real-time charts for admins to track system performance.
- **Secure File Uploads**: Attachment support for photo or document evidence.

---

## 🛠️ Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Chart.js, React Markdown.
- **Backend**: Node.js, Express, Mongoose.
- **Database**: MongoDB (Atlas).
- **AI Engine**: Groq SDK (Llama 3.3).

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- Node.js installed on your machine.
- A MongoDB Atlas database (or local MongoDB).
- A Groq API Key from [console.groq.com](https://console.groq.com/keys).

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory and include the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_random_secret_key
   GROQ_API_KEY=your_groq_api_key_from_console_groq_com
   NODE_ENV=development
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend developer server:
   ```bash
   npm run dev
   ```

---

## 📂 Project Structure

### Backend (`/backend`)
- `models/`: Database schemas (User, Complaint).
- `routes/`: API endpoints (Auth, Complaints, Users, Chat).
- `controllers/`: Logic for handling requests.
- `uploads/`: Storage for complaint attachments.

### Frontend (`/frontend`)
- `src/components/`: Reusable UI elements (Navbar, Chatbot, etc.).
- `src/pages/`: Main views (Home, Dashboard, Complaint Submission).
- `src/context/`: Authentication state management.

---

## 📝 Developer Notes
- **Chatbot Context**: The AI logic is located in `backend/controllers/chatController.js`. It is strictly constrained to only answer ASTU-related questions.
- **Security**: The system uses JWT for authentication, Helmet for headers, and HPP for parameter pollution protection.
