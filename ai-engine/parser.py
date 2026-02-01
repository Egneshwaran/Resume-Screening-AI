import spacy
from spacy.matcher import Matcher
import re

# Load NLP model
try:
    nlp = spacy.load("en_core_web_sm")
except:
    import subprocess
    subprocess.run(["python", "-m", "spacy", "download", "en_core_web_sm"])
    nlp = spacy.load("en_core_web_sm")

class ResumeParser:
    def __init__(self):
        self.skills_database = [
            "python", "java", "javascript", "react", "angular", "node.js", 
            "sql", "postgresql", "mongodb", "aws", "docker", "kubernetes",
            "spring boot", "django", "flask", "machine learning", "nlp",
            "tensorflow", "pytorch", "c++", "c#", "html", "css", "tailwind"
        ]

    def extract_text(self, file_path):
        # Placeholder for file extraction (PDF/DOCX)
        # In a real app, use PyPDF2 or docx2txt
        return ""

    def extract_skills(self, text):
        text = text.lower()
        skills = []
        for skill in self.skills_database:
            if skill.lower() in text:
                skills.append(skill)
        return list(set(skills))

    def extract_education(self, text):
        education_keywords = ["Bachelors", "Masters", "PhD", "B.E", "B.Tech", "M.Tech", "BCA", "MCA"]
        found_edu = []
        for edu in education_keywords:
            if re.search(edu, text, re.IGNORECASE):
                found_edu.append(edu)
        return found_edu

    def clean_text(self, text):
        # Bias Reduction: Remove names, ages, genders (simplified)
        # In practice, use NER to mask PERSON, ORG, etc.
        doc = nlp(text)
        cleaned_tokens = []
        for token in doc:
            if not token.is_stop and not token.is_punct:
                cleaned_tokens.append(token.lemma_.lower())
        return " ".join(cleaned_tokens)
