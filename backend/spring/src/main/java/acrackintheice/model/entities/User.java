package acrackintheice.model.entities;

import lombok.*;
import org.springframework.security.oauth2.jwt.Jwt;

import javax.persistence.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
@Entity
@Table(name = "app_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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