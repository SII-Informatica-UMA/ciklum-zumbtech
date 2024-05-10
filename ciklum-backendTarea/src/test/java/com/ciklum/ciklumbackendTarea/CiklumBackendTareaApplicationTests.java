package com.ciklum.ciklumbackendTarea;

import static org.assertj.core.api.Assertions.assertThat;

import com.ciklum.ciklumbackendTarea.dtos.SesionDTO;
import com.ciklum.ciklumbackendTarea.entities.Sesion;
import com.ciklum.ciklumbackendTarea.repositories.SesionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.web.util.DefaultUriBuilderFactory;
import org.springframework.web.util.UriBuilder;
import org.springframework.web.util.UriBuilderFactory;

import java.net.URI;
import java.util.List;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DisplayName("En el controlador de sesiones")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class CiklumBackendTareaApplicationTests {

	@Autowired
	private TestRestTemplate restTemplate;

	@Value(value="${local.server.port}")
	private int port;

	@Autowired
	private SesionRepository sesionRepo;

	@BeforeEach
	public void initializeDatabase() {
		sesionRepo.deleteAll();
	}

	private URI uri(String scheme, String host, int port, String ...paths) {
		UriBuilderFactory ubf = new DefaultUriBuilderFactory();
		UriBuilder ub = ubf.builder()
				.scheme(scheme)
				.host(host).port(port);
		for (String path: paths) {
			ub = ub.path(path);
		}
		return ub.build();
	}

	private RequestEntity<Void> get(String scheme, String host, int port, String path) {
		URI uri = uri(scheme, host,port, path);
		var peticion = RequestEntity.get(uri)
				.accept(MediaType.APPLICATION_JSON)
				.build();
		return peticion;
	}

	private RequestEntity<Void> delete(String scheme, String host, int port, String path) {
		URI uri = uri(scheme, host,port, path);
		var peticion = RequestEntity.delete(uri)
				.build();
		return peticion;
	}

	private <T> RequestEntity<T> post(String scheme, String host, int port, String path, T object) {
		URI uri = uri(scheme, host,port, path);
		var peticion = RequestEntity.post(uri)
				.contentType(MediaType.APPLICATION_JSON)
				.body(object);
		return peticion;
	}

	private <T> RequestEntity<T> put(String scheme, String host, int port, String path, T object) {
		URI uri = uri(scheme, host,port, path);
		var peticion = RequestEntity.put(uri)
				.contentType(MediaType.APPLICATION_JSON)
				.body(object);
		return peticion;
	}

	@Nested
	@DisplayName("cuando la base de datos esta vacia")
	public class BaseDatosVacia {

		@Test
		@DisplayName("lanza error cuando elimina una sesion concreta")
		public void errorConSesionConcreta() {
			var peticion = delete("http","localhost",port,"/sesion/1");
			var respuesta = restTemplate.exchange(peticion, Void.class);
			assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
		}

		/*@Test
		@DisplayName("lanza error cuando la lista de sesiones asociada a un plan esta vacia")
		public void errorGetAllSessions() {
			var peticion = get("http","localhost",port,"/sesion");
			var respuesta = restTemplate.exchange(peticion, Void.class);
			assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
		}*/

		//		@Test
//		@DisplayName("Devuelve una lista vacia de sesiones")
//		public void getAllSessionsForPlan() {
//			// Supongamos que el ID del plan es 1
//			Long planId = 1L;
//
//			// Llamada al endpoint con el parámetro de plan adecuado
//			/*ResponseEntity<List<Sesion>> response = restTemplate.exchange(
//					"/sesion?plan=" + planId,
//					HttpMethod.GET,
//					null,
//					new ParameterizedTypeReference<List<Sesion>>() {}
//			);*/
//
//			var peticion = get("http", "localhost", port, "/sesion");
//
//			var response = restTemplate.exchange(peticion,
//					new ParameterizedTypeReference<List<Sesion>>() {}
//			);
//
//			// Verificar el status HTTP
//			assertThat(response.getStatusCode().value()).isEqualTo(404);
//
//			// Verificar el contenido de la respuesta
//			List<Sesion> sesiones = response.getBody();
//			assertThat(sesionRepo.findAllByPlanId(planId)).isNullOrEmpty();
//		}
	}

	@Nested
	@DisplayName("cuando la base de datos esta llena")
	public class BaseDatosLlena {

		@BeforeEach
		public void insertarDatos() {
			Sesion sesion = Sesion.builder().descripcion("trabajar").build();
			sesionRepo.save(sesion);
		}

		@Test
		@DisplayName("el servicio de getSesion devuelve una sesion ya existente")
		public void getSesion() {
			var peticion = get("http","localhost",port,"/sesion/1");
			var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<SesionDTO>() {});
			assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
			assertThat(respuesta.getBody().getDescripcion().equals("trabajar"));
		}

		@Test
		@DisplayName("el servicio de deleteSesion elimina una sesion ya existente")
		public void deleteSesion() {
			var peticion = delete("http","localhost",port,"/sesion/1");
			var respuesta = restTemplate.exchange(peticion, Void.class);
			assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
		}
	}
}
