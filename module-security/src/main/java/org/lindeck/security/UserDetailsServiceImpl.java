package org.lindeck.security;

import org.lindeck.data.dao.UserDAO;
import org.lindeck.data.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserDAO userDAO;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Load by username: " + username);
        User user = userDAO.findByLogin(username);
        System.out.println("Email:");
        System.out.println(user.getEmail());
        return new UserDetailsImpl(user);
    }
}
