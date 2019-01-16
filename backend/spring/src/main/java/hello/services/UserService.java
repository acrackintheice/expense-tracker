package hello.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import hello.entities.User;
import hello.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public List<User> findAll(){
        return userRepository.findAll();
    }

    public User findAuthenticatedUser(){
        Jwt userJwtInfo = ((Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        String googleId = (String) userJwtInfo.getClaims().get("sub");
        return userRepository.findByGoogleId(googleId);
    }
}