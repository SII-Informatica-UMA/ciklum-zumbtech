package com.ciklum.ciklumbackendTarea;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@DisplayName("Test para servicios")
class CiklumBackendTareaApplicationTests {

	@Test
	void contextLoads() {
	}

	@Nested
	@DisplayName("Cuando la base de datos está vacía")
	public class BaseDatosVacia {

		@Test // Delete - sesion
		@DisplayName("Lanza error cuando elimina una sesion concreta")
		public void errorConSesionConcreta() {
		}

	}

	@Nested
	@DisplayName("Cuando la base de datos está llena")
	public class BaseDatosLlena {

		@BeforeEach
		public void introduceDatos() {

		}


	}

}
