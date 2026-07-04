package com.cognizant.springlearn.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.springlearn.model.Country;
import com.cognizant.springlearn.service.CountryService;

@RestController
public class CountryController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CountryController.class);

    private final CountryService countryService = new CountryService();

    /**
     * Exercise 4: GET /country  →  India (loaded from the "country" bean in country.xml).
     */
    @GetMapping("/country")
    public Country getCountryIndia() {
        LOGGER.info("START getCountryIndia()");
        ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");
        Country country = (Country) context.getBean("country", Country.class);
        LOGGER.info("END getCountryIndia()");
        return country;
    }

    /**
     * Exercise 5: GET /countries/{code}  →  case-insensitive lookup.
     */
    @GetMapping("/countries/{code}")
    public Country getCountry(@PathVariable String code) {
        LOGGER.info("START getCountry({})", code);
        Country country = countryService.getCountry(code);
        LOGGER.info("END getCountry({})", code);
        return country;
    }
}
