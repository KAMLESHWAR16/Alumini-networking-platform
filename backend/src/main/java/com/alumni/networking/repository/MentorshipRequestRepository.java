package com.alumni.networking.repository;

import java.util.List;
import java.util.Optional;

import com.alumni.networking.model.entity.MentorshipRequest;
import com.alumni.networking.model.entity.MentorshipStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MentorshipRequestRepository extends JpaRepository<MentorshipRequest, Long> {

    @Query("select m from MentorshipRequest m " +
           "where (m.student.id = :a and m.mentor.id = :b) " +
           "   or (m.student.id = :b and m.mentor.id = :a)")
    Optional<MentorshipRequest> findByPair(@Param("a") Long a, @Param("b") Long b);

    List<MentorshipRequest> findByStudentId(Long studentId);
    List<MentorshipRequest> findByMentorId(Long mentorId);
    List<MentorshipRequest> findByStudentIdAndStatus(Long studentId, MentorshipStatus status);
    List<MentorshipRequest> findByMentorIdAndStatus(Long mentorId, MentorshipStatus status);
    long countByStatus(MentorshipStatus status);
}