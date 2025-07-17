package com.pndroa.portfolio_backend.repository

import com.pndroa.portfolio_backend.model.EducationModel
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface EducationRepository : JpaRepository<EducationModel, UUID> {}