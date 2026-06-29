package com.library;

import com.library.service.Exercise1_BookService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Exercise8_LibraryManagementApplication {
    public static void main(String[] args) {
        ApplicationContext context =
            new ClassPathXmlApplicationContext("exercise8_applicationContext.xml");

        Exercise1_BookService bookService =
            context.getBean("bookService", Exercise1_BookService.class);

        bookService.displayBook();
        System.out.println("Exercise 8 complete — check Before/After AOP logs!");
    }
}
