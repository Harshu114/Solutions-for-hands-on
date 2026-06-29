package junit_exercise;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class exercise1_2_MyServiceTest {

    @Test
    public void testExternalApi() {
        // ARRANGE
        ExternalApi mockApi = Mockito.mock(ExternalApi.class);
        when(mockApi.getData()).thenReturn("Mock Data");

        // ACT
        MyService service = new MyService(mockApi);
        String result = service.fetchData();

        // ASSERT
        assertEquals("Mock Data", result);
    }

    @Test
    public void testVerifyInteraction() {
        // ARRANGE
        ExternalApi mockApi = Mockito.mock(ExternalApi.class);
        when(mockApi.getData()).thenReturn("Mock Data");
        MyService service = new MyService(mockApi);

        // ACT
        service.fetchData();

        // ASSERT — was getData() actually called once?
        verify(mockApi, times(1)).getData();
    }

    @Test
    public void testVerifyNeverCalled() {
        ExternalApi mockApi = Mockito.mock(ExternalApi.class);

        // getData() is never called — verify it stays that way
        verify(mockApi, never()).getData();
    }
}