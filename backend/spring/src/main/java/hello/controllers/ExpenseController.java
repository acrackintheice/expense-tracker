package hello.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import hello.entities.Expense;
import hello.services.ExpenseService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ExpenseController {

    private final ExpenseService expenseService;

    ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping("/expenses")
    public List<Expense> findAll() {
        return expenseService.findAll();
    }

    @GetMapping("/expenses/{googleId}")
    public List<Expense> findAllByUserGoogleId(@PathVariable(value = "googleId") String googleId) {
        return expenseService.findByUserGoogleId(googleId);
    }

    @PostMapping("/expenses")
    public Expense update(@RequestBody Expense exp) {
        expenseService.save(exp);
        return exp;
    }

    @PutMapping(value = "/expenses")
    public Expense insert(@RequestBody Expense exp) {
        expenseService.save(exp);
        return exp;
    }

    @DeleteMapping(value = "/expenses")
    public Expense delete(@RequestBody Expense exp) {
        expenseService.deleteAllByUserNameAndDateAndLocation(exp.user.name, exp.date, exp.location);
        return exp;
    }

    @DeleteMapping(value = "/expenses/deleteall")
    public String deleteAll() {
        expenseService.deleteAll();
        return "All expenses were deleted";
    }

}
