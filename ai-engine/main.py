from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from parser import ResumeParser
from ranker import CandidateRanker

app = FastAPI(title="AI Recruitment Engine")
parser = ResumeParser()
ranker = CandidateRanker()

class JobSpec(BaseModel):
    description: str
    required_skills: str

class ResumeData(BaseModel):
    id: Optional[int] = 0
    text: str

class RankRequest(BaseModel):
    job: JobSpec
    resumes: List[ResumeData]

class ProcessRequest(BaseModel):
    job_description: str
    required_skills: str
    resume_text: str

@app.post("/parse")
async def parse_resume(resume: ResumeData):
    skills = parser.extract_skills(resume.text)
    education = parser.extract_education(resume.text)
    return {
        "skills": skills,
        "education": education,
        "cleaned_text": parser.clean_text(resume.text)
    }

@app.post("/rank")
async def rank_resumes(request: RankRequest):
    resumes_processed = []
    for r in request.resumes:
        skills = parser.extract_skills(r.text)
        resumes_processed.append({
            "id": r.id,
            "text": parser.clean_text(r.text),
            "skills": skills
        })
    
    rankings = ranker.rank_candidates(
        {"description": parser.clean_text(request.job.description), "required_skills": request.job.required_skills},
        resumes_processed
    )
    return rankings

@app.post("/process")
async def process_single(request: ProcessRequest):
    # This matches the Spring Boot MatchingService call
    cleaned_resume = parser.clean_text(request.resume_text)
    cleaned_job = parser.clean_text(request.job_description)
    
    skills = parser.extract_skills(request.resume_text)
    
    sim_score = ranker.calculate_similarity(cleaned_job, cleaned_resume)
    gap_analysis = ranker.analyze_skill_gap(request.required_skills, skills)
    
    total_score = (sim_score * 0.4) + (gap_analysis['match_percentage']/100 * 0.6)
    explanation = ranker.generate_explanation(gap_analysis, sim_score)
    
    return {
        "total_score": round(total_score * 100, 2),
        "skill_score": round(gap_analysis['match_percentage'], 2),
        "experience_score": 80.0, # Placeholder
        "education_score": 90.0, # Placeholder
        "missing_skills": ", ".join(gap_analysis['missing_skills']),
        "explanation": explanation
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
