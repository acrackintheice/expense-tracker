package hello.services;

import java.util.List;
import java.util.Optional;

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
        Jwt jwtUserToken = ((Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        return this.findByJwtToken(jwtUserToken).orElse(new User());
    }

    private Optional<User> findByJwtToken(Jwt token){
        String googleId = (String) token.getSubject();
        return userRepository.findByGoogleId(googleId);
    }

    public void save(Jwt token){
        userRepository.save(findByJwtToken(token).orElse(new User(token))) ;
    }

    public void save(User user){
        this.userRepository.save(user);    
    }
}