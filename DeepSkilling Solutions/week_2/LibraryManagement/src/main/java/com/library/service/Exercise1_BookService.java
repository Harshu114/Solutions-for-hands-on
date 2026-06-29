package com.library.service;

import com.library.repository.Exercise1_BookRepository;

public class Exercise1_BookService {

    private Exercise1_BookRepository bookRepository;
    private String serviceName;

    // Constructor Injection (Exercise 7)
    public Exercise1_BookService(String serviceName) {
        this.serviceName = serviceName;
        System.out.println("Constructor Injection — serviceName: " + serviceName);
    }

    // Setter Injection (Exercise 2 and 7)
    public void setBookRepository(Exercise1_BookRepository bookRepository) {
        this.bookRepository = bookRepository;
        System.out.println("Setter Injection — bookRepository set");
    }

    public void displayBook() {
        System.out.println("Service: " + serviceName);
        System.out.println("Book: " + bookRepository.getBook());
    }

    public void printInjectedDependency() {
        System.out.println("BookRepository injected: " + (bookRepository != null));
        System.out.println("Fetched from repo: " + bookRepository.getBook());
    }
}
