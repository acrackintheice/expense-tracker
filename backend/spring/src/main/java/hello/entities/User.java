package hello.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;

public class User {
    
    @Id
    @JsonIgnore
    public String id;

    public String name;

    public User(){};
    
    public User(String name) {
        this.id = null;
        this.name = name;
	}

}