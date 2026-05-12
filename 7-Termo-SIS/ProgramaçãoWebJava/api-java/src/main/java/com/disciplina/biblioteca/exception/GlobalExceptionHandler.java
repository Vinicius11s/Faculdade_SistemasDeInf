package com.disciplina.biblioteca.exception;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(RecursoNaoEncontradoException.class)
    public ResponseEntity<ErroResponse> recursoNaoEncontrado(
            RecursoNaoEncontradoException ex,
            HttpServletRequest request) {
        ErroResponse body = ErroResponse.of(
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI(),
                List.of());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    @ExceptionHandler(RegraNegocioException.class)
    public ResponseEntity<ErroResponse> regraNegocio(
            RegraNegocioException ex,
            HttpServletRequest request) {
        ErroResponse body = ErroResponse.of(
                HttpStatus.CONFLICT.value(),
                HttpStatus.CONFLICT.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI(),
                List.of());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErroResponse> validacao(MethodArgumentNotValidException ex, HttpServletRequest request) {
        List<ErroResponse.CampoErro> campos = ex.getBindingResult().getFieldErrors().stream()
                .map(this::mapFieldError)
                .collect(Collectors.toList());
        ErroResponse body = ErroResponse.of(
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                "Dados inválidos",
                request.getRequestURI(),
                campos);
        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErroResponse> constraintViolation(
            ConstraintViolationException ex,
            HttpServletRequest request) {
        List<ErroResponse.CampoErro> campos = ex.getConstraintViolations().stream()
                .map(v -> new ErroResponse.CampoErro(v.getPropertyPath().toString(), v.getMessage()))
                .collect(Collectors.toList());
        ErroResponse body = ErroResponse.of(
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                "Validação falhou",
                request.getRequestURI(),
                campos);
        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErroResponse> corpoInvalido(HttpServletRequest request) {
        ErroResponse body = ErroResponse.of(
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                "Corpo da requisição JSON inválido ou malformado",
                request.getRequestURI(),
                List.of());
        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErroResponse> integridade(DataIntegrityViolationException ex, HttpServletRequest request) {
        ErroResponse body = ErroResponse.of(
                HttpStatus.CONFLICT.value(),
                HttpStatus.CONFLICT.getReasonPhrase(),
                "Violação de integridade no banco de dados (valor duplicado ou referência inválida)",
                request.getRequestURI(),
                List.of());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErroResponse> generico(Exception ex, HttpServletRequest request) {
        log.error("Erro não tratado", ex);
        ErroResponse body = ErroResponse.of(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                "Erro interno. Tente novamente mais tarde.",
                request.getRequestURI(),
                List.of());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }

    private ErroResponse.CampoErro mapFieldError(FieldError fe) {
        return new ErroResponse.CampoErro(fe.getField(), fe.getDefaultMessage());
    }
}
