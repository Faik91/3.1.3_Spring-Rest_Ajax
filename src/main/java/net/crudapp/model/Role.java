package net.crudapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "roles")
public class Role implements GrantedAuthority {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "role")
    private String role;

    public Role() {
    }


    public Role(String role) {
        this.role = role;
    }


//    @ManyToMany(mappedBy = "roles", fetch = FetchType.EAGER)
//     private Set<User> users = new HashSet<>();

    @JsonIgnore
    @Override
    public String getAuthority() {
        return role;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }


    public void setRole(String role) {
        this.role = role;
    }

//    @JsonIgnore
//    public Set<User> getUsers() {
//        return users;
//    }
//
//    @JsonSetter
//    public void setUsers(Set<User> users) {
//        this.users = users;
//    }

    @Override
    public String toString() {
        return role;
    }
}
