package hello.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;

public class User {

    @Id
    @JsonIgnore
    public String id;

    @JsonIgnore
    public String googleId;

    public String name;

    public String email;

    public User(){};
    
    public User(String name, String googleId, String email) {
        this.name = name;
        this.googleId = googleId;
        this.email = email;
	}

}