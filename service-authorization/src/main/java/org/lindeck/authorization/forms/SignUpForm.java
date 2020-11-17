package org.lindeck.authorization.forms;

import lombok.Data;
import org.lindeck.data.model.User;

@Data
public class SignUpForm {
    private String login;
    private String email;
    private String password;

    public User createUser() {
        return new User(login, email, password);
    }
}
