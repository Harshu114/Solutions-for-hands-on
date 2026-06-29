package com.library.repository;

import org.springframework.stereotype.Repository;

@Repository
public class Exercise6_BookRepository {
    public String getBook() {
        return "Clean Code - via Annotation Config";
    }
}
