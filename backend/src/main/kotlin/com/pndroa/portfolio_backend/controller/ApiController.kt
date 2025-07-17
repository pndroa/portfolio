package com.pndroa.portfolio_backend.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class ApiController {

    @GetMapping("/")
    fun hello(): Map<String, String> {
        return mapOf("message" to "Hello from Spring Boot API!")
    }
}
