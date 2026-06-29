package com.library.service;

import com.library.repository.Exercise1_BookRepository;

public class Exercise7_BookService {

    private Exercise1_BookRepository bookRepository;
    private String serviceName;

    public Exercise7_BookService(String serviceName) {
        this.serviceName = serviceName;
        System.out.println("Constructor Injection — serviceName: " + serviceName);
    }

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
