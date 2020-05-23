package acrackintheice.repositories;

import acrackintheice.model.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@CrossOrigin
@RepositoryRestResource
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByGoogleId(String googleId);

}