package com.library;

import com.library.service.Exercise1_BookService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Exercise2_LibraryManagementApplication {
    public static void main(String[] args) {
        ApplicationContext context =
            new ClassPathXmlApplicationContext("Exercise1_applicationContext.xml");

        Exercise1_BookService bookService =
            context.getBean("bookService", Exercise1_BookService.class);

        System.out.println("=== Exercise 2: Dependency Injection ===");
        bookService.printInjectedDependency();
        System.out.println("Exercise 2 complete — Dependency injection works!");
    }
}
