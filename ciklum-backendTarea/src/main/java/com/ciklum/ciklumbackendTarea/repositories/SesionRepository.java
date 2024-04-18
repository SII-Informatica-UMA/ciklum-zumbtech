package com.ciklum.ciklumbackendTarea.repositories;


import com.ciklum.ciklumbackendTarea.entities.Sesion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SesionRepository extends JpaRepository<Sesion, Long> {
    Optional<Sesion> findById(Long id);
}
