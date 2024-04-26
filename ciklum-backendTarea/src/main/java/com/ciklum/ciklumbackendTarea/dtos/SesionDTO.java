package com.ciklum.ciklumbackendTarea.dtos;

import lombok.*;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
@ToString
public class SesionDTO {
    private Long idPlan;
    private Timestamp inicio;
    private Timestamp fin;
    private String trabajoRealizado;
    private List<String> multimedia;
    private String descripcion;
    private Boolean presencial;
    private List<String> datosSalud;
    private Long id;
}
