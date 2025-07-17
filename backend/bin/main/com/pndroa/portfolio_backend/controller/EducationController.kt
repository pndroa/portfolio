package com.pndroa.portfolio_backend.controller

import com.pndroa.portfolio_backend.dto.EducationDTO
import com.pndroa.portfolio_backend.dto.UserDTO
import com.pndroa.portfolio_backend.exception.NoContentException
import com.pndroa.portfolio_backend.exception.NotFoundException
import com.pndroa.portfolio_backend.model.EducationModel
import com.pndroa.portfolio_backend.model.UserModel
import com.pndroa.portfolio_backend.repository.EducationRepository
import com.pndroa.portfolio_backend.repository.UserRepository
import jakarta.validation.Valid
import java.util.UUID
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/education")
class EducationController(
    private val educationRepository: EducationRepository,
    private val userRepository: UserRepository,
) {

    @GetMapping
    fun getAllEducations(): ResponseEntity<List<EducationModel>> {
        val educations = educationRepository.findAll()

        if(educations.isEmpty()) throw NoContentException("No Educations found")

        return ResponseEntity.ok(educations)
    }

    @GetMapping("/{id}")
    fun getUser(@PathVariable id: UUID): ResponseEntity<EducationModel> {
        val education = educationRepository.findById(id)
            .orElseThrow { NotFoundException("Education with ID $id not found") }

        return ResponseEntity.ok(education)
    }

    @PostMapping
    fun addEducation(@RequestBody @Valid dto: EducationDTO): ResponseEntity<EducationModel?> {
        val user = userRepository.findById(dto.user_id)
            .orElseThrow { NotFoundException("User not found with id: ${dto.user_id}") }

        val education = EducationModel(
            institution = dto.institution,
            degree = dto.degree,
            field_of_study = dto.field_of_study,
            start_date = dto.start_date,
            end_date = dto.end_date,
            user_id = user
        )

        val savedEducation = educationRepository.save(education)
        return ResponseEntity.ok(savedEducation)
    }
}