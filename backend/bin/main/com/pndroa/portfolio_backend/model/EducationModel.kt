package com.pndroa.portfolio_backend.model

import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "education", schema = "portfolio_schema")
data class EducationModel(

    @Id
    @GeneratedValue
    val id: UUID? = null,

    @Column(nullable = false)
    val institution: String = "",

    @Column(nullable = false)
    val degree: String = "",

    val field_of_study: String? = null,

    @Column(nullable = false)
    val start_date: Date = Date(),

    @Column(nullable = false)
    val end_date: Date = Date(),

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    val user_id: UserModel
)