package com.cognizant.ormlearn.service;

import com.cognizant.ormlearn.model.Country;
import com.cognizant.ormlearn.repository.CountryRepository;
import com.cognizant.ormlearn.service.exception.CountryNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class CountryService {

    @Autowired
    private CountryRepository countryRepository;

    // Quick Example
    @Transactional
    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    // Find by code
    @Transactional
    public Country findCountryByCode(String code) throws CountryNotFoundException {
        Optional<Country> result = countryRepository.findById(code);
        if (!result.isPresent()) {
            throw new CountryNotFoundException("Country not found: " + code);
        }
        return result.get();
    }

    // Add new country
    @Transactional
    public void addCountry(Country country) {
        countryRepository.save(country);
    }

    // Query Methods
    @Transactional
    public List<Country> findByNameContaining(String text) {
        return countryRepository.findByNameContainingOrderByName(text);
    }

    @Transactional
    public List<Country> findByNameStartingWith(String letter) {
        return countryRepository.findByNameStartingWith(letter);
    }

    // HQL
    @Transactional
    public List<Country> searchByNameHQL(String keyword) {
        return countryRepository.searchByNameHQL(keyword);
    }

    // Native Query
    @Transactional
    public List<Country> searchByNameNative(String keyword) {
        return countryRepository.searchByNameNative(keyword);
    }
}
