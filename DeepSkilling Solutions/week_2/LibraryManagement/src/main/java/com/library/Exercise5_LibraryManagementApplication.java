package com.library;

import com.library.service.Exercise1_BookService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Exercise5_LibraryManagementApplication {
    public static void main(String[] args) {
        ApplicationContext context =
            new ClassPathXmlApplicationContext("Exercise5_applicationContext.xml");

        Exercise1_BookService bookService =
            context.getBean("bookService", Exercise1_BookService.class);

        System.out.println("=== Exercise 5: IoC Container ===");
        bookService.displayBook();
        System.out.println("Exercise 5 complete — IoC container loaded successfully!");
    }
}
