package com.pndroa.portfolio_backend.controller

import com.pndroa.portfolio_backend.model.PortfolioModel
import com.pndroa.portfolio_backend.repository.PortfolioRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/portfolio")
class PortfolioController(private val portfolioRepository: PortfolioRepository) {

    @GetMapping
    fun getAll(): ResponseEntity<List<PortfolioModel>> {
        println("Repository")
        println(portfolioRepository)
        val response = portfolioRepository.findAll()
        println(response)
        return ResponseEntity.ok(response)
    }
}
