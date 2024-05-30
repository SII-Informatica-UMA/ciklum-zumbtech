package com.ciklum.ciklumbackendTarea.services;

import com.ciklum.ciklumbackendTarea.controllers.Mapper;
import com.ciklum.ciklumbackendTarea.dtos.*;
import com.ciklum.ciklumbackendTarea.entities.Sesion;
import com.ciklum.ciklumbackendTarea.exceptions.PlanNoEncontradoException;
import com.ciklum.ciklumbackendTarea.exceptions.SesionNoEncontradaException;
import com.ciklum.ciklumbackendTarea.repositories.SesionRepository;
import com.ciklum.ciklumbackendTarea.security.JwtUtil;
import com.ciklum.ciklumbackendTarea.security.SecurityConfguration;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class LogicSesion {
    private SesionRepository sesionRepo;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    public LogicSesion(SesionRepository repo) {
        this.sesionRepo = repo;
    }

    public LogicSesion(SesionRepository repo, RestTemplate rest) {
        this.sesionRepo = repo;
        this.restTemplate = rest;
    }

    public Optional<SesionDTO> getSesion(Long id) {
        try {
            comprobarClienteExiste();
        } catch (PlanNoEncontradoException e) {
            comprobarEntrenadorExiste();
        }
        if(!sesionRepo.existsById(id)) throw new SesionNoEncontradaException();
        Sesion sesion = sesionRepo.findById(id).get();
        return Optional.of(Mapper.toSesionDTO(sesion));
    }

    public Optional<SesionNuevaDTO> putSesion(Long idSesion, SesionDTO sesionDTO) {
        comprobarClienteExiste();
        if(sesionDTO.getId() != idSesion || !sesionRepo.existsById(idSesion)) throw new SesionNoEncontradaException();
        Sesion sesion = sesionRepo.save(Mapper.toSesion(sesionDTO));
        return Optional.of(Mapper.toSesionNuevaDTO(sesion));
    }

    public void deleteSesion(Long id) {
        comprobarClienteExiste();
        if(!sesionRepo.existsById(id)) throw new SesionNoEncontradaException();
        sesionRepo.deleteById(id);
    }

    public Optional<List<Sesion>> getAllSesions(Long idPlan) {
        Long idCliente = null;
        try {
            idCliente = comprobarClienteExiste();
        } catch(PlanNoEncontradoException e) {
            idCliente = comprobarEntrenadorExiste();
        }
        comprobarAsociacionEntrenadorCliente(idCliente, idPlan);
        List<Sesion> sesiones = sesionRepo.findAllByPlanId(idPlan);
        return Optional.of(sesiones);
    }

    public Optional<SesionNuevaDTO> postSesion(Long idPlan, SesionNuevaDTO SesionNuevaDTO) {
        Long idCliente = comprobarClienteExiste();
        comprobarAsociacionEntrenadorCliente(idCliente, idPlan);
        Sesion sesion = sesionRepo.save(Mapper.SesionNuevaDTOtoSesion(SesionNuevaDTO));
        return Optional.of(Mapper.toSesionNuevaDTO(sesion));
    }

    private void comprobarAsociacionEntrenadorCliente(Long idCliente, Long idPlan) {
        Long userId = Long.parseLong(SecurityConfguration.getAuthenticatedUser().get().getUsername());
        String token = jwtUtil.generateToken(userId + "");

        var url = "http://localhost:" + "8080" + "/entrena?cliente=" + idCliente;
        HttpHeaders headers = new HttpHeaders();

        headers.set("Authorization", "Bearer " + token);
        HttpEntity<?> requestEntity = new HttpEntity<>(headers);
        var respuesta = restTemplate.exchange(url, HttpMethod.GET, requestEntity,new ParameterizedTypeReference<List<Asociacion>>(){});

        var valorRespuesta = respuesta.getBody();
        if(valorRespuesta.size() == 1) {
            for(PlanDTO plan : valorRespuesta.get(0).getPlanDTO()) {
                if(plan.getId() == idPlan) {
                    return;
                }
            }
        }
        throw new PlanNoEncontradoException();
    }

    private Long comprobarEntrenadorExiste() {
        Long userId = Long.parseLong(SecurityConfguration.getAuthenticatedUser().get().getUsername());
        String token = jwtUtil.generateToken(userId + "");

        List<CentroDTO> centros = getAllCentros(token);
        for(CentroDTO centro : centros) {
            List<EntrenadorDTO> entrenadores = getAllEntrenadoresInCentro(centro.getIdCentro(), token);
            for(EntrenadorDTO entrenador : entrenadores) {
                if(entrenador.getIdUsuario() == userId) {
                    return entrenador.getId();
                }
            }
        }
        throw new PlanNoEncontradoException();
    }

    private Long comprobarClienteExiste() {

        Long userId = Long.parseLong(SecurityConfguration.getAuthenticatedUser().get().getUsername());
        String token = jwtUtil.generateToken(userId + "");

        List<CentroDTO> centros = getAllCentros(token);

        for(CentroDTO centro : centros) {
            List<ClienteDTO> clientes = getAllClientsInCentro(centro.getIdCentro(), token);
            for(ClienteDTO client : clientes) {
                if(client.getIdUsuario() == userId) {
                    return client.getId();
                }
            }
        }
        throw new PlanNoEncontradoException();
    }

    private List<CentroDTO> getAllCentros(String token) {
        var url = "http://localhost:" + 8080 + "/centro";
        HttpHeaders headers = new HttpHeaders();

        headers.set("Authorization", "Bearer " + token);
        HttpEntity<?> requestEntity = new HttpEntity<>(headers);
        var response = restTemplate.exchange(url, HttpMethod.GET, requestEntity,new ParameterizedTypeReference<List<CentroDTO>>(){});
        return response.getBody();
    }

    private List<ClienteDTO> getAllClientsInCentro(Long centroId, String token) {
        var url = "http://localhost:" + 8080 + "/cliente?centro=" + centroId;
        HttpHeaders headers = new HttpHeaders();

        headers.set("Authorization", "Bearer " + token);
        HttpEntity<?> requestEntity = new HttpEntity<>(headers);
        var response = restTemplate.exchange(url, HttpMethod.GET, requestEntity,new ParameterizedTypeReference<List<ClienteDTO>>(){});
        return response.getBody();
    }

    private List<EntrenadorDTO> getAllEntrenadoresInCentro(Long centroId, String token) {
        var url = "http://localhost:" + 8080 + "/entrenador?centro=" + centroId;
        HttpHeaders headers = new HttpHeaders();

        headers.set("Authorization", "Bearer " + token);
        HttpEntity<?> requestEntity = new HttpEntity<>(headers);
        var response = restTemplate.exchange(url, HttpMethod.GET, requestEntity,new ParameterizedTypeReference<List<EntrenadorDTO>>(){});
        return response.getBody();
    }
}
