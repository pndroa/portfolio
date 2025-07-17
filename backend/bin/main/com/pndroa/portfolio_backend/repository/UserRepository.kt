package com.pndroa.portfolio_backend.repository

import com.pndroa.portfolio_backend.model.UserModel
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface UserRepository : JpaRepository<UserModel, UUID>