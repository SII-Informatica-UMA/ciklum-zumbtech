package com.ciklum.ciklumbackendTarea.dtos;

import com.ciklum.ciklumbackendTarea.entities.Sesion;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
@ToString
public class ListaSesiones {
    private List<Sesion> lista;
}
