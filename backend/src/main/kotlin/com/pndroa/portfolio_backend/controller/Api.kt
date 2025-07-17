package com.pndroa.portfolio_backend.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

// Datenklasse für die Antwort
data class MessageResponse(val message: String)

@RestController
@RequestMapping("/")
class ApiController {

    @GetMapping("/")
    fun hello(): ResponseEntity<MessageResponse> {
        val response = MessageResponse("Hello from Spring Boot API!")
        return ResponseEntity.ok(response)
    }
}
