package hello;

import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit4.SpringRunner;

import hello.entities.Expense;
import hello.entities.User;
import hello.repositories.ExpenseRepository;

@DataMongoTest
@RunWith(SpringRunner.class)
public class ExpenseRepositoryTest {


    @Autowired
    ExpenseRepository expenseRepository;

    @Test
    public void findAllExpensesByUser(){
        List<Expense> expenses = expenseRepository.findAllByUser(new User("Alice"));
        Assertions.assertThat(expenses.get(0).user.name).isEqualTo("Alice");
        Assertions.assertThat(expenses.size()).isGreaterThan(0);
        Assertions.assertThat(expenses.size()).isEqualTo(3);
        Assertions.assertThat(expenses.get(0).date).isNotNull();
    }

    @Test
    public void findAllExpensesByValue(){
        List<Expense> expenses = expenseRepository.findAllByValue(70.0);
        Assertions.assertThat(expenses.get(0).value).isGreaterThan(0);
        Assertions.assertThat(expenses.get(0).value).isEqualTo(70.0);
        Assertions.assertThat(expenses.size()).isGreaterThan(0);
        Assertions.assertThat(expenses.size()).isEqualTo(2);
    }


}