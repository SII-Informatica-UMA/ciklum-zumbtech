package com.ciklum.ciklumbackendTarea.services;

import com.ciklum.ciklumbackendTarea.controllers.Mapper;
import com.ciklum.ciklumbackendTarea.dtos.*;
import com.ciklum.ciklumbackendTarea.entities.Sesion;
import com.ciklum.ciklumbackendTarea.exceptions.PlanNoEncontradoException;
import com.ciklum.ciklumbackendTarea.exceptions.SesionNoEncontradaException;
import com.ciklum.ciklumbackendTarea.repositories.SesionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
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

    public LogicSesion(SesionRepository repo, RestTemplate rest) {
        this.sesionRepo = repo;
        this.restTemplate = rest;
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
        Long idCliente = comprobarClienteExiste(1L);
        comprobarAsociacionEntrenadorCliente(idCliente, idPlan);
        List<Sesion> sesiones = sesionRepo.findAllByPlanId(idPlan);
        return Optional.of(sesiones);
    }

    public Optional<SesionNuevaDTO> postSesion(Long idPlan, SesionNuevaDTO SesionNuevaDTO) {
        Long idCliente = comprobarClienteExiste(1L);
        comprobarAsociacionEntrenadorCliente(idCliente, idPlan);
        Sesion sesion = sesionRepo.save(Mapper.SesionNuevaDTOtoSesion(SesionNuevaDTO));
        return Optional.of(Mapper.toSesionNuevaDTO(sesion));
    }

    private void comprobarAsociacionEntrenadorCliente(Long idCliente, Long idPlan) {
        var url = "http://localhost:" + "8080" + "/entrena?cliente=" + idCliente;
        var respuesta = restTemplate.getForEntity(url, Asociacion[].class);
        var valorRespuesta = respuesta.getBody();
        if(valorRespuesta.length != 1) {
            throw new PlanNoEncontradoException();
        }
        for(PlanDTO plan : valorRespuesta[0].getPlanDTO()) {
            if(plan.getId() == idPlan) {
                return;
            }
        }
        throw new PlanNoEncontradoException();
    }

    private Long comprobarClienteExiste(Long idUsuario) {
        return idUsuario;
    }
}
