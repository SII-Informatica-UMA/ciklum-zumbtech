package com.ciklum.ciklumbackendTarea.controllers;

import com.ciklum.ciklumbackendTarea.dtos.SesionDTO;
import com.ciklum.ciklumbackendTarea.dtos.SesionNuevaDTO;
import com.ciklum.ciklumbackendTarea.entities.Sesion;

import java.util.Optional;

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

    public static Sesion SesionNuevaDTOtoSesion(SesionNuevaDTO SesionNuevaDTO) {
        return Sesion.builder()
                .idPlan(SesionNuevaDTO.getIdPlan())
                .fechaInicio(SesionNuevaDTO.getInicio())
                .fechaFin(SesionNuevaDTO.getFin())
                .datosSalud(SesionNuevaDTO.getDatosSalud())
                .descripcion(SesionNuevaDTO.getDescripcion())
                .presencial(SesionNuevaDTO.getPresencial())
                .multimedia(SesionNuevaDTO.getMultimedia())
                .trabajoRealizado(SesionNuevaDTO.getTrabajoRealizado())
                .build();
    }

    public static SesionDTO toSesionDTO(Sesion sesion) {
        return SesionDTO.builder()
                .id(sesion.getId())
                .inicio(sesion.getFechaInicio())
                .fin(sesion.getFechaFin())
                .multimedia(sesion.getMultimedia())
                .descripcion(sesion.getDescripcion())
                .presencial(sesion.getPresencial())
                .datosSalud(sesion.getDatosSalud())
                .trabajoRealizado(sesion.getTrabajoRealizado())
                .idPlan(sesion.getIdPlan())
                .build();
    }
}
