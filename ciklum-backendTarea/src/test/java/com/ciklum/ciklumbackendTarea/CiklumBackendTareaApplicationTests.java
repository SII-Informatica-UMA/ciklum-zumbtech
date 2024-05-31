package com.ciklum.ciklumbackendTarea;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withStatus;

import com.ciklum.ciklumbackendTarea.controllers.Mapper;
import com.ciklum.ciklumbackendTarea.dtos.*;
import com.ciklum.ciklumbackendTarea.dtos.SesionDTO;
import com.ciklum.ciklumbackendTarea.dtos.SesionNuevaDTO;
import com.ciklum.ciklumbackendTarea.entities.Sesion;
import com.ciklum.ciklumbackendTarea.repositories.SesionRepository;
import com.ciklum.ciklumbackendTarea.security.JwtUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.client.ExpectedCount;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriBuilderFactory;
import org.springframework.web.util.UriBuilder;
import org.springframework.web.util.UriBuilderFactory;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collections;
import java.util.List;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DisplayName("En el controlador de sesiones")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@ExtendWith(SpringExtension.class)
class CiklumBackendTareaApplicationTests {

	@Autowired
	private TestRestTemplate testRestTemplate;

	@Autowired
	private RestTemplate restMock;

	@Value(value="${local.server.port}")
	private int port;

	@Autowired
	private SesionRepository sesionRepo;

	@Autowired
	private JwtUtil jwtUtil;

	private String token;

	private MockRestServiceServer mockServer;

	private ObjectMapper objectMapper = new ObjectMapper();

	@BeforeEach
	public void initializeDatabase() {
		token = jwtUtil.generateToken("10");
		sesionRepo.deleteAll();
		mockServer = MockRestServiceServer.bindTo(restMock).ignoreExpectOrder(true).build();
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
				.header("Authorization", "Bearer " + token)
				.accept(MediaType.APPLICATION_JSON)
				.build();
		return peticion;
	}

	private RequestEntity<Void> delete(String scheme, String host, int port, String path) {
		URI uri = uri(scheme, host,port, path);
		var peticion = RequestEntity.delete(uri)
				.header("Authorization", "Bearer " + token)
				.build();
		return peticion;
	}

	private <T> RequestEntity<T> post(String scheme, String host, int port, String path, T object) {
		URI uri = uri(scheme, host,port, path);
		var peticion = RequestEntity.post(uri)
				.header("Authorization", "Bearer " + token)
				.contentType(MediaType.APPLICATION_JSON)
				.body(object);
		return peticion;
	}

	private <T> RequestEntity<T> put(String scheme, String host, int port, String path, T object) {
		URI uri = uri(scheme, host,port, path);
		var peticion = RequestEntity.put(uri)
				.header("Authorization", "Bearer " + token)
				.contentType(MediaType.APPLICATION_JSON)
				.body(object);
		return peticion;
	}

	// Mocks para solicitudes GET
	private void mockEntrena(Long idCliente, Long idPlan) throws JsonProcessingException, URISyntaxException {
		mockServer.expect(ExpectedCount.manyTimes(), requestTo(new URI("http://localhost:" + 8080 + "/entrena?cliente=" + idCliente)))
				.andExpect(method(HttpMethod.GET))
				.andRespond(withStatus(HttpStatus.OK)
						.contentType(MediaType.APPLICATION_JSON)
						.body(objectMapper.writeValueAsString(Collections.singletonList(
								Asociacion.builder()
										.planDTO(
												Collections.singletonList(
														PlanDTO.builder()
																.id(idPlan)
																.build()
												)
										)
										.build()
						))));
	}
	private void mockCentro(Long idCentro) throws JsonProcessingException, URISyntaxException {
		mockServer.expect(ExpectedCount.manyTimes(), requestTo(new URI("http://localhost:" + 8080 + "/centro")))
				.andExpect(method(HttpMethod.GET))
				.andRespond(withStatus(HttpStatus.OK)
						.contentType(MediaType.APPLICATION_JSON)
						.body(objectMapper.writeValueAsString(Collections.singletonList(
										CentroDTO.builder()
												.idCentro(idCentro)
												.build()
								)
						)));
	}
	private void mockCliente(Long idCentro, Long idCliente) throws JsonProcessingException, URISyntaxException {
		mockServer.expect(ExpectedCount.manyTimes(),
						requestTo(new URI("http://localhost:" + 8080 + "/cliente?centro=" + idCentro)))
				.andExpect(method(HttpMethod.GET))
				.andRespond(withStatus(HttpStatus.OK)
						.contentType(MediaType.APPLICATION_JSON)
						.body(objectMapper.writeValueAsString(Collections.singletonList(
												ClienteDTO.builder()
														.id(idCliente)
														.idUsuario(10L)
														.build()
										)
								)
						));
	}

	private void mockEntrenaListaVacia(Long idCliente, Long idPlan) throws JsonProcessingException, URISyntaxException {
		mockServer.expect(ExpectedCount.manyTimes(), requestTo(new URI("http://localhost:" + 8080 + "/entrena?cliente=" + idCliente)))
				.andExpect(method(HttpMethod.GET))
				.andRespond(withStatus(HttpStatus.OK)
						.contentType(MediaType.APPLICATION_JSON)
						.body(objectMapper.writeValueAsString(Collections.emptyList())));
	}
	private void mockClienteIdUser(Long idCentro, Long idCliente, Long idUser) throws JsonProcessingException, URISyntaxException {
		mockServer.expect(ExpectedCount.manyTimes(),
						requestTo(new URI("http://localhost:" + 8080 + "/cliente?centro=" + idCentro)))
				.andExpect(method(HttpMethod.GET))
				.andRespond(withStatus(HttpStatus.OK)
						.contentType(MediaType.APPLICATION_JSON)
						.body(objectMapper.writeValueAsString(Collections.singletonList(
												ClienteDTO.builder()
														.id(idCliente)
														.idUsuario(idUser)
														.build()
										)
								)
						));
	}
	private void mockEntrenador(Long idCentro, Long idEntrenador) throws URISyntaxException, JsonProcessingException {
		mockServer.expect(ExpectedCount.manyTimes(),
						requestTo(new URI("http://localhost:" + 8080 + "/entrenador?centro=" + idCentro)))
				.andExpect(method(HttpMethod.GET))
				.andRespond(withStatus(HttpStatus.OK)
						.contentType(MediaType.APPLICATION_JSON)
						.body(objectMapper.writeValueAsString(Collections.singletonList(
												EntrenadorDTO.builder()
														.id(idEntrenador)
														.idUsuario(10L)
														.build()
										)
								)
						));
	}
	private void mockEntrenadorIdUsuario(Long idCentro, Long idEntrenador, Long idUsuario) throws URISyntaxException, JsonProcessingException {
		mockServer.expect(ExpectedCount.manyTimes(),
						requestTo(new URI("http://localhost:" + 8080 + "/entrenador?centro=" + idCentro)))
				.andExpect(method(HttpMethod.GET))
				.andRespond(withStatus(HttpStatus.OK)
						.contentType(MediaType.APPLICATION_JSON)
						.body(objectMapper.writeValueAsString(Collections.singletonList(
												EntrenadorDTO.builder()
														.id(idEntrenador)
														.idUsuario(idUsuario)
														.build()
										)
								)
						));
	}

	@Nested
	@DisplayName("cuando la base de datos esta vacia")
	public class BaseDatosVacia {

		@Test
		@DisplayName("lanza error cuando se llama a deleteSesion y no existe")
		public void errorDeleteSesion() throws URISyntaxException, JsonProcessingException {
			mockCentro(3L);
			mockCliente(3L, 1L);
			var peticion = delete("http","localhost",port,"/sesion/1");
			var url = "http://localhost:" + port + "/sesion/1";
			var respuesta = testRestTemplate.exchange(url, HttpMethod.DELETE, peticion, Void.class);
			assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
		}

		@Test
		@DisplayName("lanza error cuando se llama a getSesion y no existe")
		public void errorGetSesion() throws URISyntaxException, JsonProcessingException {
			// Identificadores
			Long idCentro = 3L;
			Long idCliente = 1L;
			Long idSesion = 1L;

			mockCentro(idCentro);
			mockClienteIdUser(idCentro, idCliente,11L);
			mockEntrenadorIdUsuario(idCentro,5L,12L);

			// Peticion al microservicio
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", "Bearer " + token);
			HttpEntity<?> requestEntity = new HttpEntity<>(headers);
			var urlSolicitud = "http://localhost:" + port + "/sesion/" + idSesion;
			var respuesta = testRestTemplate.exchange(urlSolicitud, HttpMethod.GET, requestEntity, new ParameterizedTypeReference<Sesion>() {});

			assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
		}
/*
		@Test
		@DisplayName("lanza error cuando se llama a putSesion y no existe")
		public void errorPutSesion() {
			SesionDTO sesionDTO = SesionDTO.builder().build();
			var peticion = put("http","localhost",port,"/sesion/1", sesionDTO);
			var respuesta = testRestTemplate.exchange(peticion, new ParameterizedTypeReference<SesionDTO>() {});
			assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
		}^*/

		@Test
		@DisplayName("devuelve error cuando se intenta sacar la lista de sesiones de un plan no existente o no asociado a un cliente")
		public void errorGetAllSessionsForPlan() throws URISyntaxException, JsonProcessingException {
			// Identificadores
			Long idCentro = 3L;
			Long idCliente = 1L;
			Long idPlan = 2L;

			Sesion s1 = Sesion.builder().id(2L).descripcion("sesion1").idPlan(idPlan).build();
			sesionRepo.save(s1);

			mockEntrena(idCliente, idPlan);
			mockCentro(idCentro);
			mockClienteIdUser(idCentro, idCliente,11L);
			mockEntrenadorIdUsuario(idCentro,5L,12L);

			// Peticion al microservicio
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", "Bearer " + token);
			HttpEntity<?> requestEntity = new HttpEntity<>(headers);
			var urlSolicitud = "http://localhost:" + port + "/sesion?plan=" + idPlan;
			var respuesta = testRestTemplate.exchange(urlSolicitud, HttpMethod.GET, requestEntity, new ParameterizedTypeReference<List<Sesion>>() {});

			assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
			/*assertThat(respuesta.getBody().size()).isEqualTo(1);
			assertThat(respuesta.getBody().get(0).getId()).isEqualTo(s1.getId());
			assertThat(respuesta.getBody().get(0).getDescripcion()).isEqualTo(s1.getDescripcion());*/
		}

		/*@Test
		@DisplayName("devuelve error cuando se intenta insertar sesion a plan no existente")
		public void errorPostSesionForPlan() {
			SesionNuevaDTO sesionNuevaDTO = SesionNuevaDTO.builder().descripcion("trabajar").build();
			var url = "http://localhost:" + port + "/sesion?plan=1";
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", "Bearer " + token);
			HttpEntity<?> requestEntity = new HttpEntity<>(sesionNuevaDTO, headers);
			var response = testRestTemplate.exchange(url, HttpMethod.POST, requestEntity,new ParameterizedTypeReference<List<Sesion>>(){});
			assertThat(response.getStatusCodeValue()).isEqualTo(404);
		}*/
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
		public void deleteSesion() throws URISyntaxException, JsonProcessingException {
			mockCentro(3L);
			mockCliente(3L, 1L);
			var peticion = delete("http","localhost",port,"/sesion/1");
			var respuesta = testRestTemplate.exchange(peticion, Void.class);
			assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
		}


		@Test
		@DisplayName("el servicio de getSesion devuelve una sesion ya existente")
		public void getSesion() throws URISyntaxException, JsonProcessingException {
			mockCentro(3L);
			mockCliente(3L, 1L);
			mockEntrenador(3L, 1L);
			var peticion = get("http","localhost",port,"/sesion/1");
			var respuesta = testRestTemplate.exchange(peticion, new ParameterizedTypeReference<SesionDTO>() {});
			assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
			assertThat(respuesta.getBody().getDescripcion()).isEqualTo("trabajar");
		}


		@Test
		@DisplayName("el servicio de putSesion modica la entidad seleccionada satisfactoriamente")
		public void putSesion() throws URISyntaxException, JsonProcessingException {
			mockCentro(3L);
			mockCliente(3L, 1L);
			SesionDTO sesionDTO = SesionDTO.builder().id(1L).descripcion("Pedro").build();
			var peticion = put("http","localhost",port,"/sesion/1", sesionDTO);
			var respuesta = testRestTemplate.exchange(peticion, new ParameterizedTypeReference<SesionDTO>() {});
			assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
			assertThat(sesionRepo.findAll().size()).isEqualTo(1);
			assertThat(sesionRepo.findAll().get(0).getDescripcion()).isEqualTo("Pedro");
			assertThat(sesionRepo.findAll().get(0).getId()).isEqualTo(1L);
		}


		@Test
		@DisplayName("el servicio de putSesion lanza error si el id no coincide con el del sesionDTO")
		public void errorPutSesionId() throws URISyntaxException, JsonProcessingException {
			mockCentro(3L);
			mockCliente(3L, 1L);
			SesionDTO sesionDTO = SesionDTO.builder().id(2L).descripcion("Pedro").build();
			var peticion = put("http","localhost",port,"/sesion/1", sesionDTO);
			var respuesta = testRestTemplate.exchange(peticion, new ParameterizedTypeReference<SesionDTO>() {});
			assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
		}

		@Test
		@DisplayName("el servicio getAllSesiones muestra todas las sesiones de un plan")
		public void getAllSesiones() throws URISyntaxException, JsonProcessingException {
			// Identificadores
			Long idCentro = 3L;
			Long idCliente = 1L;
			Long idPlan = 2L;

			Sesion s1 = Sesion.builder().id(2L).descripcion("sesion1").idPlan(idPlan).build();
			sesionRepo.save(s1);

			mockEntrena(idCliente, idPlan);
			mockCentro(idCentro);
			mockCliente(idCentro, idCliente);

			// Peticion al microservicio
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", "Bearer " + token);
			HttpEntity<?> requestEntity = new HttpEntity<>(headers);
			var urlSolicitud = "http://localhost:" + port + "/sesion?plan=" + idPlan;
			var respuesta = testRestTemplate.exchange(urlSolicitud, HttpMethod.GET, requestEntity, new ParameterizedTypeReference<List<Sesion>>() {});

			assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
			assertThat(respuesta.getBody().size()).isEqualTo(1);
			assertThat(respuesta.getBody().get(0).getId()).isEqualTo(s1.getId());
			assertThat(respuesta.getBody().get(0).getDescripcion()).isEqualTo(s1.getDescripcion());
		}

		@Test
		@DisplayName("el servicio getAllSesiones muestra todas las sesiones de un plan")
		public void getAllSesionesErrorAsociacion() throws URISyntaxException, JsonProcessingException {
			// Identificadores
			Long idCentro = 3L;
			Long idCliente = 1L;
			Long idPlan = 2L;

			Sesion s1 = Sesion.builder().id(2L).descripcion("sesion1").idPlan(idPlan).build();
			sesionRepo.save(s1);

			mockEntrena(idCliente, 5L);
			mockCentro(idCentro);
			mockCliente(idCentro, idCliente);

			// Peticion al microservicio
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", "Bearer " + token);
			HttpEntity<?> requestEntity = new HttpEntity<>(headers);
			var urlSolicitud = "http://localhost:" + port + "/sesion?plan=" + idPlan;
			var respuesta = testRestTemplate.exchange(urlSolicitud, HttpMethod.GET, requestEntity, new ParameterizedTypeReference<List<Sesion>>() {});

			assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
		}

		@Test
		@DisplayName("el servicio getAllSesiones muestra error al no encontrar asociacion cliente entrenador")
		public void getAllSesionesErrorAsociacion2() throws URISyntaxException, JsonProcessingException {
			// Identificadores
			Long idCentro = 3L;
			Long idCliente = 1L;
			Long idPlan = 2L;

			Sesion s1 = Sesion.builder().id(2L).descripcion("sesion1").idPlan(idPlan).build();
			sesionRepo.save(s1);

			mockEntrenaListaVacia(idCliente, idPlan);
			mockCentro(idCentro);
			mockCliente(idCentro, idCliente);

			// Peticion al microservicio
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", "Bearer " + token);
			HttpEntity<?> requestEntity = new HttpEntity<>(headers);
			var urlSolicitud = "http://localhost:" + port + "/sesion?plan=" + idPlan;
			var respuesta = testRestTemplate.exchange(urlSolicitud, HttpMethod.GET, requestEntity, new ParameterizedTypeReference<List<Sesion>>() {});

			assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
		}

		@Test
		@DisplayName("el servicio postSesion inserta una nueva sesion en un plan")
		public void postSesion() throws URISyntaxException, JsonProcessingException {
			SesionNuevaDTO s1 = SesionNuevaDTO.builder().descripcion("sesion5").idPlan(2L).build();
			Long idCentro = 3L;
			Long idCliente = 1L;
			Long idPlan = 2L;

			mockEntrena(idCliente, idPlan);
			mockCentro(idCentro);
			mockCliente(idCentro, idCliente);

			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", "Bearer " + token);
			HttpEntity<?> requestEntity = new HttpEntity<>(s1, headers);
			var urlSolicitud = "http://localhost:" + port + "/sesion?plan=" + idPlan;
			var respuesta = testRestTemplate.exchange(urlSolicitud, HttpMethod.POST, requestEntity, new ParameterizedTypeReference<SesionNuevaDTO>() {});


			assertThat(respuesta.getStatusCode().value()).isEqualTo(200);

			Sesion sesionRespuesta = Mapper.SesionNuevaDTOtoSesion(respuesta.getBody());
			assertThat(sesionRepo.findAll().size()).isEqualTo(2);
			assertThat(sesionRespuesta.getIdPlan()).isEqualTo(s1.getIdPlan());
			assertThat(sesionRespuesta.getDescripcion()).isEqualTo(s1.getDescripcion());
		}
	}
}
