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

import java.util.Optional;

@Service
@Transactional
public class LogicSesion {
    private SesionRepository sesionRepo;

    @Autowired
    public LogicSesion(SesionRepository repo) {
        this.sesionRepo = repo;
    }

    public Optional<SesionNuevaDTO> putSesion(Long idSesion, SesionDTO sesionDTO) {
        if(sesionRepo.existsById(idSesion)) {
            Optional<Sesion> sesion = sesionRepo.findById(idSesion);
            sesion.ifPresent(s -> {
                s.setDatosSalud(sesionDTO.getDatosSalud());
                s.setFechaInicio(sesionDTO.getInicio());
                s.setFechaFin(sesionDTO.getFin());
                s.setDescripcion(sesionDTO.getDescripcion());
                s.setMultimedia(sesionDTO.getMultimedia());
                s.setPresencial(sesionDTO.getPresencial());
                s.setTrabajoRealizado(sesionDTO.getTrabajoRealizado());
            });
            return sesion.map(Mapper::toSesionNuevaDTO);
        } else {
            throw new SesionNoEncontradaException();
        }
    }
}
