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
public class EntrenadorDTO {
    private Long idUsuario;
    private String telefono;
    private String direccion;
    private String dni;
    private Timestamp fechaNacimiento;
    private Timestamp fechaAlta;
    private Timestamp fechaBaja;
    private String especialidad;
    private String titulacion;
    private String experiencia;
    private String observaciones;
    private Long id;
}
