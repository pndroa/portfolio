package com.pndroa.portfolio_backend.dto

import java.util.UUID
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import java.util.Date

data class EducationDTO(
    @field:NotBlank(message = "institution must not be blank")
    val institution: String,

    @field:NotBlank(message = "degree must not be blank")
    val degree: String,

    val field_of_study: String?,

    @field:NotNull(message = "start_date must not be null")
    val start_date: Date,

    @field:NotNull(message = "end_date must not be null")
    val end_date: Date,

    val user_id: UUID
)