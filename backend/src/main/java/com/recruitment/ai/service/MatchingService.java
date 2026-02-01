package com.recruitment.ai.service;

import com.recruitment.ai.entity.Job;
import com.recruitment.ai.entity.MatchingScore;
import com.recruitment.ai.entity.Resume;
import com.recruitment.ai.repository.MatchingScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;

@Service
public class MatchingService {

    @Autowired
    private MatchingScoreRepository matchingScoreRepository;

    private final String AI_ENGINE_URL = "http://localhost:8000/process";

    public MatchingScore rankResumeForJob(Job job, Resume resume) {
        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> request = new HashMap<>();
        request.put("job_description", job.getDescription());
        request.put("required_skills", job.getRequiredSkills());
        request.put("resume_text", resume.getRawText());

        // In a real app, this would call the Python AI engine via HTTP
        // For this demo, we'll simulate the response if the service is down
        try {
            ParameterizedTypeReference<Map<String, Object>> responseType = new ParameterizedTypeReference<Map<String, Object>>() {
            };

            Map<String, Object> response = restTemplate.exchange(
                    AI_ENGINE_URL,
                    HttpMethod.POST,
                    new HttpEntity<>(request),
                    responseType).getBody();

            if (response == null) {
                throw new RuntimeException("Empty response from AI engine");
            }

            MatchingScore score = MatchingScore.builder()
                    .job(job)
                    .resume(resume)
                    .totalScore((Double) response.get("total_score"))
                    .skillMatchScore((Double) response.get("skill_score"))
                    .experienceScore((Double) response.get("experience_score"))
                    .educationScore((Double) response.get("education_score"))
                    .missingSkills((String) response.get("missing_skills"))
                    .explanation((String) response.get("explanation"))
                    .status("PENDING")
                    .build();

            return matchingScoreRepository.save(score);
        } catch (Exception e) {
            // Fallback for demo purposes
            return simulateMatching(job, resume);
        }
    }

    private MatchingScore simulateMatching(Job job, Resume resume) {
        // Dummy logic for when AI engine is not running
        double skillScore = Math.random() * 100;
        return matchingScoreRepository.save(MatchingScore.builder()
                .job(job)
                .resume(resume)
                .totalScore(skillScore)
                .skillMatchScore(skillScore)
                .explanation("Simulated ranking result.")
                .build());
    }
}
