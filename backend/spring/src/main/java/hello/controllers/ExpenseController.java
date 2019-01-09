package hello.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import hello.entities.Expense;
import hello.entities.User;
import hello.repositories.ExpenseRepository;

@RestController
public class ExpenseController {

    @Autowired
    ExpenseRepository expenseRepository;

    @RequestMapping("/expenses")
    public List<Expense> expenses() {
        List<Expense> exps =  expenseRepository.findAll();
        return exps;
    }

    @RequestMapping("/expenses/{username}")
    public List<Expense> expensesBy(@PathVariable(value="username") String username) {
        List<Expense> exps = expenseRepository.findAllByUser(new User(username));
        return exps;
    }

    @RequestMapping(value = "/expenses", method = RequestMethod.DELETE)
    public Expense deleteExpense(@RequestBody Expense exp) {
        expenseRepository.deleteAllByUserAndDateAndLocation(exp.user, exp.date, exp.location);
        return exp;
    }

    @RequestMapping(value="/expenses/deleteall", method=RequestMethod.DELETE)
    public String deleteAll() {
        expenseRepository.deleteAll();
        return "All expenses were deleted";
    }

    @RequestMapping(value="/expenses", method=RequestMethod.POST)
    public Expense insertExpense(@RequestBody Expense exp) {
        expenseRepository.insert(exp);
        return exp;
    }

}