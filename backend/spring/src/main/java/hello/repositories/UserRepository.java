package hello.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import hello.entities.User;

public interface UserRepository extends MongoRepository<User, String> {

	User findByGoogleId(String googleId);

}