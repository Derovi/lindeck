package org.lindeck.data.dao;

import org.lindeck.data.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDAO extends CrudRepository<User, String> {
    boolean existsByLogin(String login);
    boolean existsByEmail(String email);
    User findByLogin(String login);
}
