package org.lindeck.authorization.forms;

import lombok.Data;
import org.lindeck.data.model.User;
import org.springframework.security.crypto.password.PasswordEncoder;

@Data
public class SignUpForm {
    private String login;
    private String email;
    private String password;

    public User createUser(PasswordEncoder passwordEncoder) {
        return new User(login, email, passwordEncoder.encode(password));
    }
}
