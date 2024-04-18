create sequence sesion_seq start with 1 increment by 50;
create table dato_salud (sesion_id integer not null, dato varchar(255));
create table link_multimedia (sesion_id integer not null, link varchar(255));
create table sesion (id integer not null, id_plan integer not null, presencial boolean not null, fecha_fin timestamp(6), fecha_inicio timestamp(6), descripcion varchar(255), primary key (id));
alter table if exists dato_salud add constraint fk_sesion_datoSalud foreign key (sesion_id) references sesion;
alter table if exists link_multimedia add constraint fk_sesion_multimedia foreign key (sesion_id) references sesion;
