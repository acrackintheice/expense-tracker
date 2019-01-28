package hello;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDateTime;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.util.StdDateFormat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import hello.entities.Expense;
import hello.entities.Tag;
import hello.entities.User;

/* 
    Now that authentication was added to the api these tests no longer work.
    Wonder about what could be done to fix them.
*/

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class ExpenseControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    public void getExpense() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void getExpenseFromSpecificUser() throws Exception {
        String name = "Alice";
        String jsonUserName = "\"user\":{\"name\":\""+ name +"\"}".replace("\\", "");
        mvc.perform(MockMvcRequestBuilders.get("/expenses/" + name).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.[0].user.name", is(name)))
                .andExpect(content().string(containsString(jsonUserName)));
    }
    
    @Test
    public void getExpensesOfEspecificValue() throws Exception {
        Expense exp = new Expense(
            70.0, 
            new User("Alice", "0", "alice@gmail.com"), 
            LocalDateTime.parse("2019-01-06T02:01:47"), 
            "John's Barbecue Place",
            new Tag("Food", "food")
        );
        ObjectMapper mapper = new ObjectMapper();
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        mapper.setDateFormat(new StdDateFormat().withColonInTimeZone(true));
        String jsonExp = mapper.writeValueAsString(exp)
            .replace("\\", "");

        mvc.perform(MockMvcRequestBuilders.get("/expenses").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Alice")))
                .andExpect(content().string(containsString(jsonExp)))
                .andExpect(jsonPath("$.[0].user.name").value("Alice"));
    }
}