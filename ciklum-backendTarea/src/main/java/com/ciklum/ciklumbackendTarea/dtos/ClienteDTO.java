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
public class ClienteDTO {
    private Long idUsuario;
    private String telefono;
    private String direccion;
    private String dni;
    private Timestamp fechaNacimiento;
    private String sexo;    // <-- Posible problema
    private Long id;
}
