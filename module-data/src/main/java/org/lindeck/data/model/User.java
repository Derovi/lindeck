package org.lindeck.data.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@NoArgsConstructor
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    private int id;

    private String login;
    private String email;
    private String password;
    private String role;

    public User(String login, String email, String password) {
        this.login = login;
        this.email = email;
        this.password = password;
    }
}
