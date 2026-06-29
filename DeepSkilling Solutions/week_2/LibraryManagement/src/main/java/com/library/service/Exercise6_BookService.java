package com.library.service;

import com.library.repository.Exercise6_BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Exercise6_BookService {

    @Autowired
    private Exercise6_BookRepository bookRepository;

    public void displayBook() {
        System.out.println("Annotation Config — Book: " + bookRepository.getBook());
    }
}
