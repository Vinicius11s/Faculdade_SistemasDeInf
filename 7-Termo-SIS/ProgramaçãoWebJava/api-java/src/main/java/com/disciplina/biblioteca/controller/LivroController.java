package com.disciplina.biblioteca.controller;

import com.disciplina.biblioteca.dto.LivroRequest;
import com.disciplina.biblioteca.dto.LivroResponse;
import com.disciplina.biblioteca.service.LivroService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/livros")
public class LivroController {

    private final LivroService livroService;

    public LivroController(LivroService livroService) {
        this.livroService = livroService;
    }

    @GetMapping
    public List<LivroResponse> listar() {
        return livroService.listar();
    }

    @GetMapping("/{id}")
    public LivroResponse buscar(@PathVariable Long id) {
        return livroService.buscarPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LivroResponse criar(@RequestBody @Valid LivroRequest request) {
        return livroService.criar(request);
    }

    @PutMapping("/{id}")
    public LivroResponse atualizar(@PathVariable Long id, @RequestBody @Valid LivroRequest request) {
        return livroService.atualizar(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long id) {
        livroService.remover(id);
    }
}
