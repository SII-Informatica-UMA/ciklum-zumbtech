package com.ciklum.ciklumbackendTarea.controllers;

import com.ciklum.ciklumbackendTarea.dtos.SesionDTO;
import com.ciklum.ciklumbackendTarea.dtos.SesionNuevaDTO;
import com.ciklum.ciklumbackendTarea.entities.Sesion;

public class Mapper {
    public static SesionNuevaDTO toSesionNuevaDTO(Sesion sesion) {
        return SesionNuevaDTO.builder()
                .idPlan(sesion.getIdPlan())
                .presencial(sesion.getPresencial())
                .descripcion(sesion.getDescripcion())
                .multimedia(sesion.getMultimedia())
                .inicio(sesion.getFechaInicio())
                .fin(sesion.getFechaFin())
                .datosSalud(sesion.getDatosSalud())
                .trabajoRealizado(sesion.getTrabajoRealizado())
                .build();
    }

    public static Sesion toSesion(SesionDTO sesionDTO) {
        return Sesion.builder()
                .idPlan(sesionDTO.getIdPlan())
                .fechaInicio(sesionDTO.getInicio())
                .fechaFin(sesionDTO.getFin())
                .datosSalud(sesionDTO.getDatosSalud())
                .descripcion(sesionDTO.getDescripcion())
                .presencial(sesionDTO.getPresencial())
                .multimedia(sesionDTO.getMultimedia())
                .trabajoRealizado(sesionDTO.getTrabajoRealizado())
                .id(sesionDTO.getId())
                .build();
    }
}
