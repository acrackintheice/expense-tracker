package hello.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hello.entities.Expense;
import hello.entities.User;
import hello.repositories.ExpenseRepository;

@Service
public class ExpenseService {

    @Autowired
    ExpenseRepository expenseRepository;

    public List<Expense> findAll(){
        return expenseRepository.findAll();
    }

    public List<Expense> findAllByUserName(String userName){
        return expenseRepository.findAllByUserName(userName);
    }

	public void deleteAll() {
        expenseRepository.deleteAll();
	}

	public void deleteAllByUserAndDateAndLocation(User user, LocalDateTime date, String location) {
        expenseRepository.deleteAllByUserAndDateAndLocation(user, date, location);
	}

	public void insert(Expense exp) {
        expenseRepository.save(exp);
	}

	public List<Expense> findByUserGoogleId(String googleId) {
		return expenseRepository.findByUserGoogleId(googleId);
	}


}