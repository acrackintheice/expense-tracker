package hello.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import hello.entities.User;

public interface UserRepository extends MongoRepository<User, String> {

	Optional<User> findByGoogleId(String googleId);

}