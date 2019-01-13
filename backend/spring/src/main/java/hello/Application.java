package hello;

import java.time.LocalDateTime;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import hello.entities.Expense;
import hello.entities.User;
import hello.repositories.ExpenseRepository;

@SpringBootApplication
public class Application implements CommandLineRunner {

	@Autowired
	ExpenseRepository expenseRepository;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		expenseRepository.deleteAll();

		Stream.of(new Expense(70.0, new User("Alice"), LocalDateTime.parse("2019-01-06T02:01:47"), "John's Barbecue Place")	,
				  new Expense(35.0, new User("Alice"), LocalDateTime.now(), "Somewhere Nice"), 
				  new Expense(70.0, new User("Alice"), LocalDateTime.now(), "London Supermarket"),
				  new Expense(50.0, new User("Bob"), LocalDateTime.now(), "Angeloni"),
				  new Expense(25.0, new User("Ned"), LocalDateTime.now(), "Imperatriz"),
				  new Expense(25.0, new User("Eduardo"), LocalDateTime.parse("2017-01-06T12:11:47"), "Burger King"))
			  .forEach(x -> expenseRepository.insert(x));
	}

}