package com.ciklum.ciklumbackendTarea.dtos;

import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
@ToString
public class PlanDTO {
    private Timestamp fechaInicio;
    private Timestamp fechaFin;
    private String reglaRecurrencia;
    private Long idRutina;
    private Long id;
}
