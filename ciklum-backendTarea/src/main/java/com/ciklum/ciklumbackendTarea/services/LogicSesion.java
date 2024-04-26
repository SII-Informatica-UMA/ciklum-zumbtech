package com.ciklum.ciklumbackendTarea.services;

import com.ciklum.ciklumbackendTarea.entities.Sesion;
import com.ciklum.ciklumbackendTarea.repositories.SesionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class LogicSesion {
    private SesionRepository repo;

    @Autowired
    public LogicSesion(SesionRepository repo) {
        this.repo = repo;
    }
}
