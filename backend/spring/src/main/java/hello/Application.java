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
import hello.repositories.TagRepository;
import hello.repositories.UserRepository;

@SpringBootApplication
public class Application implements CommandLineRunner {

	@Autowired
	ExpenseRepository expenseRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	TagRepository tagRepository;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		expenseRepository.deleteAll();
		userRepository.deleteAll();
		tagRepository.deleteAll();

		User alice 		= new User("Alice", "0", "alice@gmail.com");
		User bob   		= new User("Bob", "0", "bob@gmail.com");
		User ned   		= new User("Ned", "0", "ned@gmail.com");
		User eduardo   	= new User("Eduardo Demeneck", "114390747087570243371", "do.demeneck@gmail.com");

		userRepository.insert(alice);
		userRepository.insert(bob);
		userRepository.insert(ned);
		userRepository.insert(eduardo);

		Tag moon = new Tag("Place", "moon");
		Tag food = new Tag("Food", "food");
		Tag cart = new Tag("Supermarket", "shopping cart");
		Tag basket = new Tag("Grocery Store", "shopping basket");

		tagRepository.save(moon);
		tagRepository.save(food);
		tagRepository.save(cart);
		tagRepository.save(basket);
		
		Stream.of(new Expense(70.0, alice, LocalDateTime.parse("2019-01-06T02:01:47"),
						"John's Barbecue Place", food ),
				  new Expense(35.0, alice, LocalDateTime.now(), "Somewhere Nice", moon ), 
				  new Expense(70.0, alice, LocalDateTime.now(), "London Supermarket", cart),
				  new Expense(50.0, bob, LocalDateTime.now(), "Angeloni", cart),
				  new Expense(25.0, ned, LocalDateTime.now(), "Imperatriz", cart),
				  new Expense(25.0, eduardo, LocalDateTime.parse("2017-01-06T12:11:47"), "Burger King", food),
				  new Expense(55.0, eduardo, LocalDateTime.parse("2017-01-07T12:06:32"), "Angeloni", cart),
				  new Expense(32.0, eduardo, LocalDateTime.parse("2017-01-10T12:08:44"), "Di Pietri", food),
				  new Expense(78.0, eduardo, LocalDateTime.parse("2017-01-12T12:01:35"), "Armazem", basket),
				  new Expense(19.0, eduardo, LocalDateTime.parse("2017-01-15T12:07:55"), "Galpão Grill", food)  
				)
			  .forEach(x -> expenseRepository.insert(x)); 
	}

}