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
            Optional<Sesion> listaCompra = sesionRepo.findById(idSesion);
            listaCompra.ifPresent(l -> {
                l.setDatosSalud(sesionDTO.getDatosSalud());
                l.setFechaInicio(sesionDTO.getInicio());
                l.setFechaFin(sesionDTO.getFin());
                l.setDescripcion(sesionDTO.getDescripcion());
                l.setMultimedia(sesionDTO.getMultimedia());
                l.setPresencial(sesionDTO.getPresencial());
                l.setTrabajoRealizado(sesionDTO.getTrabajoRealizado());
            });
            return listaCompra.map(Mapper::toUsuarioDTO);
        } else {
            throw new SesionNoEncontradaException();
        }
    }
}
