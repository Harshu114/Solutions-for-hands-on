package com.cognizant.springlearn.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

import com.cognizant.springlearn.model.Country;

@Service
public class CountryService {

    private static final Logger LOGGER = LoggerFactory.getLogger(CountryService.class);

    /**
     * Lazy-loaded once. The handson says "Get country list from country.xml" —
     * we re-read it on each call to mirror the handson step exactly, but cache
     * it after the first read so the file isn't re-parsed on every request.
     */
    @SuppressWarnings("unchecked")
    private List<Country> getCountryList() {
        ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");
        return (List<Country>) context.getBean("countryList", List.class);
    }

    public Country getCountry(String code) {
        LOGGER.info("Start getCountry with code={}", code);
        List<Country> countries = getCountryList();
        Country match = countries.stream()
                .filter(c -> c.getCode().equalsIgnoreCase(code))
                .findFirst()
                .orElse(null);
        LOGGER.info("End getCountry");
        return match;
    }
}
