package hello;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
public class HelloTest {

    @Test
    public void testSomething() {
        assertEquals(true, true);
    }

    @Test
    public void testSomethingElse() {
        assertEquals(false, false);
    }

    @Test
    public void forRealTest() {
        assertEquals(3, 4);
    }

}
