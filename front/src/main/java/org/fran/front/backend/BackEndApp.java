package org.fran.front.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author fran
 * @Description
 * @Date 2021/4/23 15:22
 */
@SpringBootApplication(
        scanBasePackageClasses = {BackEndApp.class}
)
public class BackEndApp {
    public static void main(String[] args) {
        SpringApplication.run(BackEndApp.class, args);
    }
}
