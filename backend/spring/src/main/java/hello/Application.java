package hello;

import java.time.LocalDateTime;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import hello.entities.Expense;
import hello.entities.Tag;
import hello.entities.User;
import hello.repositories.ExpenseRepository;
import hello.repositories.UserRepository;

@SpringBootApplication
public class Application implements CommandLineRunner {

	@Autowired
	ExpenseRepository expenseRepository;

	@Autowired
	UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		expenseRepository.deleteAll();
		userRepository.deleteAll();

		User alice 		= new User("Alice", "0", "alice@gmail.com");
		User bob   		= new User("Bob", "0", "bob@gmail.com");
		User ned   		= new User("Ned", "0", "ned@gmail.com");
		User eduardo   	= new User("Eduardo Demeneck", "114390747087570243371", "do.demeneck@gmail.com");

		userRepository.insert(alice);
		userRepository.insert(bob);
		userRepository.insert(ned);
		userRepository.insert(eduardo);
		
		Stream.of(new Expense(70.0, alice, LocalDateTime.parse("2019-01-06T02:01:47"),
						"John's Barbecue Place", new Tag("Food", "food")),
				  new Expense(35.0, alice, LocalDateTime.now(), "Somewhere Nice", new Tag("Place", "moon")), 
				  new Expense(70.0, alice, LocalDateTime.now(), "London Supermarket", new Tag("Supermarket", "shopping cart")),
				  new Expense(50.0, bob, LocalDateTime.now(), "Angeloni", new Tag("Supermarket", "shopping cart")),
				  new Expense(25.0, ned, LocalDateTime.now(), "Imperatriz", new Tag("Supermarket", "shopping cart")),
				  new Expense(25.0, eduardo, LocalDateTime.parse("2017-01-06T12:11:47"), "Burger King", new Tag("Food", "food")),
				  new Expense(25.0, eduardo, LocalDateTime.parse("2017-01-07T12:06:32"), "Angeloni", new Tag("Supermarket", "shopping cart")),
				  new Expense(25.0, eduardo, LocalDateTime.parse("2017-01-10T12:08:44"), "Di Pietri", new Tag("Food", "food")),
				  new Expense(25.0, eduardo, LocalDateTime.parse("2017-01-12T12:01:35"), "Armazem", new Tag("Grocery Store", "shopping basket")),
				  new Expense(25.0, eduardo, LocalDateTime.parse("2017-01-15T12:07:55"), "Galpão Grill", new Tag("Food", "food"))  
				)
			  .forEach(x -> expenseRepository.insert(x)); 
	}

}