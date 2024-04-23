# Proyecto de Full Stack: Servicio de Información de Sesión para Clientes

Este proyecto de Full Stack implementa una aplicación en Angular que permite a los usuarios aportar información sobre una sesión de entrenamiento realizada, incluyendo datos de salud como pulsaciones del corazón, peso, calorías consumidas estimadas y tiempo de ejercicio. Además, los usuarios podrán hacer comentarios al entrenador, enviarle un enlace a un video alojado en plataformas como YouTube o Vimeo, y adjuntar una foto del entrenamiento.

## Características

- Registro de datos de salud: Los usuarios podrán ingresar datos de salud relevantes, como pulsaciones del corazón, peso, calorías consumidas estimadas y tiempo de ejercicio.
- Comunicación con el entrenador: Los usuarios podrán hacer comentarios y enviar mensajes al entrenador para proporcionar retroalimentación sobre la sesión de entrenamiento.
- Adjuntar multimedia: Los usuarios podrán incluir un enlace a un video (por ejemplo, desde YouTube o Vimeo) y adjuntar una foto del entrenamiento para proporcionar más contexto al entrenador.

## Tecnologías Utilizadas

Este proyecto hace uso de las siguientes tecnologías:

- **Angular**: Para la creación de la interfaz de usuario dinámica y receptiva.
- **Firebase**: Para la autenticación de usuarios y el almacenamiento de datos en la nube.
- **Plataformas de alojamiento de videos (YouTube, Vimeo)**: Para la integración de videos en las sesiones de entrenamiento.
- **HTML/CSS**: Para la estructura y el diseño de la interfaz de usuario.
- **JavaScript/TypeScript**: Para la lógica del lado del cliente y la manipulación de datos.
- Futura conexión con un Backend en **Java SpringBoot**

## Colaboradores


- [Iván Iroslavov Petkov](https://github.com/linceazul)
- [Emilio Rodrigo Carreira Villalta](https://github.com/rorro6787)
- [Juan de Dios Alfaro López](https://github.com/Muellealfa)
- [Rául Fernández Escaño](https://github.com/raulfernandez1)



## Instalación y Uso
### Para el proyecto de front-end

1. Clona este repositorio a tu máquina local utilizando el siguiente comando:
   ```bash
   git clone https://github.com/tu_usuario/nombre_del_repositorio.git
2. Navega hasta el directorio del proyecto:
   ```bash
   cd nombre_del_repositorio
3. Instala las dependencias necesarias:
   ```bash
   npm install
4. Ejecuta la aplicación:
   ```bash
   ng serve -o
5. Abre tu navegador y navega a http://localhost:4200 para ver la aplicación en acción.
   
### Para el proyecto de back-end
1. Clona el directorio en tu máquina local:
```bash
git clone https://github.com/tu_usuario/nombre_del_repositorio.git
```
2. Ve a un directorio donde haya aun proyecto Maven, por ejemplo, desde la carpeta ciklum-zumbtech:
```bash
cd ciklum-backendTarea
```
3. Haz la instalación de tu proyecto Maven, tienes dos formas de hacerlo:   
   3.1. Si es la primera vez que instalas y compilas el proyecto, puedes hacer:
   ```bash
   mvn install
   ```
   3.2. Si el proyecto ya ha sido compilado otras veces y quieres eliminar los archivos generados en compilaciones anteriores:
   ```bash
   mvn clean install
   ```
5. Ya podrás ejecutar tu "SpringBootApplication" correctamente
   
## Información para Colaboradores


1. **Crear y Gestionar Ramas Individuales**: Antes de comenzar a trabajar en una nueva característica o solucionar un problema, siempre crea una rama separada utilizando el comando
   ```bash
      git checkout -b nombre_de_la_rama
   ```
    Esto asegurará que cada contribución esté aislada y se pueda manejar de manera independiente.
    En caso de ya existir la rama en remoto y querer conectar la información en local, introducir adicionalmente el siguiente comando:
   ```bash
      git pull origin nombre_de_la_rama
   ```
   En caso de haber hecho muchos cambios en una rama en local y querer descartarlos todos y tener los datos de la versión más actualizada, insertar:
   ```bash
      git clean -fd
      git pull origin nombre_de_la_rama
   ```

4. **Hacer Commits en la Rama Respectiva**: Realiza tus cambios y commits en la rama que has creado para tu tarea específica. Utiliza el siguiente comando para saber que archivos has modificado y elegir cuáles subir:
   ```bash
   git diff --name-only nombre_de_la_rama
   ```
   Luego elegir uno a uno los archivos que queremos hacerles commit:
   ```bash
   git add nombre_archivo_1 nombre_archivo_2 ... nombre_archivo_n
   ```
   Y por último hacer el commit junto con un mensaje descriptivo:
   ```bash
   git commit -m "Descripción clara y concisa de tus cambios"
   ```

6. **Sincronizar con el Repositorio Remoto**: Antes de hacer un push de tus cambios al repositorio remoto, asegúrate de sincronizar tu rama con la rama principal (`main`). Sigue estos pasos:
   ```bash
   git checkout main
   git pull origin main
   git merge nombre_de_tu_rama
   ```

8. **Revisión de Código**: Una vez que hayas completado tu trabajo y estés listo para fusionarlo con la rama principal (`main`), haz un pull request desde tu rama hacia `main`. Esto permitirá que otros colaboradores revisen tus cambios, hagan comentarios y proporcionen retroalimentación antes de que se realice la fusión. Puedes hacerlo desde la interfaz de usuario de GitHub o utilizando el siguiente comando:
   ```bash
   git push origin main
   ```
   También se pueden subir directamente todos los cambios de una rama local a la misma rama en remoto, sin tener que hacer "merge" con main. Esto puede ser útil, si se desea completar una funcionalidad completa antes de subirlo a la rama principal. En ese caso, nos saltaríamos el paso 3 y directamente usaríamos:
   ```bash
   git push origin nombre_de_la_rama"
   ```
## Soporte

Si tienes algún problema o pregunta sobre este proyecto, no dudes en abrir un issue en el repositorio o contactar al equipo de desarrollo en 0610948715@uma.es.

¡Gracias por tu interés en nuestro proyecto! Esperamos tus contribuciones.


[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/5-86A-DI)
