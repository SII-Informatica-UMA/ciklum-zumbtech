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

    public static Sesion toSesion(SesionNuevaDTO sesionNuevaDTO) {
        return com.ciklum.ciklumbackendTarea.entities.Sesion.builder()
                .idPlan(sesionNuevaDTO.getIdPlan())
                .fechaInicio(sesionNuevaDTO.getInicio())
                .fechaFin(sesionNuevaDTO.getFin())
                .datosSalud(sesionNuevaDTO.getDatosSalud())
                .descripcion(sesionNuevaDTO.getDescripcion())
                .presencial(sesionNuevaDTO.getPresencial())
                .multimedia(sesionNuevaDTO.getMultimedia())
                .trabajoRealizado(sesionNuevaDTO.getTrabajoRealizado())
                .build();
    }
}
