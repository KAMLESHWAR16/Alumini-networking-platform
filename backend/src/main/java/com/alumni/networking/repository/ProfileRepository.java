package com.alumni.networking.repository;

import java.util.List;
import java.util.Optional;

import com.alumni.networking.model.entity.Profile;
import com.alumni.networking.model.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> findByUserId(Long userId);
    List<Profile> findByUser_Role(Role role);
    long countByVerified(boolean verified);
    List<Profile> findByVerified(boolean verified);
}