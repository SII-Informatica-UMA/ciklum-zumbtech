# Proyecto de Full Stack: Servicio de Información de Sesión para Clientes

Este proyecto de Full Stack implementa una aplicación en Angular que permite a los usuarios aportar información sobre una sesión de entrenamiento realizada, incluyendo datos de salud como pulsaciones del corazón, peso, calorías consumidas estimadas y tiempo de ejercicio. Además, los usuarios podrán hacer comentarios al entrenador, enviarle un enlace a un video alojado en plataformas como YouTube o Vimeo, y adjuntar una foto del entrenamiento.

## Características

- Registro de datos de salud: Los usuarios podrán ingresar datos de salud relevantes, como pulsaciones del corazón, peso, calorías consumidas estimadas y tiempo de ejercicio.
- Comunicación con el entrenador: Los usuarios podrán hacer comentarios y enviar mensajes al entrenador para proporcionar retroalimentación sobre la sesión de entrenamiento.
- Adjuntar multimedia: Los usuarios podrán incluir un enlace a un video (por ejemplo, desde YouTube o Vimeo) y adjuntar una foto del entrenamiento para proporcionar más contexto al entrenador.

## Tecnologías Utilizadas

Este proyecto hace uso de las siguientes tecnologías:

- **Angular**: Para la creación de la interfaz de usuario dinámica y receptiva.
- **Docker**: Para meter en contenedores los distintos servicios y que el usuario no tenga que configurar nada.
- **Plataformas de alojamiento de videos (YouTube, Vimeo)**: Para la integración de videos en las sesiones de entrenamiento.
- **HTML/CSS**: Para la estructura y el diseño de la interfaz de usuario.
- **JavaScript/TypeScript**: Para la lógica del lado del cliente y la manipulación de datos.
- Conexión con un Backend en **Java SpringBoot**

## Colaboradores


- [Iván Iroslavov Petkov](https://github.com/linceazul)
- [Emilio Rodrigo Carreira Villalta](https://github.com/rorro6787)
- [Juan de Dios Alfaro López](https://github.com/Muellealfa)
- [Rául Fernández Escaño](https://github.com/raulfernandez1)



## Instalación
Se trata de un proyecto que conecta a un frontend con un backend que se comunica con una base de datos. El proyecto esta dockerizado y es transparente al usuario. Solo hay que seguir los siguientes pasos:

1. Clona este repositorio a tu máquina local utilizando el siguiente comando:
   
   ```bash
   git clone url_del_repositorio
3. Navega hasta el directorio del proyecto:
   
   ```bash
   cd nombre_del_repositorio
4. La primera vez que lo quieras probar, ejecuta el siguiente comando Docker para lanzar todos los servicios:
   
   ```bash
   docker compose up --build
4. El resto de veces, simplemente ejecuta este otro comando Docker para lanzar todos los servicios:
   
   ```bash
   docker compose up 
6. Abre tu navegador y navega a http://localhost:4200 para ver la aplicación en acción.

## Uso y funcionalidades
Una vez se han lanzado todos los servicios a través del comando de Docker, el usuario podrá consultar estas distintas opciones:

- **La Aplicación Angular**: abriendo el navegador y insertando la url http://localhost:4200, se podrá hacer uso de forma normal de la aplicación de frontend que será completamente funcional y ya estará conectado al backend que no tiene la seguridad activa.

- **El Swagger del Backend sin seguridad**: abriendo el navegador y insertando la url http://localhost:8080/swagger-ui/index.html#, se podrá observar la especificación de la API a la que se está conectando nuestra aplicación angular. Es una especificación completa con todos los microservicios, pero no tiene la seguridad activa.
  
<p align="center">
   <img src="https://github.com/rorro6787/rorro6787/blob/main/Images/foto.png"/>
</p>

- **El Swagger del Backend con seguridad**: abriendo el navegador y insertando la url http://localhost:8081/swagger-ui/index.html#, se podrá observar la especificación de la API del backend que sí que tiene la seguridad activa. Esta solo tiene la implementación del microservicio de gestión de sesiones por parte de clientes.
  
<p align="center">
   <img src="https://github.com/rorro6787/rorro6787/blob/main/Images/foto2.png"/>
</p>

- Si bien esta API no es la que se usa para hacer la conexión desde el proyecto en angular, la añado al proyecto porque demuestra que sé como implantar seguridad desde una aplicación SpringBoot. Si se hace         cualquier petición sin añadir la contraseña o un token válido se devolverá un error 403. 

<p align="center">
   <br>
   <img src="https://github.com/rorro6787/rorro6787/blob/main/Images/foto3.png"/>
</p>

## Soporte

Si tienes algún problema o pregunta sobre este proyecto, no dudes en abrir un issue en el repositorio o contactar al equipo de desarrollo en 0610948715@uma.es.
