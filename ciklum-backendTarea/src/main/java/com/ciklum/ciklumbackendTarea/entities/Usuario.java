package com.ciklum.ciklumbackendTarea.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class Usuario {
    @Id
    @GeneratedValue
    private Long id;
    private String nombre;
    private String apellido1;
    private String apellido2;
    @Column(unique = true, nullable = false)
    private String email;
    private String password;
    private Boolean administrador;


}
