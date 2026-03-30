package com.leonardo.hug.user;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.leonardo.hug.personal_data.PersonalData;
import com.leonardo.hug.role.Role;
import com.leonardo.hug.sale.Sale;
import com.leonardo.hug.interaction.Interaction;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder.Default;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "_user")
@EntityListeners(AuditingEntityListener.class)
@Entity
public class User implements UserDetails, Principal{

    @Id
    @GeneratedValue
    private Integer id;
    private String firstname;
    private String lastname;
    @Column(unique = true)
    private String email;
    private String password;
    private boolean accountLocked;
    private boolean enabled;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Role> roles;

    @Embedded
    private PersonalData personalData;

    @Default
    double latitude = 0.0;
    @Default
    double longitude = 0.0;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Sale> sales;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Interaction> interactions;

    @Builder.Default
    boolean isCoach = false;

    String oAuth2UserId;
    String oAuth2Provider;

    // @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    // private NotificationToken notificationToken;

    @Builder.Default
    private double saved = 0.00;

    public void addSaved(double amount){
        this.saved += amount;
        this.saved = Math.round(this.saved * 100.0) / 100.0;
    }
    
    @Override
    public String getName() {
        return email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles
            .stream()
            .map(role -> new SimpleGrantedAuthority(role.getName()))
            .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email; 
    }

    @Override
	public boolean isAccountNonExpired() {
		return true;
	}

    @Override
	public boolean isAccountNonLocked() {
		return !accountLocked;
	}

    @Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

    @Override
	public boolean isEnabled() {
		return enabled;
	}

    public String getFullName(){
        return firstname + " " + lastname;
    }
}
