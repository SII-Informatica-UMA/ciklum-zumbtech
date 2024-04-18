package com.ciklum.ciklumbackendTarea;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;


@SpringBootApplication
public class CiklumBackendTareaApplication implements CommandLineRunner {
	private static Logger LOG = LoggerFactory
			.getLogger(CiklumBackendTareaApplication.class);

	public static void main(String[] args) {
		String filePath = "C:\\Users\\emili\\OneDrive\\Escritorio\\Universidad\\3 Carrera\\2º Semestre\\Sistemas Información Internet\\Proyecto_Zumbtech\\ciklum-zumbtech\\ciklum-backendTarea\\schema.sql";
		File file = new File(filePath);
		if(file.exists()) { file.delete(); }

		SpringApplication.run(CiklumBackendTareaApplication.class, args);
	}

	@Override
	public void run(String... args) {
		LOG.info("EXECUTING : command line runner");

		for (int i = 0; i < args.length; ++i) {
			LOG.info("args[{}]: {}", i, args[i]);
		}
	}
}

