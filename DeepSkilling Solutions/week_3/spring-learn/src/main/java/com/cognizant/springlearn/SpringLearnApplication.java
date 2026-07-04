package com.cognizant.springlearn;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.cognizant.springlearn.model.Country;

@SpringBootApplication
public class SpringLearnApplication {

    private static final Logger LOGGER = LoggerFactory.getLogger(SpringLearnApplication.class);

    public static void main(String[] args) {
        LOGGER.info("Inside main() of SpringLearnApplication — main method invoked.");
        displayCountry();
        SpringApplication.run(SpringLearnApplication.class, args);
    }

    /**
     * Exercise 2: load the "country" bean from country.xml and log it.
     * Invoked from main() before the Spring Boot context starts.
     */
    public static void displayCountry() {
        ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");
        Country country = (Country) context.getBean("country", Country.class);
        LOGGER.debug("Country : {}", country.toString());
    }
}
