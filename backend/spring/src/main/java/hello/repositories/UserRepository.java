package hello.repositories;

import hello.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource
public interface UserRepository extends MongoRepository<User, String> {

	Optional<User> findByGoogleId(String googleId);

}