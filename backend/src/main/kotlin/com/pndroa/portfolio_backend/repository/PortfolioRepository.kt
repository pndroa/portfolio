package com.pndroa.portfolio_backend.repository

import com.pndroa.portfolio_backend.model.PortfolioModel
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface PortfolioRepository : JpaRepository<PortfolioModel, UUID>
