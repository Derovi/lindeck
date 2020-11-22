package org.lindeck.authorization.controllers;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class MainController {
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    String test() {
        return "test";
    }
}
