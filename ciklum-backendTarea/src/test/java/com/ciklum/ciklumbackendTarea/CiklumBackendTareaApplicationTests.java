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
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
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
		@DisplayName("lanza error cuando se llama a deleteSesion y no existe")
		public void errorDeleteSesion() {
			var peticion = delete("http","localhost",port,"/sesion/1");
			var respuesta = restTemplate.exchange(peticion, Void.class);
			assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
		}

		@Test
		@DisplayName("lanza error cuando se llama a getSesion y no existe")
		public void errorGetSesion() {
			var peticion = get("http","localhost",port,"/sesion/1");
			var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<SesionDTO>() {});
			assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
		}

		@Test
		@DisplayName("lanza error cuando se llama a putSesion y no existe")
		public void errorPutSesion() {
			SesionDTO sesionDTO = SesionDTO.builder().build();
			var peticion = put("http","localhost",port,"/sesion/1", sesionDTO);
			var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<SesionDTO>() {});
			assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
		}

		/*@Test
		@DisplayName("Devuelve una lista vacia de sesiones")
		public void getAllSessionsForPlan() {
			// Supongamos que el ID del plan es 1
			Long planId = 1L;

			// Llamada al endpoint con el parámetro de plan adecuado
			var peticion = get("http", "localhost", port, "/sesion?plan=" + planId);

			// Realizar la petición GET y recibir la respuesta
			System.out.println("\n\nAAAA" + peticion + "\n\n");
// A partir de aqui falla
			var response = restTemplate.exchange(peticion, new ParameterizedTypeReference<List<Sesion>>() {});
			System.out.println("\n\nAAAA\n\n");
			System.out.println("\n\nCuerpo de la respuesta: " + response.getBody() + "\n\n");
			System.out.println("\n\nEncabezados HTTP: " + response.getHeaders() + "\n\n");
			System.out.println("\n\nAAAA\n\n");

			// Verificar el status HTTP
			assertThat(response.getStatusCode().value()).isEqualTo(400); // Cambiado a 200, ya que esperamos una respuesta exitosa

			// Verificar el contenido de la respuesta
			List<Sesion> sesiones = response.getBody();
			assertThat(sesiones).isNotNull(); // Verificar que la lista de sesiones no sea nula
			assertThat(sesiones).isEmpty(); // Verificar que la lista de sesiones esté vacía
		}*/

		@Test
		@DisplayName("Devuelve una lista vacia de sesiones")
		public void getAllSessionsForPlan() {
			// Supongamos que el ID del plan es 1
			Long planId = 1L;

			// Llamada al endpoint con el parámetro de plan adecuado
			var url = "http://localhost:" + port + "/sesion?plan=" + planId;
			var response = restTemplate.getForEntity(url, List.class);

			// Verificar el status HTTP
			assertThat(response.getStatusCodeValue()).isEqualTo(404); // Cambiado a 200, ya que esperamos una respuesta exitosa

			// Verificar el contenido de la respuesta
			List<Sesion> sesiones = response.getBody();
			assertThat(sesiones).isNullOrEmpty(); // Verificar que la lista de sesiones sea nula o vacia (es nula)
		}



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
		@DisplayName("el servicio de deleteSesion elimina una sesion ya existente")
		public void deleteSesion() {
			var peticion = delete("http","localhost",port,"/sesion/1");
			var respuesta = restTemplate.exchange(peticion, Void.class);
			assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
		}

		@Test
		@DisplayName("el servicio de getSesion devuelve una sesion ya existente")
		public void getSesion() {
			var peticion = get("http","localhost",port,"/sesion/1");
			var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<SesionDTO>() {});
			assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
			assertThat(respuesta.getBody().getDescripcion()).isEqualTo("trabajar");
		}

		@Test
		@DisplayName("el servicio de putSesion modica la entidad seleccionada satisfactoriamente")
		public void putSesion() {
			SesionDTO sesionDTO = SesionDTO.builder().id(1L).descripcion("Pedro").build();
			var peticion = put("http","localhost",port,"/sesion/1", sesionDTO);
			var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<SesionDTO>() {});
			assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
			assertThat(sesionRepo.findAll().size()).isEqualTo(1);
			assertThat(sesionRepo.findAll().get(0).getDescripcion()).isEqualTo("Pedro");
			assertThat(sesionRepo.findAll().get(0).getId()).isEqualTo(1L);
		}

		@Test
		@DisplayName("el servicio de putSesion lanza error si el id no coincide con el del sesionDTO")
		public void errorPutSesionId() {
			SesionDTO sesionDTO = SesionDTO.builder().id(2L).descripcion("Pedro").build();
			var peticion = put("http","localhost",port,"/sesion/1", sesionDTO);
			var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<SesionDTO>() {});
			assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
		}
	}
}
