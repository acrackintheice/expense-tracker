package acrackintheice.services;

import acrackintheice.model.entities.User;
import acrackintheice.repositories.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Log4j2
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private Optional<User> findByJwtToken(Jwt token){
        String googleId = token.getSubject();
        return userRepository.findByGoogleId(googleId);
    }

    public void save(Jwt token){
        userRepository.save(findByJwtToken(token).orElse(new User(token))) ;
    }

}