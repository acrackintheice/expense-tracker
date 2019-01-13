package hello.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import hello.entities.Expense;
import hello.entities.User;

public interface ExpenseRepository extends MongoRepository<Expense, String> {

    public List<Expense> findAllByUserAndValue(User user, Double value);

    public List<Expense> findAllByUser(User user);

    public void deleteByUserAndDate(User user, LocalDateTime date);

    public void deleteAllByUserAndDateAndLocation(User user, LocalDateTime date, String location);

    public List<Expense> findAllByUserNameAndDateAndLocation(User user, LocalDateTime date, String location);

    public List<Expense> findAllByValue(Double value);

	public boolean existsByUserName(String string);
    
}