# AI-Based Resume Screening and Candidate Ranking System

An industry-ready recruitment platform that leverages AI and NLP to automate resume screening, rank candidates based on job descriptions, and provide explainable insights for HR professionals.

## Project Structure
- **/backend**: Enterprise-grade Spring Boot application (REST API, JWT, JPA, Email Services, PDF/Excel generation).
- **/ai-engine**: Python FastAPI service (NLP, SpaCy, TF-IDF, Cosine Similarity).
- **/frontend**: Modern React.js dashboard (Vite, Tailwind CSS, Glassmorphism UI, Chart.js).
- **/docs**: System architecture and design documentation.
- **/samples**: Mock data for testing.

## Key Features

### 🤖 AI & Automation
1. **Intelligent Parsing**: Extracts skills, experience, and education using SpaCy NLP.
2. **Semantic Ranking**: Uses TF-IDF and Cosine Similarity to score resumes against job descriptions (0-100%).
3. **Skill Gap Analysis**: Automatically identifies and lists missing critical skills.
4. **Explainable AI (XAI)**: Provides human-readable reasons for every candidate's score.
5. **Bias Reduction**: Basic reduction techniques to focus on qualifications over demographics.

### 🛡️ Security & Access
- **JWT Authentication**: Secure stateless authentication for HR users.
- **Role-Based Access**: Specialized views for Admin and HR roles.
- **Self-Service Recovery**: Secure "Forgot Password" flow with token-based email links.
- **Profile Management**: View and manage account details securely.

### 📊 Dashboard & Analytics
- **Visual Analytics**: Interactive charts for applicant distribution, pass/fail rates, and skill matching.
- **Export Capabilities**: Download comprehensive screening results in **PDF** and **Excel** formats.
- **Glassmorphism UI**: A premium, responsive user interface designed for modern HR workflows.
- **Workflow Management**: Step-by-step wizard for creating jobs and uploading bulk resumes.

## Technologies Used

### Backend
- **Java 17** & **Spring Boot 3** (Web, Security, Data JPA, Mail)
- **MySQL**: Relational database for persistence.
- **Apache POI**: For generating Excel reports.
- **OpenPDF**: For generating PDF reports.
- **Lombok**: For boilerplate code reduction.

### AI Engine
- **Python 3.9+** & **FastAPI**
- **SpaCy**: For Named Entity Recognition (NER).
- **Scikit-learn**: For TF-IDF vectorization.

### Frontend
- **React 18** & **Vite**
- **Tailwind CSS**: Utility-first styling.
- **Chart.js**: Data visualization.
- **Lucide React**: Modern iconography.
- **Axios**: HTTP client with interceptors for auth.

## Setup & Running

### 1. Prerequisites
- Java 17+
- Python 3.9+
- Node.js 18+
- MySQL (Running on port 3306)

### 2. AI Engine (Python)
```bash
cd ai-engine
pip install -r requirements.txt
python -m spacy download en_core_web_sm
uvicorn main:app --reload --port 8000
```

### 3. Backend (Spring Boot)
Ensure your `application.properties` is configured for your MySQL instance.
```bash
cd backend
mvn spring-boot:run
```
*Server runs on port 8080*

### 4. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
*Client runs on http://localhost:3000 (proxies API requests to 8080)*

## API Documentation
- **AI Engine**: `http://localhost:8000/docs` (Swagger UI)
- **Backend**: REST endpoints available under `/api/**`

---
*Built for the Advanced Agentic Coding Project.*
# Resume-Screening-AI
AI-powered Resume Screening system that automates candidate evaluation for HR teams. The platform analyzes resumes using configurable AI rules, ranks candidates, provides analytics and insights, and supports exportable reports through a secure, modern dashboard.
