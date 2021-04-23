package org.fran.front.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebMvcConfigurer extends WebMvcConfigurerAdapter {

    @Autowired
    private UrlBasedCorsConfiguration urlBasedCorsConfiguration;

    @Bean
    public org.springframework.web.servlet.config.annotation.WebMvcConfigurer corsConfigurer() {
        return new org.springframework.web.servlet.config.annotation.WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                CorsConfiguration configs = urlBasedCorsConfiguration.getConfigs();

                registry.addMapping("/**")
                        .allowedOrigins(configs.getAllowedOrigins().toArray(new String[]{}))
                        .allowedMethods(configs.getAllowedMethods().toArray(new String[]{}));
            }

            @Override
            public void addViewControllers(ViewControllerRegistry registry) {
                registry.addViewController("/").setViewName("redirect:/swagger-ui.html");
            }

            @Override
            public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
                configurer.favorPathExtension(false)
                        .favorParameter(true);
            }

            @Override
            public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(twoFactorAuthInterceptor).addPathPatterns(twoFactorAuthCfg.getPath());
            }
        };
    }
}
