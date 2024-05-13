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
public class getPlanDTO {
    private Timestamp fechaInicio;
    private Timestamp fechaFin;
    private String reglaRecurrencia;
    private Long idRutina;
    private Long id;
}
