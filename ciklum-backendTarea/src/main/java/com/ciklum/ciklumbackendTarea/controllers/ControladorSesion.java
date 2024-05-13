package com.ciklum.ciklumbackendTarea.controllers;

import com.ciklum.ciklumbackendTarea.dtos.SesionDTO;
import com.ciklum.ciklumbackendTarea.dtos.SesionNuevaDTO;
import com.ciklum.ciklumbackendTarea.entities.Sesion;
import com.ciklum.ciklumbackendTarea.exceptions.PlanNoEncontradoException;
import com.ciklum.ciklumbackendTarea.exceptions.SesionNoEncontradaException;
import com.ciklum.ciklumbackendTarea.services.LogicSesion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/sesion")
public class ControladorSesion {
    private LogicSesion sesionService;

    @Autowired
    public ControladorSesion(LogicSesion sesionService) {
        this.sesionService = sesionService;
    }

    /**
     * Lista de todos los endpoints de 'Gestión de información de sesiones de los clientes
     * siguiendo el mismo orden que en la API
     * **/

    @GetMapping("{id}")
    public ResponseEntity<SesionDTO> getSesion(@PathVariable(name = "id") Long id) {
        return ResponseEntity.of(sesionService.getSesion(id));
    }

    @PutMapping("{id}")
    public ResponseEntity<SesionNuevaDTO> putSesion(@PathVariable Long id, @RequestBody SesionDTO sesionDTO) {
        return ResponseEntity.of(sesionService.putSesion(id, sesionDTO));
    }

    @DeleteMapping("{id}")
    public void deleteSesion(@PathVariable(name = "id") Long id) {
        sesionService.deleteSesion(id);
    }

    @GetMapping
    public ResponseEntity<List<Sesion>> getAllSesions(@RequestParam(name = "plan") Long idPlan) {
        return ResponseEntity.of(sesionService.getAllSesions(idPlan));
    }

    @PostMapping
    public ResponseEntity<SesionNuevaDTO> postSesion(@RequestParam(name = "plan") Long idPlan, @RequestBody SesionNuevaDTO sesionNuevaDTO) {
         return ResponseEntity.of(sesionService.postSesion(idPlan, sesionNuevaDTO));
    }

    @ExceptionHandler(SesionNoEncontradaException.class)
    @ResponseStatus(code = HttpStatus.NOT_FOUND)
    public void sesionNotFoundException() {}

    @ExceptionHandler(PlanNoEncontradoException.class)
    @ResponseStatus(code = HttpStatus.NOT_FOUND)
    public void planNotFoundException() {}
}
