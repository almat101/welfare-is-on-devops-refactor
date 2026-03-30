package com.leonardo.hug.config;

import org.springframework.stereotype.Component;
import org.springframework.context.event.EventListener;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import javax.sql.DataSource;
import lombok.AllArgsConstructor;


//THIS COMPONENT IS ONLY FOR TESTING PURPOSES
@Component
@AllArgsConstructor
public class DataLoader {
    private DataSource dataSource;
 
    @EventListener(ApplicationReadyEvent.class)
    public void loadData() {
        ResourceDatabasePopulator resourceDatabasePopulator = new ResourceDatabasePopulator(
                true,
                true,
                "UTF-8",
                new ClassPathResource("db/data/gym.sql"),
                new ClassPathResource("db/data/product.sql"),
                new ClassPathResource("db/data/user.sql"),
                new ClassPathResource("db/data/role.sql")
        );
        resourceDatabasePopulator.execute(dataSource);
    }
}