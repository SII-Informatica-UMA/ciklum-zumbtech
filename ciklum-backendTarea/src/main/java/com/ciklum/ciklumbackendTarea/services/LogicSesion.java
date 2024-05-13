package com.ciklum.ciklumbackendTarea.services;

import com.ciklum.ciklumbackendTarea.controllers.Mapper;
import com.ciklum.ciklumbackendTarea.dtos.SesionDTO;
import com.ciklum.ciklumbackendTarea.dtos.SesionNuevaDTO;
import com.ciklum.ciklumbackendTarea.entities.Sesion;
import com.ciklum.ciklumbackendTarea.exceptions.SesionNoEncontradaException;
import com.ciklum.ciklumbackendTarea.repositories.SesionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class LogicSesion {
    private SesionRepository sesionRepo;

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

    public Optional<List<Sesion>> getAllSesions(Long planId) {
        List<Sesion> sesiones = sesionRepo.findAllByPlanId(planId);
        if(sesiones.isEmpty()) throw new SesionNoEncontradaException();
        return Optional.of(sesiones);
    }

    public Optional<SesionNuevaDTO> postSesion(Long idPlan, SesionNuevaDTO SesionNuevaDTO) {
        // var url = "http://localhost:" + "8081" + "/plan/" + idPlan;
        // var response = restTemplate.getForEntity(url, List.class);
        Sesion sesion = sesionRepo.save(Mapper.SesionNuevaDTOtoSesion(SesionNuevaDTO));
        return Optional.of(Mapper.toSesionNuevaDTO(sesion));
    }
}
