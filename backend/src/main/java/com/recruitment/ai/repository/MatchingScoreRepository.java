package com.recruitment.ai.repository;

import com.recruitment.ai.entity.MatchingScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MatchingScoreRepository extends JpaRepository<MatchingScore, Long> {
    List<MatchingScore> findByJobIdOrderByTotalScoreDesc(Long jobId);
}
