package com.alumni.networking.config;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@SecurityScheme(
    name = "bearerAuth",
    type = SecuritySchemeType.HTTP,
    bearerFormat = "JWT",
    scheme = "bearer"
)
public class OpenApiConfig {
    @Bean
    OpenAPI alumniNetworkingOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("Alumni Networking Platform API")
                .version("v1")
                .description("REST API secured with JWT bearer authentication"));
    }
}