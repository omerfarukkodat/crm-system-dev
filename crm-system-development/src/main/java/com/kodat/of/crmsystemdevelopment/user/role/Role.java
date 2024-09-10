package com.kodat.of.crmsystemdevelopment.user.role;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kodat.of.crmsystemdevelopment.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "roles")
@EntityListeners(AuditingEntityListener.class)
public class Role {

    @Id
    @GeneratedValue
    private Integer id;
    @Column(unique = true)
    private String name;
    @ManyToMany(mappedBy = "roles")
    @JsonIgnore
    private Set<User> user;

    @CreationTimestamp
    @Column(nullable = false,updatable = false)
    private LocalDateTime createdDate;

    @UpdateTimestamp
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;

}
