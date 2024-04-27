package com.ciklum.ciklumbackendTarea.controllers;

import com.ciklum.ciklumbackendTarea.dtos.SesionDTO;
import com.ciklum.ciklumbackendTarea.dtos.SesionNuevaDTO;
import com.ciklum.ciklumbackendTarea.entities.Sesion;
import com.ciklum.ciklumbackendTarea.exceptions.SesionNoEncontradaException;
import com.ciklum.ciklumbackendTarea.services.LogicSesion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/sesion")
public class ControladorSesion {
    private LogicSesion sesionService;

    @Autowired
    public ControladorSesion(LogicSesion sesionService) {
        this.sesionService = sesionService;
    }

    @PutMapping("{id}")
    public ResponseEntity<SesionNuevaDTO> putSesion(@PathVariable Long id, @RequestBody SesionDTO sesionDTO) {
        return ResponseEntity.of(sesionService.putSesion(id, sesionDTO));
    }

    @ExceptionHandler(SesionNoEncontradaException.class)
    @ResponseStatus(code = HttpStatus.NOT_FOUND)
    public void sesionNotFoundException() {}
}
