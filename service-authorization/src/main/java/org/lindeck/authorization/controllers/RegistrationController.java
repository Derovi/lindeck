package org.lindeck.authorization.controllers;

import org.lindeck.authorization.forms.SignUpForm;
import org.lindeck.data.dao.UserDAO;
import org.lindeck.security.CommonSecurity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/register")
public class RegistrationController {
    private final UserDAO userDAO;

    @Autowired
    CommonSecurity commonSecurity;

    @Autowired
    RegistrationController(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @PostMapping()
    void signUp(@RequestBody SignUpForm signUpForm) {
        userDAO.save(signUpForm.createUser(commonSecurity.passwordEncoder()));
    }

    @GetMapping(value = "/user_exists_login", produces = MediaType.APPLICATION_JSON_VALUE)
    boolean userExistsLogin(@RequestParam String login) {
        return userDAO.existsByLogin(login);
    }

    @GetMapping(value = "/user_exists_email", produces = MediaType.APPLICATION_JSON_VALUE)
    boolean userExistsEmail(@RequestParam String email) {
        return userDAO.existsByEmail(email);
    }
}
