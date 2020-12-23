package org.lindeck.data.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

/**
 * Entity for users
 * @author derovi
 */

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

    @OneToMany
    private List<Deck> decks;

    public User(String login, String email, String password) {
        this.login = login;
        this.email = email;
        this.password = password;
    }
}
