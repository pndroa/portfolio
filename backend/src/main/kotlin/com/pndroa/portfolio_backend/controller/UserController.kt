package com.pndroa.portfolio_backend.controller

import com.pndroa.portfolio_backend.dto.UserDTO
import com.pndroa.portfolio_backend.exception.NoContentException
import com.pndroa.portfolio_backend.exception.NotFoundException
import com.pndroa.portfolio_backend.model.UserModel
import com.pndroa.portfolio_backend.repository.PortfolioRepository
import com.pndroa.portfolio_backend.repository.UserRepository
import jakarta.validation.Valid
import java.util.UUID
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/user")
class UserController(
    private val userRepository: UserRepository,
    private val portfolioRepository: PortfolioRepository
) {

    @GetMapping
    fun getAllUser(): ResponseEntity<List<UserModel>> {
        val users = userRepository.findAll()

        if (users.isEmpty()) throw NoContentException("No users yet")

        return ResponseEntity.ok(users)
    }

    @GetMapping("/{id}")
    fun getUser(@PathVariable id: UUID): ResponseEntity<UserModel> {
        val user = userRepository.findById(id)
            .orElseThrow { NotFoundException("User with ID $id not found") }

        return ResponseEntity.ok(user)
    }

    @PostMapping
    fun addUser(@RequestBody @Valid dto: UserDTO): ResponseEntity<UserModel> {
        val portfolio = portfolioRepository.findById(dto.portfolio_id)
            .orElseThrow { NotFoundException("Portfolio not found with id: ${dto.portfolio_id}") }

        val user = UserModel(
            first_name = dto.first_name,
            last_name = dto.last_name,
            job = dto.job,
            field_of_study = dto.field_of_study,
            about_me = dto.about_me,
            portfolio_id = portfolio
        )

        val savedUser = userRepository.save(user)
        return ResponseEntity.ok(savedUser)
    }
}