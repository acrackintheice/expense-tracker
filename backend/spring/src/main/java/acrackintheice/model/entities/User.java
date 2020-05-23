package acrackintheice.model.entities;

import lombok.*;
import org.springframework.security.oauth2.jwt.Jwt;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String googleId;

    private String name;

    private String email;

    public User(Jwt token){
        this.name = (String) token.getClaims().get("name");
        this.googleId = token.getSubject();
        this.email = (String) token.getClaims().get("email");
    }

}