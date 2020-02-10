package hello.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import hello.entities.Expense;
import hello.entities.User;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ExpenseRepository extends MongoRepository<Expense, String> {

    List<Expense> findAllByUserAndValue(User user, Double value);

    List<Expense> findAllByUser(User user);

    void deleteByUserAndDate(User user, LocalDateTime date);

    void deleteAllByUserAndDateAndLocation(User user, LocalDateTime date, String location);

    void deleteAllByUserNameAndDateAndLocation(String name, LocalDateTime date, String location);

    List<Expense> findAllByUserNameAndDateAndLocation(User user, LocalDateTime date, String location);

    List<Expense> findAllByValue(Double value);

	boolean existsByUserName(String string);

	List<Expense> findAllByUserName(String userName);

	List<Expense> findByUserGoogleId(String googleId);
    
}