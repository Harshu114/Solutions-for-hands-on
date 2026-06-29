package junit_exercise;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class exercise3_AssertionsTest {

    @Test
    public void testAssertEquals() {
        assertEquals(5, 2 + 3);
    }

    @Test
    public void testAssertTrue() {
        assertTrue(5 > 3);
    }

    @Test
    public void testAssertFalse() {
        assertFalse(5 < 3);
    }

    @Test
    public void testAssertNull() {
        assertNull(null);
    }

    @Test
    public void testAssertNotNull() {
        assertNotNull(new Object());
    }

    @Test
    public void testAssertThrows() {
        Calculator calc = new Calculator();
        assertThrows(ArithmeticException.class, () -> calc.divide(10, 0));
    }

    @Test
    public void testAssertAll() {
        assertAll("group",
            () -> assertEquals(4, 2 + 2),
            () -> assertTrue(10 > 5),
            () -> assertNotNull("hello")
        );
    }
}