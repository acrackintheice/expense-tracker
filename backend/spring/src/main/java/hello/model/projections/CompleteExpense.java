package hello.model.projections;

import hello.model.entities.Expense;
import hello.model.entities.Tag;
import hello.model.entities.User;
import org.springframework.data.rest.core.config.Projection;

import java.time.LocalDateTime;

@Projection(name = "complete", types = { Expense.class })
public interface CompleteExpense {

    long getId();

    Double getValue();

    User getUser();

    String getLocation();

    LocalDateTime getDate();

    Tag getTag();
}
