package com.alumni.networking.repository;

import java.util.List;

import com.alumni.networking.model.entity.JobOpportunity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobOpportunityRepository extends JpaRepository<JobOpportunity, Long> {
    List<JobOpportunity> findByActiveTrue();
    long countByActiveTrue();
    long count();
}