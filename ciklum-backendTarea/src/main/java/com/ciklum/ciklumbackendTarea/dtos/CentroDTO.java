package com.ciklum.ciklumbackendTarea.dtos;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
@ToString
public class CentroDTO {
    private String nombre;
    private String direccion;
    private Long idCentro;
}
