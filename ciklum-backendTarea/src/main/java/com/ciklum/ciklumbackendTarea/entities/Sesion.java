package com.ciklum.ciklumbackendTarea.entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.EqualsAndHashCode;
import java.sql.*;
import java.util.List;

@Entity
@Table(name = "Sesion")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class Sesion {
    @Id
    @GeneratedValue
    private int id;
    private Timestamp fechaInicio;
    private Timestamp fechaFin;
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "link_multimedia", foreignKey = @ForeignKey(name = "fk_sesion_multimedia"))
    @Column(name = "link")
    private List<String> multimedia;
    private String descripcion;
    private boolean presencial;
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "dato_salud", foreignKey = @ForeignKey(name = "fk_sesion_datoSalud"))
    @Column(name = "dato")
    private List<String> datosSalud;
}