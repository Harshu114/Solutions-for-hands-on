package com.cognizant.ormlearn.repository;

import com.cognizant.ormlearn.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CountryRepository extends JpaRepository<Country, String> {

    // 2. spring-data-jpa: Query Methods
    List<Country> findByNameContainingOrderByName(String text);
    List<Country> findByNameStartingWith(String letter);

    // 3. spring-data-jpa: HQL
    @Query("SELECT c FROM Country c WHERE c.name LIKE %:keyword%")
    List<Country> searchByNameHQL(@Param("keyword") String keyword);

    // 3. spring-data-jpa: Native Query
    @Query(value = "SELECT * FROM country WHERE co_name LIKE CONCAT('%', :keyword, '%')",
           nativeQuery = true)
    List<Country> searchByNameNative(@Param("keyword") String keyword);
}
