package hello.services;

import hello.entities.User;
import hello.repositories.UserRepository;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

/*    public List<User> findAll(){
        return userRepository.findAll();
    }

    public User findAuthenticatedUser(){
        Jwt jwtUserToken = ((Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        return this.findByJwtToken(jwtUserToken).orElse(new User());
    }*/

    private Optional<User> findByJwtToken(Jwt token){
        String googleId = token.getSubject();
        return userRepository.findByGoogleId(googleId);
    }

    public void save(Jwt token){
        userRepository.save(findByJwtToken(token).orElse(new User(token))) ;
    }

}