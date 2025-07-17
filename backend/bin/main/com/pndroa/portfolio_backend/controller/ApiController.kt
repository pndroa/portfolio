package com.pndroa.portfolio_backend.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/")
class ApiController {

    @GetMapping
    fun getApiRoutes(): ResponseEntity<Map<String, Any>> {
        val apiRoutes = mapOf(
            "portfolio" to listOf(
                "GET /portfolio",
                "GET /portfolio/{portfolioId}",
                "POST /portfolio",
                "PUT /portfolio/{portfolioId}",
                "DELETE /portfolio/{portfolioId}"
            ),
            "user" to listOf(
                "GET /user",
                "GET /user/{userId}",
                "POST /user",
                "PUT /user/{userId}",
                "DELETE /user/{userId}"
            ),
            "education" to listOf(
                "GET /user/{userId}/education",
                "GET /user/{userId}/education/{educationId}",
                "POST /user/{userId}/education",
                "PUT /user/{userId}/education/{educationId}",
                "DELETE /user/{userId}/education/{educationId}"
            ),
            "experience" to listOf(
                "GET /user/{userId}/experience",
                "GET /user/{userId}/experience/{experienceId}",
                "POST /user/{userId}/experience",
                "PUT /user/{userId}/experience/{experienceId}",
                "DELETE /user/{userId}/experience/{experienceId}"
            ),
            "skill" to listOf(
                "GET /user/{userId}/skill",
                "GET /user/{userId}/skill/{skillId}",
                "POST /user/{userId}/skill",
                "PUT /user/{userId}/skill/{skillId}",
                "DELETE /user/{userId}/skill/{skillId}"
            ),
            "project" to listOf(
                "GET /user/{userId}/project",
                "GET /user/{userId}/project/{projectId}",
                "POST /user/{userId}/project",
                "PUT /user/{userId}/project/{projectId}",
                "DELETE /user/{userId}/project/{projectId}"
            ),
            "techStack" to listOf(
                "GET /user/{userId}/project/{projectId}/techStack",
                "POST /user/{userId}/project/{projectId}/techStack",
                "DELETE /user/{userId}/project/{projectId}/techStack/{techStackId}"
            ),
            "contact" to listOf(
                "GET /user/{userId}/contact",
                "POST /user/{userId}/contact",
                "PUT /user/{userId}/contact",
                "DELETE /user/{userId}/contact"
            ),
            "socialLink" to listOf(
                "GET /user/{userId}/contact/socialLink",
                "POST /user/{userId}/contact/socialLink",
                "DELETE /user/{userId}/contact/socialLink/{socialLinkId}"
            )
        )

        val responseBody = mapOf(
            "message" to "Here you can find all API-Routes",
            "apiRoutes" to apiRoutes
        )

        return ResponseEntity.ok(responseBody)
    }
}
