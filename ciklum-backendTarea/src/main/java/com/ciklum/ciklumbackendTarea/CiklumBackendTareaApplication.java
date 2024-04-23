package com.ciklum.ciklumbackendTarea;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


@SpringBootApplication
public class CiklumBackendTareaApplication implements CommandLineRunner {
	private static Logger LOG = LoggerFactory
			.getLogger(CiklumBackendTareaApplication.class);

	public static void main(String[] args) {
		// Directorio donde quiero que se me genere el schema.sql
		Path filePath = Paths.get("ciklum-backendTarea", "schema.sql");

		// Control de errores
		try {
			Files.deleteIfExists(filePath);
		} catch (IOException e) {
			LOG.error("Failed to delete existing schema.sql file", e);
		}

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

