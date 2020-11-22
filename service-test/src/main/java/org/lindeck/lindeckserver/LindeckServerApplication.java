package org.lindeck.lindeckserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "org.lindeck")
@EnableJpaRepositories(basePackages="org.lindeck")
@EntityScan(basePackages = "org.lindeck")
public class LindeckServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(LindeckServerApplication.class, args);
	}

}
