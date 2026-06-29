package com.library;

import com.library.service.Exercise6_BookService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Exercise6_LibraryManagementApplication {
    public static void main(String[] args) {
        ApplicationContext context =
            new ClassPathXmlApplicationContext("exercise6_applicationContext.xml");

        Exercise6_BookService bookService =
            context.getBean(Exercise6_BookService.class);

        bookService.displayBook();
        System.out.println("Exercise 6 complete — Annotation based config works!");
    }
}
