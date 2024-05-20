package com.ciklum.ciklumbackendTarea.dtos;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
@ToString
public class Asociacion {
    private Long idEntrenador;
    private Long idCliente;
    private String especialidad;
    private Long id;
    private List<GetPlanDTO> planDTO;
}
