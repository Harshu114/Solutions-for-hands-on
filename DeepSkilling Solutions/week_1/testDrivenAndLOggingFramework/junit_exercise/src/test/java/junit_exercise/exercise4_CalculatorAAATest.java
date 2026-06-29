package junit_exercise;

import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

public class exercise4_CalculatorAAATest {

    private Calculator calculator;

    @BeforeAll
    public static void initAll() {
        System.out.println("=== Before ALL tests ===");
    }

    @BeforeEach
    public void setUp() {
        System.out.println("-- Setting up --");
        calculator = new Calculator();
    }

    @AfterEach
    public void tearDown() {
        System.out.println("-- Tearing down --");
        calculator = null;
    }

    @AfterAll
    public static void tearDownAll() {
        System.out.println("=== After ALL tests ===");
    }

    @Test
    public void testAdd() {
        // ARRANGE
        int a = 3, b = 4;

        // ACT
        int result = calculator.add(a, b);

        // ASSERT
        assertEquals(7, result);
    }

    @Test
    public void testSubtract() {
        // ARRANGE
        int a = 10, b = 4;

        // ACT
        int result = calculator.subtract(a, b);

        // ASSERT
        assertEquals(6, result);
    }

    @Test
    public void testDivideByZero() {
        assertThrows(ArithmeticException.class,
            () -> calculator.divide(10, 0));
    }
}