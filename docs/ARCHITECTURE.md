# System Architecture & Documentation

## 1. System Architecture Diagram
```mermaid
graph TD
    Client[React Frontend] -->|REST API| Backend[Spring Boot Backend]
    Backend -->|Auth| Security[JWT / Spring Security]
    Backend -->|Data| DB[(PostgreSQL/MySQL)]
    Backend -->|Process| AI[Python AI Engine]
    AI -->|NLP| Spacy[SpaCy & NLTK]
    AI -->|Ranking| Scikit[TF-IDF & Cosine Similarity]
```

## 2. ER Diagram
```mermaid
erDiagram
    USER {
        int id
        string username
        string password
        string role
    }
    JOB {
        int id
        string title
        text description
        text required_skills
        int min_experience
    }
    RESUME {
        int id
        string filename
        string file_path
        text extracted_skills
        double experience
        text raw_text
    }
    MATCHING_SCORE {
        int id
        int job_id
        int resume_id
        double total_score
        text explanation
        text missing_skills
    }
    JOB ||--o{ MATCHING_SCORE : "has"
    RESUME ||--o{ MATCHING_SCORE : "ranks"
```

## 3. Case Diagram
```mermaid
usecaseDiagram
    actor Admin
    actor Candidate
    
    Admin --> (Create Job)
    Admin --> (Upload Resumes)
    Admin --> (View Rankings)
    Admin --> (Analyze Skill Gaps)
    Admin --> (View Analytics)
    
    Candidate --> (Upload Resume)
    Candidate --> (Get Feedback)
```

## 4. Sequence Diagram (Resume Ranking Flow)
```mermaid
sequenceDiagram
    Admin->>Frontend: Upload Resumes for Job
    Frontend->>Backend: POST /api/resumes/upload
    Backend->>DB: Save Resume Meta
    Backend->>AI_Engine: POST /process (Job Desc + Resume Text)
    AI_Engine->>AI_Engine: Preprocess & TF-IDF
    AI_Engine->>AI_Engine: Calculate Cosine Similarity
    AI_Engine->>AI_Engine: Skill Gap Analysis
    AI_Engine-->>Backend: Return Score + Explanation
    Backend->>DB: Save MatchingScore
    Backend-->>Frontend: Success
    Frontend->>Admin: Display Ranked List + XAI
```

## 5. Class Diagram (Backend Core)
```mermaid
classDiagram
    class User {
        +Long id
        +String username
        +Role role
    }
    class Job {
        +Long id
        +String title
        +String requiredSkills
    }
    class Resume {
        +Long id
        +String extractedSkills
        +String rawText
    }
    class MatchingScore {
        +Long id
        +Double totalScore
        +String explanation
        +calculateRank()
    }
    Job "1" -- "*" MatchingScore
    Resume "1" -- "*" MatchingScore
```
