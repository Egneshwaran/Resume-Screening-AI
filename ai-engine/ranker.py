from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

class CandidateRanker:
    def __init__(self):
        self.vectorizer = TfidfVectorizer()

    def calculate_similarity(self, job_desc, resume_text):
        tfidf_matrix = self.vectorizer.fit_transform([job_desc, resume_text])
        return cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]

    def analyze_skill_gap(self, required_skills, candidate_skills):
        required = set([s.strip().lower() for s in required_skills.split(",")])
        candidate = set([s.lower() for s in candidate_skills])
        
        missing = required - candidate
        match_pct = (len(required - missing) / len(required)) * 100 if required else 0
        
        return {
            "match_percentage": match_pct,
            "missing_skills": list(missing),
            "matched_skills": list(required & candidate)
        }

    def generate_explanation(self, analysis, similarity_score):
        explanation = f"Candidate has a {analysis['match_percentage']:.1f}% skill match. "
        if analysis['missing_skills']:
            explanation += f"Missing key skills: {', '.join(analysis['missing_skills'])}. "
        else:
            explanation += "Covers all required skills. "
        
        explanation += f"Overall textual relevance is {similarity_score * 100:.1f}%."
        return explanation
    
    def rank_candidates(self, job, resumes):
        # job: dict {description, required_skills}
        # resumes: list of dicts {text, skills, id}
        results = []
        for resume in resumes:
            sim_score = self.calculate_similarity(job['description'], resume['text'])
            gap_analysis = self.analyze_skill_gap(job['required_skills'], resume['skills'])
            
            # Weighted Score
            total_score = (sim_score * 0.4) + (gap_analysis['match_percentage']/100 * 0.6)
            
            explanation = self.generate_explanation(gap_analysis, sim_score)
            
            results.append({
                "resume_id": resume['id'],
                "total_score": round(total_score * 100, 2),
                "skill_score": round(gap_analysis['match_percentage'], 2),
                "missing_skills": ", ".join(gap_analysis['missing_skills']),
                "explanation": explanation
            })
        
        return sorted(results, key=lambda x: x['total_score'], reverse=True)
