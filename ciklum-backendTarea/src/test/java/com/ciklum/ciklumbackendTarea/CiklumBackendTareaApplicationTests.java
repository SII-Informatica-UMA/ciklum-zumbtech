package com.ciklum.ciklumbackendTarea;

import static org.assertj.core.api.Assertions.as;
import static org.assertj.core.api.Assertions.assertThat;

import com.ciklum.ciklumbackendTarea.controllers.ControladorSesion;
import com.ciklum.ciklumbackendTarea.dtos.*;
import com.ciklum.ciklumbackendTarea.dtos.SesionDTO;
import com.ciklum.ciklumbackendTarea.dtos.SesionNuevaDTO;
import com.ciklum.ciklumbackendTarea.entities.Sesion;
import com.ciklum.ciklumbackendTarea.exceptions.PlanNoEncontradoException;
import com.ciklum.ciklumbackendTarea.repositories.SesionRepository;
import com.ciklum.ciklumbackendTarea.services.LogicSesion;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriBuilderFactory;
import org.springframework.web.util.UriBuilder;
import org.springframework.web.util.UriBuilderFactory;

import java.net.URI;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DisplayName("En el controlador de sesiones")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@ExtendWith(MockitoExtension.class)
class CiklumBackendTareaApplicationTests {

	@Autowired
	private TestRestTemplate restTemplate;

	@Mock
	private RestTemplate restMock;

	@Value(value="${local.server.port}")
	private int port;

	@Autowired
	private SesionRepository sesionRepo;

	@InjectMocks
	private LogicSesion sesionService;
	@InjectMocks
	private ControladorSesion controlador;

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
	public URI uriQuery(String scheme, String host, int port, String query, String ...paths) {
		UriBuilderFactory ubf = new DefaultUriBuilderFactory();
		UriBuilder ub = ubf.builder()
				.scheme(scheme)
				.host(host).port(port);
		for (String path: paths) {
			ub = ub.path(path);
		}
		ub = ub.query("plan=1");
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

		@Test
		@DisplayName("devuelve error cuando se intenta sacar la lista de sesiones de un plan no existente")
		public void errorGetAllSessionsForPlan() {
			var urlS = "http://localhost:" + port + "/sesion?plan=1";
			var response = restTemplate.getForEntity(urlS, Sesion[].class);
			assertThat(response.getStatusCodeValue()).isEqualTo(404);

			Sesion s1 = Sesion.builder().id(2L).descripcion("sesion1").idPlan(2L).build();
			sesionRepo.save(s1);

			sesionService = new LogicSesion(sesionRepo,restMock);

			var url = "http://localhost:8080/entrena?cliente=1";
			Mockito.when(restMock.getForEntity(url, Asociacion[].class)).thenReturn(new ResponseEntity<>(
					new Asociacion[]{
							Asociacion.builder()
									.planDTO(
											Collections.singletonList(
													PlanDTO.builder()
															.id(3L)
															.build()
											)
									)
									.build()
					},
					HttpStatus.OK)
			);
			try {
				sesionService.getAllSesions(2L);
				assertThat(false).isTrue();
			}
			catch(PlanNoEncontradoException e) {

			}
		}

		@Test
		@DisplayName("devuelve error cuando se intenta insertar sesion a plan no existente")
		public void errorPostSesionForPlan() {
			SesionNuevaDTO sesionNuevaDTO = SesionNuevaDTO.builder().descripcion("trabajar").build();
			var url = "http://localhost:" + port + "/sesion?plan=1";
			var response = restTemplate.postForEntity(url, sesionNuevaDTO, Sesion.class);
			assertThat(response.getStatusCodeValue()).isEqualTo(404);
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

		@Test
		@DisplayName("el servicio getAllSesiones muestra todas las sesiones de un plan")
		public void getAllSesiones() {

			Sesion s1 = Sesion.builder().id(2L).descripcion("sesion1").idPlan(2L).build();
			sesionRepo.save(s1);

			sesionService = new LogicSesion(sesionRepo,restMock);
			controlador = new ControladorSesion(sesionService);

			var url = "http://localhost:8080/entrena?cliente=1";
			Mockito.when(restMock.getForEntity(url, Asociacion[].class)).thenReturn(new ResponseEntity<>(
					new Asociacion[]{
							Asociacion.builder()
									.planDTO(
											Collections.singletonList(
													PlanDTO.builder()
															.id(2L)
															.build()
											)
									)
									.build()
					},
					HttpStatus.OK)
			);

			var respuesta = controlador.getAllSesions(2L);

			assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
			assertThat(respuesta.getBody().size()).isEqualTo(1);
			assertThat(respuesta.getBody().get(0).getId()).isEqualTo(s1.getId());
			assertThat(respuesta.getBody().get(0).getDescripcion()).isEqualTo(s1.getDescripcion());
		}

	}
}
