package hello.controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.google.api.client.auth.oauth2.BearerToken;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.json.GoogleJsonErrorContainer;
import com.google.api.client.googleapis.services.json.AbstractGoogleJsonClient.Builder;
import com.google.api.client.http.GenericUrl;
import com.google.api.client.http.HttpHeaders;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestFactory;
import com.google.api.client.http.HttpResponse;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.LowLevelHttpRequest;
import com.google.api.client.http.apache.ApacheHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.JsonObjectParser;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.ByteStreams;
import com.google.api.client.util.Key;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import hello.entities.Expense;
import hello.entities.User;
import hello.repositories.ExpenseRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ExpenseController {

    @Autowired
    ExpenseRepository expenseRepository;

    GoogleUser validateToken(String accessToken) throws IOException{
        String tokenValidationUrl = "https://www.googleapis.com/oauth2/v3/userinfo";
        HttpRequestFactory requestFactory = new NetHttpTransport().createRequestFactory();
        HttpRequest request = requestFactory.buildGetRequest(new GenericUrl(tokenValidationUrl));
        request.setParser(new JsonObjectParser(new JacksonFactory()));
        HttpHeaders headers = request.getHeaders();
        headers.setAuthorization(accessToken);
        GoogleUser user = null;
        HttpResponse response = null;

        try {
            response = request.execute();
            user = response.parseAs(GoogleUser.class);
        } catch (Exception e) {
            System.out.println("Kappa");
        } finally {
            if (response != null) {
                response.disconnect();
            }
        }

        return user;
    }

    @RequestMapping("/expenses")
    public List<Expense> expenses(@RequestHeader("Authorization") String accessToken) throws IOException {

        GoogleUser validatedUser = validateToken(accessToken);

        List<Expense> exps = new ArrayList<Expense>();
        if (expenseRepository.existsByUserName(validatedUser.given_name));
             exps = expenseRepository.findAll();
        return exps;
    }
    /*
     * 
     * security: oauth2: client: clientId:
     * 707870445329-iu74qui75vgsh1kthhnit54unadb9tva.apps.googleusercontent.com
     * clientSecret: oIhXIHkb8hLmM59icHUs6DBc accessTokenUri:
     * https://www.googleapis.com/oauth2/v2/token userAuthorizationUri:
     * https://accounts.google.com/o/oauth2/v2/auth tokenName: access_token
     * authenticationScheme: query clientAuthenticationScheme: form resource:
     * userInfoUri: https://www.googleapis.com/oauth2/v1/userinfo?alt=json
     */

    @RequestMapping("/expenses/{username}")
    public List<Expense> expensesBy(@PathVariable(value = "username") String username) {
        List<Expense> exps = expenseRepository.findAllByUser(new User(username));
        return exps;
    }

    @RequestMapping(value = "/expenses", method = RequestMethod.DELETE)
    public Expense deleteExpense(@RequestBody Expense exp) {
        expenseRepository.deleteAllByUserAndDateAndLocation(exp.user, exp.date, exp.location);
        return exp;
    }

    @RequestMapping(value = "/expenses/deleteall", method = RequestMethod.DELETE)
    public String deleteAll() {
        expenseRepository.deleteAll();
        return "All expenses were deleted";
    }

    @RequestMapping(value = "/expenses", method = RequestMethod.POST)
    public Expense insertExpense(@RequestBody Expense exp) {
        expenseRepository.insert(exp);
        return exp;
    }

    public static class GoogleUser {
        @Key
        public String sub;
        @Key
        public String name;
        @Key
        public String given_name;
        @Key
        public String family_name;
        @Key
        public String profile;
        @Key
        public String picture;
        @Key
        public String email;
        @Key
        public boolean email_verified;
        @Key
        public String gender;
        @Key
        public String locale;

        public String getSub() {
            return sub;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getGiven_name() {
            return given_name;
        }

        public String getFamily_name() {
            return family_name;
        }

        public String getProfile() {
            return profile;
        }

        public String getPicture() {
            return picture;
        }

        public String getEmail() {
            return email;
        }

        public boolean isEmail_verified() {
            return email_verified;
        }

        public String getGender() {
            return gender;
        }

        public String getLocale() {
            return locale;
        }

    }

}

