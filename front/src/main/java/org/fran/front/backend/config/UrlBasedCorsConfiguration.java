package org.fran.front.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@ConfigurationProperties(prefix = "cors")
public class UrlBasedCorsConfiguration {
    private CorsConfiguration configs;

    public CorsConfiguration getConfigs() {
        return configs;
    }

    public void setConfigs(CorsConfiguration configs) {
        this.configs = configs;
    }
}
