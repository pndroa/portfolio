package com.pndroa.portfolio_backend.exception

import org.springframework.dao.DataAccessException
import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.transaction.CannotCreateTransactionException
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.context.request.WebRequest
import java.time.Instant
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException

@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(Exception::class)
    fun handleGenericException(ex: Exception, request: WebRequest): ProblemDetail {
        val detail = ProblemDetail.forStatusAndDetail(
            HttpStatus.INTERNAL_SERVER_ERROR,
            ex.message ?: "Unexpected error"
        )
        detail.title = "Internal Server Error"
        detail.setProperty("timestamp", Instant.now().toString())
        detail.setProperty("path", request.getDescription(false).removePrefix("uri="))
        return detail
    }

    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidationException(ex: MethodArgumentNotValidException, request: WebRequest): ProblemDetail {
        val detail = ProblemDetail.forStatusAndDetail(
            HttpStatus.BAD_REQUEST,
            "Validation failed"
        )
        detail.title = "Bad Request"
        detail.setProperty("timestamp", Instant.now().toString())
        detail.setProperty("path", request.getDescription(false).removePrefix("uri="))
        detail.setProperty("errors", ex.bindingResult.fieldErrors.map {
            mapOf("field" to it.field, "message" to it.defaultMessage)
        })
        return detail
    }

    @ExceptionHandler(NoContentException::class)
    fun handleNoContent(ex: NoContentException, request: WebRequest): ProblemDetail {
        val detail = ProblemDetail.forStatusAndDetail(
            HttpStatus.OK,
            ex.message ?: "No content available"
        )
        detail.title = "No Portfolios"
        detail.setProperty("timestamp", Instant.now().toString())
        detail.setProperty("path", request.getDescription(false).removePrefix("uri="))
        return detail
    }

    @ExceptionHandler(CannotCreateTransactionException::class)
    fun handleCannotCreateTransactionException(ex: CannotCreateTransactionException, request: WebRequest): ProblemDetail {
        val detail = ProblemDetail.forStatusAndDetail(
            HttpStatus.SERVICE_UNAVAILABLE,
            "Could not connect to the database"
        )
        detail.title = "Database Error"
        detail.setProperty("timestamp", Instant.now().toString())
        detail.setProperty("path", request.getDescription(false).removePrefix("uri="))
        return detail
    }

    @ExceptionHandler(DataAccessException::class)
    fun handleDatabaseException(ex: DataAccessException, request: WebRequest): ProblemDetail {
        val detail = ProblemDetail.forStatusAndDetail(
            HttpStatus.SERVICE_UNAVAILABLE,
            ex.message ?: "Database access error"
        )
        detail.title = "Database Error"
        detail.setProperty("timestamp", Instant.now().toString())
        detail.setProperty("path", request.getDescription(false).removePrefix("uri="))
        return detail
    }

    @ExceptionHandler(NotFoundException::class)
    fun handleNotFound(ex: NotFoundException, request: WebRequest): ProblemDetail {
        val detail = ProblemDetail.forStatusAndDetail(
            HttpStatus.NOT_FOUND,
            ex.message ?: "Resource not found"
        )
        detail.title = "Not Found"
        detail.setProperty("timestamp", Instant.now().toString())
        detail.setProperty("path", request.getDescription(false).removePrefix("uri="))
        return detail
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException::class)
    fun handleTypeMismatch(ex: MethodArgumentTypeMismatchException, request: WebRequest): ProblemDetail {
        val detail = ProblemDetail.forStatusAndDetail(
            HttpStatus.BAD_REQUEST,
            "ID must be a valid UUID"
        )
        detail.title = "Invalid ID"
        detail.setProperty("timestamp", Instant.now().toString())
        detail.setProperty("path", request.getDescription(false).removePrefix("uri="))
        return detail
    }
}
