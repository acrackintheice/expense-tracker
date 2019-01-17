package hello.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import hello.entities.Expense;
import hello.services.ExpenseService;
import hello.services.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ExpenseController {

    @Autowired
    ExpenseService expenseService;

    @Autowired
    UserService userService;

    @RequestMapping("/expenses")
    public List<Expense> expenses() throws IOException {
        List<Expense> exps = expenseService.findAll();
        return exps;
    }

    @RequestMapping("/expenses/{googleId}")
    public List<Expense> expensesByUserGoogleId(@PathVariable(value = "googleId") String googleId) {
        return expenseService.findByUserGoogleId(googleId);
    }

    @RequestMapping(value = "/expenses", method = RequestMethod.DELETE)
    public Expense deleteExpense(@RequestBody Expense exp) {
        expenseService.deleteAllByUserAndDateAndLocation(exp.user, exp.date, exp.location);
        return exp;
    }

    @RequestMapping(value = "/expenses/deleteall", method = RequestMethod.DELETE)
    public String deleteAll() {
        expenseService.deleteAll();
        return "All expenses were deleted";
    }

    @RequestMapping(value = "/expenses", method = RequestMethod.POST)
    public Expense insertExpense(@RequestBody Expense exp) {
        expenseService.insert(exp);
        return exp;
    }

}
