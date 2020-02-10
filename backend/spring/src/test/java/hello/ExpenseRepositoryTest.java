package hello;

import hello.entities.Expense;
import hello.repositories.ExpenseRepository;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@DataMongoTest
@RunWith(SpringRunner.class)
public class ExpenseRepositoryTest {

    @Autowired
    ExpenseRepository expenseRepository;

    @Test
    public void findAllExpensesByUserName(){
        List<Expense> expenses = expenseRepository.findAllByUserName("Alice");
        Assertions.assertThat(expenses.get(0).getUser().getName()).isEqualTo("Alice");
        Assertions.assertThat(expenses.size()).isGreaterThan(0);
        Assertions.assertThat(expenses.size()).isEqualTo(3);
        Assertions.assertThat(expenses.get(0).getDate()).isNotNull();
    }

    @Test
    public void findAllExpensesByValue(){
        List<Expense> expenses = expenseRepository.findAllByValue(70.0);
        Assertions.assertThat(expenses.get(0).getValue()).isGreaterThan(0);
        Assertions.assertThat(expenses.get(0).getValue()).isEqualTo(70.0);
        Assertions.assertThat(expenses.size()).isGreaterThan(0);
        Assertions.assertThat(expenses.size()).isEqualTo(2);
    }


}