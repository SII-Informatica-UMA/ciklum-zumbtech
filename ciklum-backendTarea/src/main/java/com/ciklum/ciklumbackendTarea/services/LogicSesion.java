package com.ciklum.ciklumbackendTarea.services;

import com.ciklum.ciklumbackendTarea.controllers.Mapper;
import com.ciklum.ciklumbackendTarea.dtos.Asociacion;
import com.ciklum.ciklumbackendTarea.dtos.SesionDTO;
import com.ciklum.ciklumbackendTarea.dtos.SesionNuevaDTO;
import com.ciklum.ciklumbackendTarea.entities.Sesion;
import com.ciklum.ciklumbackendTarea.exceptions.PlanNoEncontradoException;
import com.ciklum.ciklumbackendTarea.exceptions.SesionNoEncontradaException;
import com.ciklum.ciklumbackendTarea.repositories.SesionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
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
    public LogicSesion(SesionRepository repo) {
        this.sesionRepo = repo;
    }

    public Optional<SesionDTO> getSesion(Long id) {
        if(!sesionRepo.existsById(id)) throw new SesionNoEncontradaException();
        Sesion sesion = sesionRepo.findById(id).get();
        return Optional.of(Mapper.toSesionDTO(sesion));
    }

    public Optional<SesionNuevaDTO> putSesion(Long idSesion, SesionDTO sesionDTO) {
        if(sesionDTO.getId() != idSesion || !sesionRepo.existsById(idSesion)) throw new SesionNoEncontradaException();
        Sesion sesion = sesionRepo.save(Mapper.toSesion(sesionDTO));
        return Optional.of(Mapper.toSesionNuevaDTO(sesion));
    }

    public void deleteSesion(Long id) {
        if(!sesionRepo.existsById(id)) throw new SesionNoEncontradaException();
        sesionRepo.deleteById(id);
    }

    public Optional<List<Sesion>> getAllSesions(Long idPlan) {
        comprobarPlanExiste(idPlan);
        List<Sesion> sesiones = sesionRepo.findAllByPlanId(idPlan);
        return Optional.of(sesiones);
    }

    public Optional<SesionNuevaDTO> postSesion(Long idPlan, SesionNuevaDTO SesionNuevaDTO) {
        Long idCliente = comprobarClienteExiste(1L);
        comprobarAsociacionEntrenadorCliente(idCliente);
        comprobarPlanExiste(idPlan);
        Sesion sesion = sesionRepo.save(Mapper.SesionNuevaDTOtoSesion(SesionNuevaDTO));
        return Optional.of(Mapper.toSesionNuevaDTO(sesion));
    }

    private void comprobarAsociacionEntrenadorCliente(Long idCliente) {
        try {
            var url = "http://localhost:" + "8080" + "/entrena?cliente=" + idCliente;
            var respuesta = restTemplate.getForEntity(url, Void.class);
            // Comprobar que la respuesta es una lista de asociaciones de tamaño 1 y
            // que contiene un plan con el idPlan que se quiere
        }
        catch(Exception e) {
            if(e.getMessage().equals("404 : [no body]")) {
                throw new PlanNoEncontradoException();
            }
            else {
                throw e;
            }
        }
    }

    private Long comprobarClienteExiste(Long idUsuario) {
        return idUsuario;
    }

    private void comprobarPlanExiste(Long idPlan) {
        try {
            var url = "http://localhost:" + "8080" + "/plan/" + idPlan;
            restTemplate.getForEntity(url, Void.class);
        }
        catch(Exception e) {
            if(e.getMessage().equals("404 : [no body]")) {
                throw new PlanNoEncontradoException();
            }
            else {
                throw e;
            }
        }
    }
}
