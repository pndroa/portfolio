package com.pndroa.portfolio_backend.dto

import java.util.*
import jakarta.validation.constraints.NotBlank

data class UserDTO(
    @field:NotBlank(message = "First name must not be blank")
    val first_name: String,

    @field:NotBlank(message = "Last name must not be blank")
    val last_name: String,

    val job: String? = null,
    val field_of_study: String? = null,

    @field:NotBlank(message = "About me must not be blank")
    val about_me: String,

    val portfolio_id: UUID
)
