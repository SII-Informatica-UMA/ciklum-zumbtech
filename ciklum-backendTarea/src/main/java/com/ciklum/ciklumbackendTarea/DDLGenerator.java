package com.ciklum.ciklumbackendTarea;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

import javax.persistence.EntityManager;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;

@Component
public class DDLGenerator implements CommandLineRunner {

    @Autowired
    private EntityManager entityManager;

    @Override
    public void run(String... args) throws Exception {
        String ddl = entityManager
                .getEntityManagerFactory()
                .unwrap(org.hibernate.SessionFactory.class)
                .openSession()
                .createNativeQuery("SHOW CREATE SCHEMA ./ciklum-backendTarea/db")
                .getSingleResult().toString();

        try (Writer writer = new OutputStreamWriter(new FileOutputStream("schema.sql"))) {
            writer.write(ddl);
        }
    }
}


