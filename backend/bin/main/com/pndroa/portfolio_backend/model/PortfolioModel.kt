package com.pndroa.portfolio_backend.model

import jakarta.validation.constraints.NotBlank
import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonProperty
import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "portfolio", schema = "portfolioschema")
data class PortfolioModel @JsonCreator(mode = JsonCreator.Mode.PROPERTIES) constructor(

    @Id
    @GeneratedValue
    val id: UUID? = null,

    @field:NotBlank(message = "Title must not be blank")
    @Column(nullable = false)
    @JsonProperty("title")
    val title: String = "",

    @Column(nullable = false)
    @JsonProperty("slug")
    @field:NotBlank(message = "Slug must not be blank")
    val slug: String = "",

    @Column(nullable = true)
    @JsonProperty("description")
    val description: String? = null
)

