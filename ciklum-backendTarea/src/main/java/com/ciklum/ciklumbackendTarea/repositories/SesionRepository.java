package com.ciklum.ciklumbackendTarea.repositories;


import com.ciklum.ciklumbackendTarea.entities.Sesion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SesionRepository extends JpaRepository<Sesion, Long> {
    @Query("SELECT S FROM Sesion S WHERE :idPlan = S.idPlan")
    List<Sesion> findAllByPlanId(Long idPlan);
}
