package hello;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class OAuth2ResourceServerSecurityConfiguration extends WebSecurityConfigurerAdapter {


	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// @formatter:off
		http
			.cors().and()
			.authorizeRequests()
				.anyRequest().authenticated()
				.and()
			.oauth2ResourceServer()
				.jwt()	
					.jwkSetUri("https://www.googleapis.com/oauth2/v3/certs");
		// @formatter:on
	}
}