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
public class ListAsociacion {
    private List<Asociacion> asociaciones;
}
