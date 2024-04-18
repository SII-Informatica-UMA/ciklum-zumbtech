package com.ciklum.ciklumbackendTarea;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;


@SpringBootApplication
public class CiklumBackendTareaApplication {

	public static void main(String[] args) {
		String filePath = "C:\\Users\\emili\\OneDrive\\Escritorio\\Universidad\\3 Carrera\\2º Semestre\\Sistemas Información Internet\\Proyecto_Zumbtech\\ciklum-zumbtech\\ciklum-backendTarea\\schema.sql";
		File file = new File(filePath);
		if(file.exists()) { file.delete(); }

		SpringApplication.run(CiklumBackendTareaApplication.class, args);
	}
}