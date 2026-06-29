package com.library;

import com.library.service.Exercise1_BookService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Exercise1_LibraryManagementApplication {

    public static void main(String[] args) {

        ApplicationContext context =
            new ClassPathXmlApplicationContext("Exercise1_applicationContext.xml");

        Exercise1_BookService bookService = context.getBean("bookService", Exercise1_BookService.class);

        // Exercise 1: Basic Spring Application
        System.out.println("=== Exercise 1: Basic Spring App ===");
        bookService.displayBook();

        // Exercise 2: Dependency Injection
        System.out.println("=== Exercise 2: Dependency Injection ===");
        bookService.printInjectedDependency();

        // Exercise 5: IoC Container (same beans, just loading context)
        System.out.println("=== Exercise 5: IoC Container loaded successfully ===");

        // Exercise 7: Constructor + Setter already printed on startup
        System.out.println("=== Exercise 7: See Constructor/Setter messages above ===");
    }
}
