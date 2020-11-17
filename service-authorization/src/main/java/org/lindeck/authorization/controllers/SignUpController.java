package org.lindeck.authorization.controllers;

import org.lindeck.authorization.forms.SignUpForm;
import org.lindeck.data.dao.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("sign_up/")
public class SignUpController {
    private final UserDAO userDAO;

    @Autowired
    SignUpController(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @PostMapping()
    void signUp(@RequestBody SignUpForm signUpForm) {
        System.out.println(signUpForm);
        userDAO.save(signUpForm.createUser());
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
