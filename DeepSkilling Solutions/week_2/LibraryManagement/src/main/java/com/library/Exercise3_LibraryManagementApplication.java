package com.library;

import com.library.service.Exercise1_BookService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Exercise3_LibraryManagementApplication {
    public static void main(String[] args) {
        ApplicationContext context =
            new ClassPathXmlApplicationContext("exercise3_applicationContext.xml");

        Exercise1_BookService bookService =
            context.getBean("bookService", Exercise1_BookService.class);

        // This call will be intercepted by the LoggingAspect
        bookService.displayBook();

        System.out.println("Exercise 3 complete — check AOP logs above!");
    }
}
