package com.alumni.networking.model.entity;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private User user;

    private String headline;
    private String about;
    private String department;
    private Integer batch;
    private String currentCompany;
    private String currentRole;
    private String location;
    private String linkedin;
    private Integer experienceYears;

    @Column(nullable = false)
    private boolean verified = false;

    @ElementCollection
    @CollectionTable(name = "profile_skills", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "skill", length = 100)
    private List<String> skills = new ArrayList<>();

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private Instant updatedAt;

    @PrePersist
    void onCreate() {
        Instant now = Instant.now();
        if (createdAt == null) {
            createdAt = now;
        }
        updatedAt = now;
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = Instant.now();
    }

    public Long getId() { return id; }
    public User getUser() { return user; }
    public String getHeadline() { return headline; }
    public String getAbout() { return about; }
    public String getDepartment() { return department; }
    public Integer getBatch() { return batch; }
    public String getCurrentCompany() { return currentCompany; }
    public String getCurrentRole() { return currentRole; }
    public String getLocation() { return location; }
    public String getLinkedin() { return linkedin; }
    public Integer getExperienceYears() { return experienceYears; }
    public boolean isVerified() { return verified; }
    public List<String> getSkills() { return skills; }
    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }

    public void setId(Long id) { this.id = id; }
    public void setUser(User user) { this.user = user; }
    public void setHeadline(String headline) { this.headline = headline; }
    public void setAbout(String about) { this.about = about; }
    public void setDepartment(String department) { this.department = department; }
    public void setBatch(Integer batch) { this.batch = batch; }
    public void setCurrentCompany(String currentCompany) { this.currentCompany = currentCompany; }
    public void setCurrentRole(String currentRole) { this.currentRole = currentRole; }
    public void setLocation(String location) { this.location = location; }
    public void setLinkedin(String linkedin) { this.linkedin = linkedin; }
    public void setExperienceYears(Integer experienceYears) { this.experienceYears = experienceYears; }
    public void setVerified(boolean verified) { this.verified = verified; }
    public void setSkills(List<String> skills) { this.skills = skills; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}