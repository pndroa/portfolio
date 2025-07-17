package com.pndroa.portfolio_backend.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

data class ApiMessageResponse(val message: String)

@RestController
@RequestMapping("/")
class ApiController {

    @GetMapping
    fun hello(): ResponseEntity<ApiMessageResponse> {
        val response = ApiMessageResponse("Hello from Spring Boot API!")
        return ResponseEntity.ok(response)
    }
}
