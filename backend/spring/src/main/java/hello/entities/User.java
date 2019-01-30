package hello.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.security.oauth2.jwt.Jwt;

public class User {

    @Id
    @JsonIgnore
    public String id;

    public String googleId;

    public String name;

    public String email;

    public User(){};
    
    public User(String name, String googleId, String email) {
        this.name = name;
        this.googleId = googleId;
        this.email = email;
    }
    
    public User(Jwt token){
        this.name = (String) token.getClaims().get("name");
        this.googleId = token.getSubject();
        this.email = (String) token.getClaims().get("email");
    }

}