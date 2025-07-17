package com.pndroa.portfolio_backend.controller

import com.pndroa.portfolio_backend.exception.NoContentException
import com.pndroa.portfolio_backend.exception.NotFoundException
import com.pndroa.portfolio_backend.model.PortfolioModel
import com.pndroa.portfolio_backend.repository.PortfolioRepository
import jakarta.validation.Valid
import java.util.UUID
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/portfolio")
class PortfolioController(private val portfolioRepository: PortfolioRepository) {

    @GetMapping
    fun getAllPortfolio(): ResponseEntity<List<PortfolioModel>> {
        val portfolios = portfolioRepository.findAll()

        if (portfolios.isEmpty()) throw NoContentException("No portfolios yet")

        return ResponseEntity.ok(portfolios)
    }

    @GetMapping("/{id}")
    fun getById(@PathVariable id: UUID): ResponseEntity<PortfolioModel> {
        val portfolio = portfolioRepository.findById(id)
            .orElseThrow { NotFoundException("Portfolio with ID $id not found") }

        return ResponseEntity.ok(portfolio)
    }



    @PostMapping
    fun setPortfolio(@RequestBody @Valid portfolio: PortfolioModel): ResponseEntity<PortfolioModel> {
        val response = portfolioRepository.save(portfolio)
        return ResponseEntity.ok(response)
    }

}
