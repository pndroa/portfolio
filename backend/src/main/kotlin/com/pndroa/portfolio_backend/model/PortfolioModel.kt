package com.pndroa.portfolio_backend.model

import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "portfolio", schema = "portfolioschema")
data class PortfolioModel(

    @Id
    @GeneratedValue
    val id: UUID? = null,

    @Column(nullable = false)
    val title: String,

    @Column(nullable = false)
    val slug: String,

    val description: String? = null
)
