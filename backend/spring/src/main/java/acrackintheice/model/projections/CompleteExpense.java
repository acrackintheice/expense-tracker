package acrackintheice.model.projections;

import acrackintheice.model.entities.Expense;
import acrackintheice.model.entities.Tag;
import acrackintheice.model.entities.User;
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
