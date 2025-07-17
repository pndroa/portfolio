package com.pndroa.portfolio_backend.model

import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "portfolio_user", schema = "portfolio_schema")
data class UserModel(

    @Id
    @GeneratedValue
    val id: UUID? = null,

    @Column(nullable = false)
    val first_name: String = "",

    @Column(nullable = false)
    val last_name: String = "",

    @Column
    val job: String? = null,

    @Column
    val field_of_study: String? = null,

    @Column(nullable = false)
    val about_me: String = "",

    @OneToOne
    @JoinColumn(name = "portfolio_id", referencedColumnName = "id")
    val portfolio_id: PortfolioModel
)
