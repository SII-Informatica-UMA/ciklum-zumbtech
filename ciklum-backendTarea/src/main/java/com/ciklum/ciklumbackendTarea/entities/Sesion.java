package com.ciklum.ciklumbackendTarea.entities;
import jakarta.persistence.*;
import lombok.*;

import java.sql.*;
import java.util.List;

@Entity
@Table(name = "Sesion")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
@Builder
public class Sesion {
    private Long idPlan;
    private Timestamp fechaInicio;
    private Timestamp fechaFin;
    private String trabajoRealizado;
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "link_multimedia", foreignKey = @ForeignKey(name = "fk_sesion_multimedia"))
    @Column(name = "link")
    private List<String> multimedia;
    private String descripcion;
    private Boolean presencial;
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "dato_salud", foreignKey = @ForeignKey(name = "fk_sesion_datoSalud"))
    @Column(name = "dato")
    private List<String> datosSalud;
    @Id
    @GeneratedValue
    private Long id;
    /*
    @ManyToOne
    @JoinColumn(name = "plan_id", foreignKey = @ForeignKey(name = "fk_sesion_plan"))
    private Plan plan;
    */
}
